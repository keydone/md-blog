/* const emoji = require('markdown-it-emoji');
const mdCheckbox = require('markdown-it-checkbox');
const mdSmartArrows = require('markdown-it-smartarrows');
const mdDivs = require('markdown-it-div');
const md = require('markdown-it')({ html: true }); */
const NotesModel = require('../models/notes');
const Utils = require('../utils/utils');

/* md.use(emoji)
    .use(mdCheckbox, {
        divWrap: true,
        divClass: 'checkbox',
        idPrefix: 'checkbox_'
    })
    .use(mdSmartArrows)
    .use(mdDivs); */

const findAll = async (ctx, next) => {
    try {
        const total = await NotesModel.countDocuments();
        await NotesModel.find()
            .then((res) => {
                res.forEach((article) => {
                    const { content } = article;
                    if (content) {
                        article.content = md.render(content);
                    } else {
                        article.content = '';
                    }
                });
                ctx.body = {
                    res,
                    total,
                };
                next(ctx, next);
            });
    } catch (err) {
        ctx.body = Utils.unexpected(err);
        next(ctx, next);
        console.log('err ---', err);
    }
};

const findOne = async (ctx, next) => {
    const { id } = ctx.request.query;
    try {
        await NotesModel.findOne({ path: id[1] })
            .then((article) => {
                const { content } = article;
                if (content) {
                    article.content = md.render(content);
                } else {
                    article.content = '';
                }
                ctx.body = article;
                next(ctx, next);
            });
    } catch (err) {
        ctx.body = Utils.unexpected(err);
        next(ctx, next);
        console.log('err ---', err);
    }
};

const save = async (ctx, next) => {
    const article = new NotesModel(ctx.request.body);
    try {
        await article.create();
        return { success: true };
    } catch (err) {
        return { success: false, msg: Utils.unexpected(err) };
    }
};

const update = async (ctx, next) => {
    const article = new NotesModel(ctx.request.body);
    try {
        const res = await article.findOneAndUpdate();
        ctx.body = res;
        next(ctx, next);
    } catch (err) {
        ctx.body = Utils.unexpected(err);
    }
};

const remove = async (ctx, next) => {
    await NotesModel.remove((err, res) => {

    });
};

module.exports = {
    findAll,
    findOne,
    save,
    update,
    remove,
};
