const mongoose = require('mongoose');
const { requires } = require('./validator');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

mongoose.Promise = global.Promise;

const Notes = new Schema({
    _id: {
        type:    String,
        default: ObjectId,
    },
    // 文章标题
    title: {
        type:     String,
        validate: requires('文章标题'),
    },
    // 副标题
    subtitle: String,
    // 文章封面
    cover:    {
        type:    String,
        default: '',
    },
    // 文章链接
    path: {
        type:     String,
        validate: requires('文章 id'),
    },
    // 作者
    author:       String,
    authorId:     String,
    // 分类id
    categoryId:   String,
    // 标签id
    tags:         Array,
    // 发布时间
    postDate:     Date,
    // 最后更新时间
    modDate:      Date,
    // 内容 id
    contentId:    String,
    // 富文本内容
    content:      String,
    // 文本内容
    text:         String,
    // 资源下载
    downloadUrls: Array,
    // 阅读权限
    readlimit:    {
        type:    String,
        default: 100,
    },
    // 是否为草稿
    isDraft: {
        type:    Boolean,
        default: false,
    },
    // 待审核
    isPending: {
        type:    Boolean,
        default: true,
    },
    // 审核人员id
    passedMan: {
        type:    Number,
        default: 0,
    },
    // 阅读量
    readTimes: {
        type:    Number,
        default: 0,
    },
    // 点赞数
    liked: {
        type:    Number,
        default: 0,
    },
    // 评论数
    comments: {
        type:    Number,
        default: 0,
    },
    // 阅读权限
    role: {
        type:    Number,
        default: 4,
    },
    // 赞助人
    donates: Array,
    // 首页推荐
    isIndex: {
        type:    Boolean,
        default: false,
    },
    // 站长推荐
    recommandBlocks: {
        type:    Array,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('Notes', Notes);
