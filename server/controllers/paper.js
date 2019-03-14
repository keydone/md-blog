const mongoose = require('mongoose');
const Pager = require('../models/papers-model');

mongoose.Promise = global.Promise;

const findAll = (ctx, next) => {

};

const findOne = (ctx, next) => {

};

const update = (ctx, next) => {

};

const save = async (ctx, next) => {
    const type = ctx.params[0].split('/')[0];
    const PageModel = mongoose.model(type, Pager);
    const result = new PageModel(ctx.request.body);
    const papers = await result.save();
    // console.log(papers);
    ctx.body = { status: 0, msg: '创建成功!', data: papers };
};

module.exports = {
    findAll,
    findOne,
    update,
    save,
};
