/**
 * @author claude
 * 分类表
 */
const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Footer = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 大标题
    title: {
        type:     String,
        validate: requires('板块标题'),
    },
    // 创建人id
    creatorId: Number,
    show:      {
        type:    Boolean,
        default: true,
    },
    list: {
        type: Array,
    },
}, { timestamps: true });

module.exports = mongoose.model('Footer', Footer);
