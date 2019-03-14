const MenusModel = require('../models/menus-model');
const Utils = require('../utils/utils');

const findAll = async (ctx, next) => {
    try {
        const result = await MenusModel.find();
        Object.assign(ctx.body, {
            menus: result,
        });
    } catch (err) {
        Object.assign(ctx.body, {
            error: Utils.unexpected(err),
        });
    }
    if (next) next(ctx, next);
};

const save = async (ctx, next) => {
    const isExists = await MenusModel.findOne({ name: ctx.request.body.name });
    if (isExists) {
        ctx.body = { status: 1, msg: '菜单已存在' };
    } else {
        try {
            const result = new MenusModel(ctx.request.body);
            const menus = await result.save();
            ctx.body = { status: 0, msg: '菜单创建成功!', data: menus };
        } catch (err) {
            ctx.body = { status: 1, msg: Utils.unexpected(err) };
        }
    }
};

const update = async (ctx, next) => {
    const { _id } = ctx.request.body;

    try {
        const res = await MenusModel.findOneAndUpdate({ _id }, { ...ctx.request.body }, {
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
        const res = await MenusModel.findOneAndDelete({ _id });

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
