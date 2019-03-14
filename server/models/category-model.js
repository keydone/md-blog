const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Category = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 分类名称
    name: {
        type: String,
        validate: requires('分类名称'),
    },
    show: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', Category);
