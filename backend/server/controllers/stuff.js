const StuffModel = require('../models/stuffs-model');
const Utils = require('../utils/utils');

const findOne = async (articleId) => {
    let error = '';

    try {
        return await StuffModel.findOne({ articleId });
    } catch (err) {
        error = Utils.unexpected(err);
    }
    return error;
};

const save = async (articleId, filepath, hash, type) => {
    try {
        let data = null;
        const result = await findOne(articleId);

        if (!result) {
            const model = new StuffModel({
                articleId,
            });

            data = await model.save();
        } else {
            data = result;
        }

        data.stuff.push({
            type,
            iscover: false,
            stuffId: hash,
            // 资源链接
            url: filepath,
        });

        await StuffModel.findOneAndUpdate(articleId, {
            stuff: data.stuff,
            articleId,
        }, {
                new: true,
                upsert: true,
                // overwrite: true,
                useFindAndModify: false,
            });

        return { success: true, msg: '资源保存成功' };
    } catch (err) {
        console.log(err.errmsg);
        return Utils.unexpected(err);
    }
};

const update = async (articleId, filename) => {
    let error = '';

    try {
        const model = new StuffModel({
            articleId,
            stuff: [{

            }],
        });

        await model.save();
        return { success: true, msg: '资源保存成功' };
    } catch (err) {
        error = Utils.unexpected(err);
    }
    return error;
};

module.exports = {
    findOne,
    update,
    save,
};
