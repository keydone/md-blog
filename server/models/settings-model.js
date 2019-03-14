const mongoose = require('mongoose');
// const { requires } = require('../validator');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

const Settings = new Schema({
    _id: {
        type: String,
        default: ObjectId,
    },
    cdn: {
        type: String,
        default: '/',
    },
    static: {
        type: String,
        default: '/',
    },
    domain: {
        type: String,
        default: '/',
    },
    intro: Object,
    // 新标签页打开
    external_link: {
        type: Boolean,
        default: true,
    },
    // 显示草稿
    render_drafts: {
        type: Boolean,
        default: false,
    },
    QRcode: String,
    friend_link: Array,
    tools: Array,
    secials: Array,
    aside: {
        type: Object,
    },
    announce: String,
}, { timestamps: true });

module.exports = mongoose.model('Settings', Settings);
