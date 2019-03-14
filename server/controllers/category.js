const CatesModel = require('../models/category-model');
const Utils = require('../utils/utils');

const findAll = async (ctx, next) => {
    try {
        const { catesLimit } = ctx.request.body;
        const result = await CatesModel.find().limit(catesLimit || 100);
        Object.assign(ctx.body, {
            categories: result,
        });
    } catch (err) {
        Object.assign(ctx.body, {
            error: Utils.unexpected(err),
        });
    }
    if (next) next(ctx, next);
};

const save = async (ctx, next) => {
    const isExists = await CatesModel.findOne({ name: ctx.request.body.name });
    if (isExists) {
        ctx.body = { status: 1, msg: '分类已存在!' };
    } else {
        try {
            const category = new CatesModel(ctx.request.body);
            const cate = await category.save();
            ctx.body = { status: 0, msg: '分类创建成功', data: cate };
        } catch (err) {
            ctx.body = { status: 1, msg: Utils.unexpected(err) };
        }
    }
};

const update = async (ctx, next) => {
    const { _id } = ctx.request.body;

    try {
        const res = await CatesModel.findOneAndUpdate({ _id }, { ...ctx.request.body }, {
            new: true,
            useFindAndModify: false,
        });

        if (res === null) {
            ctx.body = { status: 1, msg: '更新失败 (-_-)' };
        } else {
            ctx.body = { status: 0, msg: '更新成功!' };
        }
    } catch (err) {
        ctx.body = { status: 1, msg: Utils.unexpected(err) };
    }

    next(ctx);
};

const remove = async (ctx, next) => {
    const { _id } = ctx.request.body;

    try {
        const res = await CatesModel.findOneAndDelete({ _id });

        if (res === null) {
            ctx.body = { status: 1, msg: '删除失败 (-_-)' };
        } else {
            ctx.body = { status: 0, msg: '删除成功!' };
        }
    } catch (err) {
        ctx.body = { status: 1, msg: Utils.unexpected(err) };
    }

    next(ctx);
};

module.exports = {
    findAll,
    update,
    remove,
    save,
};
