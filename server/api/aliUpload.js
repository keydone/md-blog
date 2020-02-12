const AliOss = require('ali-oss');
const envFile = require('../../.env.js');

const aliOssConfig = Object.assign({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
}, envFile.aliOssConfig);

const aliUpload = (buffer, fileName) => new Promise(async (resolve, reject) => {
    try {
        const response = await new AliOss(aliOssConfig).put(`static/${fileName}`, buffer);

        if (response.res.statusCode === 200) {
            resolve({
                filename: response.name,
                url: response.url,
            });
        }
    } catch (respErr) {
        reject(respErr);
    }
});

module.exports = aliUpload;
