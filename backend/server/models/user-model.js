/**
 * @author claude
 * 用户模型表
 */
const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 用户名, 可用于登录后台系统
    username: {
        type:     String,
        validate: requires('用户名'),
    },
    password: String,
    // 用户昵称, 用于前台站点展示
    nickName: String,
    // 0: root, 1:super, 2:admin, 3:moderator, 4:all 普通用户
    // 0 不允许修改
    role:     {
        type:    Number,
        default: 4,
    },
    roleName: {
        type:    String,
        default: '普通用户',
    },
    // 头像
    avatar: String,
    // 账号状态 0:正常 1:审核中 2:冻结
    state:  {
        type:    Number,
        default: 0,
    },
});

module.exports = mongoose.model('User', userSchema);
