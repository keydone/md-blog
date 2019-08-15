const DataModel = require('../controller.base');
const model = '../../models/home/acts-model';

const findAll = async (ctx, next) => DataModel.findAll({
    ctx,
    model,
    next,
    sort: {
        createdAt: 1,
    },
});

const save = async (ctx, next) => DataModel.save({
    ctx,
    model,
    next,
});

const update = async (ctx, next) => DataModel.update({
    ctx,
    model,
    next,
});

const remove = async (ctx, next) => DataModel.remove({
    ctx,
    model,
    next,
});

module.exports = {
    findAll,
    update,
    remove,
    save,
};
