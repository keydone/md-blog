const mongoose = require('mongoose');
// const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Stuffs = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    filename:   String,
    uploadDate: String,
    url:        String,
    iscover:    {
        type:    Boolean,
        default: false,
    },
    /*stuff: [Object, {
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
    }], */
}, { timestamps: true });

module.exports = mongoose.model('Stuffs', Stuffs);
