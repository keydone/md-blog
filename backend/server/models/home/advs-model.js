/**
 * @author claude
 * 首页板块管理表
 */
const mongoose = require('mongoose');
const { requires } = require('../validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Advertise = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 板块标题
    title: {
        type:     String,
        validate: requires('板块标题'),
    },
    // 是否显示标题
    showTitle: {
        type:    Boolean,
        default: 1,
    },
    // 布局类型
    layout: {
        type:    Number,
        default: 0, //  0: 首页置顶  1: 侧边栏置顶  2: 文章片段随机广告
    },
    // 轮播时长
    during: {
        type:    Number,
        default: 3,
    },
    // 显示/隐藏
    show: {
        type:    Boolean,
        default: true,
    },
    // 广告 id 列表
    idlist: Array,
}, { timestamps: true });

module.exports = mongoose.model('Advertise', Advertise);
