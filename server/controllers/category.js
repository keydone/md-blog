const CatesModel = require('../models/categories');
const Utils = require('../utils/utils');

const findAll = async (ctx, next) => {
    const article = new CatesModel(ctx.request.body);
    try {
        const res = await article.find();
        ctx.body = res;
    } catch (err) {
        ctx.body = Utils.unexpected(err);
    }
    next(ctx, next);
};

const save = async (ctx, next) => {
    try {
        const category = new CatesModel(ctx.request.body);
        await category.create();
        return { success: true, msg: '分类创建成功' };
    } catch (err) {
        return Utils.unexpected(err);
    }
};

export {
    findAll,
    save,
};
