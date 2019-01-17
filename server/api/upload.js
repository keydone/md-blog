const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const aliUpload = require('./aliUpload');

const today = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
        month = String(month).padStart(2, '0');
    }
    let date = now.getDate();
    if (date < 10) {
        date = String(date).padStart(2, '0');
    }

    return `${year}${month}${date}`;
};

const upload = ctx => new Promise((resolve, reject) => {
    const { header } = ctx.request;
    const { store, postid } = ctx.request.query;
    const $filename = postid || `d-${today()}`;
    const pathResolve = path.resolve(__dirname, `../../_temp/${store}`);
    const busboy = new Busboy({
        headers: header
    });
    if (!fs.existsSync(pathResolve)) {
        fs.mkdirSync(pathResolve);
    }
    busboy.on('file', async (fieldname, file, fileName, encoding, mimetype) => {
        const suffixs = fileName.split('.');
        const suffix = suffixs[suffixs.length - 1];
        const fullname = `${$filename}.${suffix}`;
        const saveTo = path.join(pathResolve, fullname);

        if (!fs.existsSync(saveTo)) {
            await new Promise((writeEnd) => {
                const writeStream = file.pipe(fs.createWriteStream(saveTo));
                writeStream.on('finish', () => {
                    console.log('文件写入完毕！');
                    writeEnd();
                });
            });
        }

        // 存储文件流
        try {
            const { error, name } = await aliUpload(saveTo, fullname);
            resolve({ error, name });
        } catch (error) {
            reject(error);
        }
    });

    ctx.req.pipe(busboy);
});

module.exports = upload;
