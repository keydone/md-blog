/**
 * @author claude
 * 用户模型表
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const UserPrivateSchema = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 个人简介
    intro:    String,
    // 手机号
    phone:    Number,
    // 问答
    answers:  Array,
    // 密码 md5 加密
    password: String,
    // 账号状态 0:正常 1:审核中 2:冻结
    state:    {
        type:    Number,
        default: 0,
    },
    // 注册时间
    signTime:   Date,
    // 最后登录时间
    loginTime:  Date,
    // 退出时间
    logoutTime: Date,
});

module.exports = mongoose.model('UserPrivate', UserPrivateSchema);
