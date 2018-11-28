const index = require('../models/index.js');
const md = require('markdown-it')();

const list = async (ctx, next) => {
    await index.BlogList.find()
        .then(res => {
            console.log('res:', res);

            ctx.body = {
                res,
                code: 0,
                msg: 'success',
            };
            next(ctx, res);
        })
        .catch(err => {
            ctx.body = {
                list: {},
                code: 1,
                message: err.message || ''
            };
            next(ctx, res);
        })
}

module.exports = {
    list,
}
