const { join } = require('path');
const Busboy = require('busboy');
const { randomBytes } = require('crypto');
const { createWriteStream } = require('fs');
const aliUpload = require('./aliUpload');
const Utils = require('../utils/utils');
const stuff = require('../controllers/stuff');
const env = require('../../.backend.env.js');

const upload = ctx => new Promise((resolve, reject) => {
    const { header } = ctx.request;
    const { store } = ctx.request.query;
    const uploadDate = `${Utils.today()}`;
    const filePath = `${store || 'images'}/${uploadDate}`;
    const saveToLocal = join(__dirname, `../../../_temp/${filePath}`);
    const busboy = new Busboy({
        headers: header,
    });

    Utils.mkdirSync(saveToLocal);

    busboy.on('file', async (fieldname, file, fileName, encoding, mimetype) => {
        const suffixs = fileName.split('.');
        const suffix = suffixs[suffixs.length - 1];
        const hash = randomBytes(5).toString('hex');
        const fileLocalPath = `${saveToLocal}/${hash}.${suffix}`;

        await new Promise((writeEnd) => {
            const writeStream = file.pipe(createWriteStream(fileLocalPath));

            writeStream.on('finish', async () => {
                console.log('文件写入完毕！');
                // 存储文件流
                try {
                    const response = await aliUpload(fileLocalPath, `${filePath}/${hash}.${suffix}`);

                    if (response.code === 200) {
                        const { filename } = response;
                        const filepath = `${env.aliStatic}/${filename}`;

                        delete response.url;

                        // 同步资源表
                        const stuffId = randomBytes(10).toString('hex');
                        const { success, msg } = await stuff.save(uploadDate, filename, filepath, stuffId);

                        if (success) {
                            Object.assign(response, {
                                uploadDate,
                                filepath,
                                stuffId,
                            });
                        } else {
                            response.error = msg;
                        }

                        resolve(response);
                    } else {
                        resolve({
                            error: response.code,
                        });
                    }
                } catch (error) {
                    reject(error);
                }
                writeEnd();
            });
        });
    });

    ctx.req.pipe(busboy);
});

module.exports = upload;
