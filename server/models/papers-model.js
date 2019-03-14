const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Pager = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 标题
    title: {
        type: String,
        validate: requires('标题'),
    },
    content: {
        type: String,
        validate: requires('内容'),
    },
    cover: String,
    category: String,
    assets: Array,
}, { timestamps: true });

module.exports = Pager;
