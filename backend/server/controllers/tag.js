const TagModel = require('../models/tags');
const Utils = require('../utils/utils');

const findAll = async (ctx, next) => {
    const model = new TagModel(ctx.request.body);

    try {
        const res = await model.find();

        ctx.body = res;
    } catch (err) {
        ctx.body = Utils.unexpected(err);
    }
    if (next) next(ctx, next);
};

const save = async (ctx, next) => {
    try {
        const model = new TagModel(ctx.request.body);

        await model.save();
        return { success: true, msg: '标签创建成功' };
    } catch (err) {
        return Utils.unexpected(err);
    }
};

export {
    findAll,
    save,
};
