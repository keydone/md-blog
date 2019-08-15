/**
 * @author claude
 * 用户操作日志
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
}, { timestamps: true });

module.exports = mongoose.model('Tag', Tag);
