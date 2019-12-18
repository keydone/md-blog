// const stuffs = require('../models/stuff-model');
const exclude = require('../utils/exclude');
const Utils = require('../utils/utils');

function models(modelName) {
    return require(`../models/${modelName}-model.js`);
}

/**
 * @param {*page} page
 * @param {*pageSize} pageSize
 * @param {*drafts} drafts 1: 全部 0:非草稿 2:草稿
 */
async function findAll ({ ctx, next, model = 'articles' }) {
    let { page, pageSize } = ctx.request.query;
    const _ctx = ctx;
    const { draft } = ctx.request.query;
    const drafts = draft == null ? 0 : +draft;
    const filter = {};

    page = (page - 1) || 0;
    pageSize = +pageSize || 10;

    if (drafts === 0) {
        filter.isDraft = 0;
    } else if (drafts === 2) {
        filter.isDraft = 1;
    }

    try {
        const total = await models(model).countDocuments();
        const list = await models(model).find(filter, exclude)
            .limit(pageSize)
            .skip(page * pageSize)
            .sort({ createdAt: -1 });

        _ctx.body = {
            code: 0,
            data: {
                list,
            },
            total,
            pageSize,
            page,
        };
    } catch (error) {
        Utils.unexpected(error, _ctx, next);
    }

    next && await next(_ctx);
}

// 最新几篇
async function findLastPost ({ ctx, model = 'articles' }) {
    ctx.body.last_post = await models(model).find({
        isDraft: 0,
    }, exclude)
        .limit(5)
        .sort({ createdAt: -1 });
}

// 查找特定文章
async function findOne ({
    ctx,
    filter = {},
    next,
    model = 'articles',
}) {
    const _ctx = ctx;
    const { _id } = _ctx.request.query;

    if (_id == null) {
        return await models(model).findOne({ _id }, exclude, { lean: true });
    }

    try {
        const article = await models(model).findOne({ _id }, exclude);

        if (article) {
            /* const attachment = await stuffs.findOne({ articleId: id }, exclude);

            article.stuffs = attachment || {}; */

            // 查找上1篇
            let prevItem = await models(model).find({ _id: { $lt: _id } }, exclude).sort({ _id: -1 }).limit(1);

            prevItem = prevItem.length ? prevItem[0] : null;

            // 查找下1篇
            let nextItem = await models(model).find({ _id: { $gt: _id } }, exclude).sort({ _id: 1 }).limit(1);

            nextItem = nextItem.length ? nextItem[0] : null;

            const result = {
                code: 0,
                data: {
                    prevItem,
                    article,
                    nextItem,
                },
            };

            _ctx[`${next ? '$' : ''}body`] = result;
        }
    } catch (error) {
        Utils.unexpected(error, _ctx, next);
    }

    next && await next(_ctx);
}

// 抽象保存方法
async function saveData ({ ctx, body, next, model = 'articles' }) {
    const _ctx = ctx;

    try {
        delete body._id;
        await new (models(model))(body).save();

        const result = { code: 0, msg: body.isDraft ? '保存成功' : '发布成功!' };

        _ctx[`${next ? '$' : ''}body`] = result;
    } catch (error) {
        Utils.unexpected(error, _ctx);
    }
}

async function save ({ ctx, next, model = 'articles' }) {
    const _ctx = ctx;
    const { body } = ctx.request;
    const { _id, title, authorId } = body;

    if (!title) {
        const result = { code: 1, msg: '文章标题 不能为空' };

        _ctx[`${next ? '$' : ''}body`] = result;
    } else {

        // 文章是否存在
        // 不存在 => 保存
        // 存在:
        //      是否有权限
        //      是 => 保存/更新
        //      否 => 拒绝更新
        if (_id) {
            const findOne = await models(model).findOne({ _id }, exclude);

            if (findOne) {
                if (findOne.authorId === authorId) {
                    await saveData({ ctx: _ctx, body, next, model });
                } else {
                    const result = { code: 1, msg: '权限不足, 请重新登录' };

                    _ctx[`${next ? '$' : ''}body`] = result;
                }
            } else {
                await saveData({ ctx: _ctx, body, next, model });
            }
        } else {
            await saveData({ ctx: _ctx, body, next, model });
        }
    }
    next && await next(_ctx);
}

async function update ({ ctx, next, model = 'articles' }) {
    const _ctx = ctx;
    const { _id, article } = _ctx.request.body;

    try {
        const res = await models(model).findOneAndUpdate(
            { _id },
            article,
            {
                new:              true,
                useFindAndModify: false,
            }
        );

        let result = {};

        if (res === null) {
            result = { code: 1, msg: '更新失败 (-_-)' };
        } else {
            result = { code: 0, msg: '更新成功!' };
        }

        _ctx[`${next ? '$' : ''}body`] = result;
    } catch (error) {
        Utils.unexpected(error, _ctx, next);
    }

    next && await next(_ctx);
}

async function remove ({ ctx, next, model = 'articles' }) {
    const _ctx = ctx;
    const { _id } = _ctx.request.body;

    try {
        const { deletedCount } = await models(model).deleteOne({ _id });

        let result = {};

        if (deletedCount) {
            result = { code: 0, msg: '删除成功!' };
        } else {
            result = { code: 1, msg: '删除失败' };
        }

        _ctx[`${next ? '$' : ''}body`] = result;
    } catch (error) {
        Utils.unexpected(error, _ctx, next);
    }
    next && await next(_ctx);
}

module.exports = {
    findAll,
    findLastPost,
    findOne,
    save,
    update,
    remove,
};
