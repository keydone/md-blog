/**
 * @author claude
 * 分类表
 */
const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const FriendLinks = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 创建人id
    creatorId: Number,
    show:      {
        type:    Boolean,
        default: true,
    },
    name: {
        type:     String,
        validate: requires('友链名称'),
    },
    link: {
        type:     String,
        validate: requires('友链地址'),
    },
}, { timestamps: true });

module.exports = mongoose.model('FriendLinks', FriendLinks);
