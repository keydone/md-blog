/**
 * @author claude
 * 首页板块管理表
 */
const mongoose = require('mongoose');
const { requires } = require('../validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const BlockMgr = new Schema({
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
        type:    String,
        default: 'x', //  x: 横向布局 y: 纵向布局
    },
    // 每行展示数量
    number: {
        type:    Number,
        default: 2, //  0: 轮播, 1: 1行 1 个, 2: 1 行 2 个, 3: 1行 3 个
    },
    // 显示行数
    lines: {
        type:    Number,
        default: 2,
    },
    // 显示/隐藏
    show: {
        type:    Boolean,
        default: true,
    },
    sort: {
        type:    Number,
        default: 0, // 数字越小, 越靠前
    },
    // 文章 id 列表
    idlist: Array,
}, { timestamps: true });

module.exports = mongoose.model('BlockMgr', BlockMgr);
