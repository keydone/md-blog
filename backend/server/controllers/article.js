const ArticlesModel = require('../models/articles-model');
const stuffs = require('../models/stuff-model');
const exclude = require('../utils/exclude');
const Utils = require('../utils/utils');

/**
 * @param {*page} page
 * @param {*pageSize} pageSize
 * @param {*drafts} drafts 1: 全部 0:非草稿 2:草稿
 */
async function findAll(ctx, next) {
    let { page, pageSize } = ctx.request.query;
    const _ctx = ctx;
    const { draft } = ctx.request.query;
    const drafts = draft === undefined ? 0 : +draft;
    const filter = {};

    page = (page - 1) || 0;
    pageSize = +pageSize || 10;

    if (drafts === 0) {
        filter.isDraft = 0;
    } else if (drafts === 2) {
        filter.isDraft = 1;
    }

    try {
        const total = await ArticlesModel.countDocuments();
        const list = await ArticlesModel.find(filter, exclude)
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
        _ctx.body = Utils.unexpected(error);
    }

    next && await next(_ctx);
}

// 最新几篇
async function findLastPost(ctx) {
    ctx.body.last_post = await ArticlesModel.find({
        isDraft: 0,
    }, exclude)
        .limit(5)
        .sort({ createdAt: -1 });
}

async function findOne($id, ctx, next) {

    if ($id != null) {
        return await ArticlesModel.findOne({ _id: $id }, exclude, { lean: true });
    }

    const _ctx = ctx;

    try {
        const { id } = ctx.params;
        const article = await ArticlesModel.findOne({ _id: id }, exclude);

        if (article) {
            const attachment = await stuffs.findOne({ articleId: id }, exclude);

            article.stuffs = attachment || {};
            const { _id } = article;

            let prevItem = await ArticlesModel.find({ _id: { $lt: _id } }, exclude).sort({ _id: -1 }).limit(1);

            prevItem = prevItem.length ? prevItem[0] : null;

            let nextItem = await ArticlesModel.find({ _id: { $gt: _id } }, exclude).sort({ _id: 1 }).limit(1);

            nextItem = nextItem.length ? nextItem[0] : null;

            _ctx.body = {
                prevItem,
                article,
                nextItem,
            };
        }
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
    }

    next && await next(_ctx);
}

async function saveData(ctx, body) {
    const _ctx = ctx;

    try {
        delete body._id;
        await new ArticlesModel(body).save();

        _ctx.body = { code: 0, msg: body.isDraft ? '保存成功' : '发布成功!' };
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
    }
}

async function save(ctx, next) {
    const _ctx = ctx;
    const { body } = ctx.request;
    const { _id, title, authorId } = body;

    if (!title) {
        _ctx.body = { code: 1, msg: '文章标题 不能为空' };
    } else {

        // 文章是否存在
        // 不存在 => 保存
        // 存在:
        //      是否有权限
        //      是 => 保存/更新
        //      否 => 拒绝更新
        if (_id) {
            const findOne = await ArticlesModel.findOne({ _id }, exclude);

            if (findOne) {
                if (findOne.authorId === authorId) {
                    await saveData(_ctx, body);
                } else {
                    _ctx.body = { code: 1, msg: '权限不足, 请重新登录' };
                }
            } else {
                await saveData(_ctx, body);
            }
        } else {
            await saveData(_ctx, body);
        }
    }
    next && await next(_ctx);
}

async function update(ctx, next) {
    const _ctx = ctx;
    const { _id, article } = _ctx.request.body;

    try {
        const res = await ArticlesModel.findOneAndUpdate(
            { _id },
            article,
            {
                new:              true,
                useFindAndModify: false,
            }
        );

        if (res === null) {
            _ctx.body = { code: 1, msg: '更新失败 (-_-)' };
        } else {
            _ctx.body = { code: 0, msg: '更新成功!' };
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
        const { deletedCount } = await ArticlesModel.deleteOne({ _id });

        if (deletedCount) {
            _ctx.body = { code: 0, msg: '删除成功!' };
        } else {
            _ctx.body = { code: 1, msg: '删除失败' };
        }
    } catch (err) {
        _ctx.body = Utils.unexpected(err);
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
