const emoji = require('markdown-it-emoji');
const mdCheckbox = require('markdown-it-checkbox');
const mdSmartArrows = require('markdown-it-smartarrows');
const mdDivs = require('markdown-it-div');
const md = require('markdown-it')({ html: true });
const NotesModel = require('../models/note');

md.use(emoji)
    .use(mdCheckbox, {
        divWrap: true,
        divClass: 'checkbox',
        idPrefix: 'checkbox_'
    })
    .use(mdSmartArrows)
    .use(mdDivs);

const findAll = async (ctx, next) => {
    try {
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
                ctx.response.body = res;
                next(ctx, next);
            });
    } catch (err) {
        ctx.response.body = err;
        next(ctx, next);
        console.log('err ---', err);
    }
};

const findOne = async (ctx, next) => {
    const id = ctx.request.url.split('/detail/');
    try {
        await NotesModel.findOne({ path: id[1] })
            .then((article) => {
                const { content } = article;
                if (content) {
                    article.content = md.render(content);
                } else {
                    article.content = '';
                }
                ctx.response.body = article;
                next(ctx, next);
            });
    } catch (err) {
        ctx.response.body = err;
        next(ctx, next);
        console.log('err ---', err);
    }
};

const save = async (ctx, next) => {
    const article = new NotesModel(ctx.request.body);
    try {
        await article.save();
        return { success: true };
    } catch (err) {
        const msgArr = [];
        for (const errName in err.errors) {
            msgArr.push(err.errors[errName].message);
        }
        return { success: false, msg: msgArr[0] };
    }
};

const update = async (ctx, next) => {
    const article = new NotesModel(ctx.request.body);
    try {
        await article.update()
            .then((res) => {
                ctx.response.body = res;
                next(ctx, next);
            });
    } catch (err) {
        ctx.response.body = err;
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
