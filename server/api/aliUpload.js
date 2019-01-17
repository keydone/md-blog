const AliOss = require('ali-oss');
const envFile = require('../../.env.js');

const aliOssConfig = Object.assign({
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
}, envFile.aliOssConfig);

const client = new AliOss(aliOssConfig);

const aliUpload = (buffer, fileName) => new Promise(async (resolved, reject) => {
    try {
        const response = await client.put(`static/${fileName}`, buffer);

        if (response.res.statusCode === 200) {
            resolved({
                name: response.name,
                url: response.url,
            });
        }
    } catch (respErr) {
        reject(respErr);
    }
});

module.exports = aliUpload;
