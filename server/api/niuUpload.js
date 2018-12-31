const Qiniu = require('qiniu');

const options = {
    accessKey: 'rF4IVojDA1o7QC6rS61cRqzOheBEpAfymUOiB7rh',
    secretKey: 'qwd05w4WVLTUECBy2PWnhwTJaMRK1kQCGK6AvK2U',
    bucket: 'static-cdn', // 空间名称
};

const niuUpload = (buffer, fileName) => {
    const mac = new Qiniu.auth.digest.Mac(options.accessKey, options.secretKey);
    const putPolicy = new Qiniu.rs.PutPolicy({
        scope: options.bucket,
        expires: 7200000000,
        returnBody: '{"name":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)"}',
        callbackBodyType: 'application/json',
    });
    const uploadToken = putPolicy.uploadToken(mac);
    const config = new Qiniu.conf.Config();
    config.zone = Qiniu.zone.Zone_z2; // 华南
    const formUploader = new Qiniu.form_up.FormUploader(config);
    const putExtra = new Qiniu.form_up.PutExtra();

    // 文件上传
    return new Promise((resolved, reject) => {
        formUploader.putFile(uploadToken, fileName, buffer, putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
                reject(respErr);
            }

            console.log(respInfo.statusCode);
            // console.log('respBody:', respBody);
            if (respInfo.statusCode === 200) {
                resolved(respBody);
            } else {
                resolved(respBody);
            }
        });
    });
};

module.exports = niuUpload;
