const mongoose = require('mongoose');
const Pager = require('../models/papers-model');

mongoose.Promise = global.Promise;

const findAll = async (ctx, next) => {
    const block = ctx.params[0];
    const PageModel = mongoose.model(block, Pager);

    let { page, pagesize } = ctx.request.query;
    const filter = {};

    page = (page - 1) || 0;
    pagesize = pagesize || 12;

    try {
        const total = await PageModel.countDocuments();
        const list = await PageModel.find(filter)
            .limit(pagesize)
            .skip(page * pagesize)
            .sort({ createdAt: -1 });

        Object.assign(ctx.body, {
            total,
            pagesize,
            page,
            list,
        });
        if (next) next(ctx, next);
    } catch (error) {
        Object.assign(ctx.body, {
            error,
        });
        if (next) next(ctx, next);
    }
};

const findOne = async (ctx, next) => {
    const { id } = ctx.params;
    const { block } = ctx.request.query;

    try {
        const PageModel = mongoose.model(block, Pager);
        const article = await PageModel.findOne({ path: id });

        Object.assign(ctx.body, {
            article,
        });
    } catch (error) {
        Object.assign(ctx.body, {
            error,
        });
    }
};

const update = async (ctx, next) => {

};

const save = async (ctx, next) => {
    const block = ctx.params[0];
    const PageModel = mongoose.model(block, Pager);

    try {
        const { article } = ctx.request.body;
        const papers = await new PageModel(article).save();

        ctx.body = { status: 0, msg: '创建成功!', data: papers };
    } catch (error) {
        ctx.body = { status: 1, msg: '创建失败!' };
    }
};

module.exports = {
    findAll,
    findOne,
    update,
    save,
};
