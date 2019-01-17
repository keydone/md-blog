const mongoose = require('mongoose');
const { requires } = require('../validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Articles = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 文章标题
    title: {
        type: String,
        validate: requires('文章标题'),
    },
    // 副标题
    subtitle: {
        type: String,
    },
    // 文章封面
    cover: {
        type: String,
    },
    // 文章链接
    path: {
        type: String,
        validate: requires('文章 id'),
    },
    // 作者
    author: {
        type: String,
        validate: requires('作者'),
    },
    // 分类
    category: {
        type: String,
        default: '未分类',
    },
    // 标签
    tags: {
        type: Array,
    },
    date: {
        type: String,
    },
    content: {
        type: String,
    },
    // 是否为草稿
    isDraft: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Articles', Articles);
