const StuffModel = require('../models/stuff-model');
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

const save = async (uploadDate, filename, filepath, stuffId) => {
    try {
        const model = new StuffModel({
            stuffId,
            filename,
            uploadDate,
            url: filepath,
        });

        await model.save();
        return { success: true, msg: '资源保存成功' };
    } catch (err) {
        return Utils.unexpected(err);
    }
};

const update = async (uploadDate, filename, filepath, stuffId) => {

    try {
        const model = new StuffModel({
            stuffId,
            filename,
            uploadDate,
            url: filepath,
        });

        await model.save();
        return { success: true, msg: '资源保存成功' };
    } catch (err) {
        return Utils.unexpected(err);
    }
};

module.exports = {
    findOne,
    update,
    save,
};
