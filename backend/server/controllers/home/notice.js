const DataModel = require('../../models/category-model');
const exclude = require('../../utils/exclude');
const Utils = require('../../utils/utils');

async function findAll(ctx, next) {
    const _ctx = ctx;

    try {
        const result = await DataModel.find(_ctx.request.query, exclude).sort({ createdAt: 1 });

        _ctx.$body = {
            code: 0,
            data: {
                list: result,
            },
        };
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
    }

    next && await next(_ctx);
}

async function save(ctx, next) {
    let isExists = false;
    const _ctx = ctx;
    const { _id } = _ctx.request.body;

    if (_id) {
        isExists = await DataModel.findOne({ _id });
    } else {
        delete _ctx.request.body._id;
        delete _ctx.request.body.createdAt;
        delete _ctx.request.body.updatedAt;
    }

    if (isExists) {
        return update(_ctx);
    } else {
        try {
            const model = new DataModel(_ctx.request.body, exclude);
            const data = await model.save();

            _ctx.$body = { code: 0, msg: '保存成功', data };
        } catch (err) {
            _ctx.body = Utils.unexpected(err);
        }
    }
    next && await next(_ctx);
}

async function update(ctx, next) {
    const _ctx = ctx;
    const { _id } = _ctx.request.body;

    try {
        const data = await DataModel.updateOne(
            { _id },
            _ctx.request.body,
            {
                new:              true,
                useFindAndModify: false,
            }
        );

        if (data.ok === 1) {
            _ctx.$body = { code: 0, msg: '更新成功!' };
        } else {
            _ctx.$body = { code: 1, msg: '更新失败 (-_-)' };
        }
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
    }

    next && await next(_ctx);
}

async function remove(ctx, next) {
    const _ctx = ctx;
    const { _id } = _ctx.request.body;

    try {
        const res = await DataModel.findOneAndDelete({ _id });

        if (res === null) {
            _ctx.$body = { code: 1, msg: '删除失败 (-_-)' };
        } else {
            _ctx.$body = { code: 0, msg: '删除成功!' };
        }
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
    }

    next && await next(_ctx);
}

module.exports = {
    findAll,
    update,
    remove,
    save,
};
