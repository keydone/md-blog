/**
 * @author claude
 * 标签表
 */
const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Tag = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 标签名称
    name: {
        type:     String,
        validate: requires('标签名称'),
    },
    // 创建人id
    creator: Number,
    // 访问权限
    role:    {
        type:    Number,
        default: 4,
    },
    show: {
        type:    Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Tag', Tag);
