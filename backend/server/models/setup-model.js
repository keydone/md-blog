/**
 * @author claude
 * 系统设置表
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Setup = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    siteName:    String,
    siteAddress: String,
    // 资源缓存时长
    cacheLong:   {
        type:    Number,
        default: 3600, // 秒
    },
    // 网站最大上传的文件大小
    maxUpload: {
        type:    Number,
        default: 1024 * 1024 * 20, // 20M
    },
    sitelogo_light: String,
    sitelogo_dark:  String,
    aliQR:          String,
    wxQR:           String,
    metas:          String,
    // 上传的文件类型后缀名
    typesOfUpload:  String,
    copyright:      String,
}, { timestamps: true });

module.exports = mongoose.model('Setup', Setup);
