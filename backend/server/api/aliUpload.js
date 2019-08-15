const AliOss = require('ali-oss');
const envFile = require('../../.backend.env.js');

const aliOssConfig = Object.assign({
    region:          '',
    accessKeyId:     '',
    accessKeySecret: '',
    bucket:          '',
    timeout:         120000, // 120s
}, envFile.aliOssConfig);

const client = new AliOss(aliOssConfig);

const aliUpload = async (buffer, fileName) => {
    try {
        const response = await client.put(`static/${fileName}`, buffer);

        if (response.res.statusCode === 200) {
            return {
                code:     200,
                filename: response.name,
                url:      response.url,
            };
        }
    } catch (respErr) {
        return respErr;
    }
};

module.exports = aliUpload;
