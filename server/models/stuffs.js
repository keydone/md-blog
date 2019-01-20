const mongoose = require('mongoose');
const { requires } = require('../validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Stuffs = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 文章id
    articleId: {
        type: String,
        validate: requires('文章id'),
    },
    stuff: [Object/* {
        type: String,
        iscover: {
            type: Boolean,
            default: false,
        },
        stuffId: ObjectId,
        // 资源链接
        url: String,
        // 资源大小
        attrs: {
            width: String,
            height: String,
        },
        // 资源大小
        size: String,
    } */],
}, { timestamps: true });

module.exports = mongoose.model('Stuffs', Stuffs);
