const { join } = require('path');
const Busboy = require('busboy');
const { randomBytes } = require('crypto');
const { createWriteStream } = require('fs');
const aliUpload = require('./aliUpload');
const Utils = require('../utils/utils');
const stuff = require('../controllers/stuff');
const env = require('../../.env.js');

const upload = ctx => new Promise((resolve, reject) => {
    const { header } = ctx.request;
    const { store, postid } = ctx.request.query;
    const hash = randomBytes(5).toString('hex');
    const postId = postid || `${Utils.today()}`;
    const filePath = `${store}/${postId}`;
    const saveToLocal = join(__dirname, `../../_temp/${filePath}`);
    const busboy = new Busboy({
        headers: header
    });

    Utils.mkdirSync(saveToLocal);

    busboy.on('file', async (fieldname, file, fileName, encoding, mimetype) => {
        const suffixs = fileName.split('.');
        const suffix = suffixs[suffixs.length - 1];
        const fileLocalPath = `${saveToLocal}/${hash}.${suffix}`;

        await new Promise((writeEnd) => {
            const writeStream = file.pipe(createWriteStream(fileLocalPath));
            writeStream.on('finish', async () => {
                console.log('文件写入完毕！');
                writeEnd();
                // 存储文件流
                try {
                    const response = await aliUpload(fileLocalPath, `${filePath}/${hash}.${suffix}`);
                    const filepath = `${env.aliStatic}/${response.filename}`;
                    delete response.url;

                    // 同步资源表
                    const stuffId = randomBytes(10).toString('hex');
                    const { success } = await stuff.save(postId, filepath, stuffId, store);
                    if (success) {
                        Object.assign(response, {
                            articleId: postId,
                            filepath,
                            stuffId,
                        });
                    }

                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            });
        });

    });

    ctx.req.pipe(busboy);
});

module.exports = upload;
