/*!
 * @author claude
 * date 10/15/2019
 * description controller base class
 */
const exclude = require('../utils/exclude');
const Utils = require('../utils/utils');

class ControllerBase {

    constructor(model) {
        this.Model = require(`../models/${model}`);
    }

    async findAll({
        ctx,
        next,
        filter = null,
        merge = {},
        sort = { createdAt: -1 },
    }) {
        const _ctx = ctx;

        try {
            const list = await this.Model.find(filter || _ctx.request.query, exclude, merge).sort(sort);

            const result = {
                code: 0,
                data: {
                    list,
                },
            };

            if (next) {
                _ctx.$body = result;
            } else {
                _ctx.body = result;
            }
        } catch (error) {
            Utils.unexpected(error, _ctx, next);
        }

        next && await next(_ctx);
    }

    async findOne({
        ctx,
        filter = {},
        next,
    }) {
        const _ctx = ctx;

        try {
            const data = await this.Model.findOne(filter);
            const result = {
                code: 0,
                data,
            };

            if (next) {
                _ctx.$body = result;
            } else {
                _ctx.body = result;
            }
        } catch (error) {
            Utils.unexpected(error, _ctx, next);
        }

        next && await next(_ctx);
    }

    async save({
        ctx,
        params = null,
        next,
    }) {
        let isExists = false;
        const _ctx = ctx;
        const { _id } = _ctx.request.body;

        if (_id) {
            isExists = await this.Model.findOne({ _id });
        } else {
            delete _ctx.request.body._id;
            delete _ctx.request.body.createdAt;
            delete _ctx.request.body.updatedAt;
        }

        if (isExists) {
            return this.update({ ctx: _ctx });
        } else {
            try {
                const model = new this.Model(params || _ctx.request.body, exclude);
                const data = await model.save();
                const result = { code: 0, msg: '保存成功', data };

                if (next) {
                    _ctx.$body = result;
                } else {
                    _ctx.body = result;
                }
            } catch (error) {
                Utils.unexpected(error, _ctx, next);
            }
        }

        next && await next(_ctx);
    }

    async update({
        ctx,
        next,
    }) {
        const _ctx = ctx;
        const { _id } = ctx.request.body;

        try {
            const response = await this.Model.findOneAndUpdate(
                { _id },
                _ctx.request.body,
                {
                    new:              true,
                    useFindAndModify: false,
                }
            );
            const error = { code: 1, msg: '更新失败 (-_-)' };
            const success = { code: 0, msg: '更新成功!' };

            if (next) {
                if (response.ok === 1) {
                    _ctx.$body = success;
                } else {
                    _ctx.$body = error;
                }
            } else {
                if (response.ok === 1) {
                    _ctx.body = success;
                } else {
                    _ctx.body = error;
                }
            }
        } catch (error) {
            Utils.unexpected(error, _ctx, next);
        }

        next && await next(_ctx);
    }

    async remove({
        ctx,
        next,
    }) {
        const _ctx = ctx;
        const { _id } = _ctx.request.body;

        try {
            const response = await this.Model.findOneAndDelete({ _id });
            const error = { code: 1, msg: '删除失败 (-_-)' };
            const success = { code: 0, msg: '删除成功!' };

            if (next) {
                if (response === null) {
                    _ctx.$body = error;
                } else {
                    _ctx.$body = success;
                }
            } else {
                if (response === null) {
                    _ctx.body = error;
                } else {
                    _ctx.body = success;
                }
            }
        } catch (error) {
            Utils.unexpected(error, _ctx, next);
        }

        next && await next(_ctx);
    }
}

module.exports = ControllerBase;
