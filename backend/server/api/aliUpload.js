const AliOss = require('ali-oss');
const envFile = require('../../../.backend.env.js');

const aliOssConfig = Object.assign({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
}, envFile.aliOssConfig);

const client = new AliOss(aliOssConfig);

const aliUpload = (buffer, fileName) => async (resolve, reject) => {
    try {
        const response = await client.put(`static/${fileName}`, buffer);

        if (response.res.statusCode === 200) {
            resolve({
                filename: response.name,
                url: response.url,
            });
        }
    } catch (respErr) {
        reject(respErr);
    }
};

module.exports = aliUpload;
