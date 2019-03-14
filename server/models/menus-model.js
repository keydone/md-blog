const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Menus = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    // 菜单名称
    name: {
        type: String,
        validate: requires('菜单名称'),
    },
    link: {
        type: String,
        validate: requires('菜单链接'),
    },
    // 是否显示
    show: {
        type: Boolean,
        default: true,
    },
    sort: {
        type: Number,
        default: 1,
    },
    settings: Object,
}, { timestamps: true });

module.exports = mongoose.model('Menus', Menus);
