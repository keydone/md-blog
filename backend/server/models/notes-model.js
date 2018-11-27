const mongoose = require('mongoose');
const { requires } = require('../validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Notes = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 笔记标题
    title: {
        type: String,
        validate: requires('文章标题'),
    },
    //  笔记内容
    content: {
        type: String,
    },
    // 是否为草稿
    isDraft: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Notes', Notes);
