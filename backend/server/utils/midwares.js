const Utils = require('../utils/utils');
const controllers = require('../controllers/controller.export');

async function mergeBlocks(ctx) {
    const _ctx = ctx;
    const { code, data } = _ctx.$body;

    if (code === 0 && data.list && data.list.length) {
        let empty = 0;
        const promises = [];

        data.list.forEach(async (item, index) => {
            item.list = [];

            if (!promises[index]) {
                promises[index] = [];
            }
            if (item.idlist.length) {
                item.idlist.forEach(itemId => {
                    promises[index].push(new Promise(resolve => {
                        controllers.article.findOne(itemId).then(response => {
                            resolve(response);
                        });
                    }));
                });
            } else {
                empty++;
                promises[index].push(null);
            }
        });

        if (data.list.length > empty) {
            const responseList = await Promise.all(Utils.flatten(promises));

            if (responseList.length) {
                for (let i = 0; i < promises.length; i++) {
                    const item = data.list[i];
                    const eachLen = item.idlist.length;

                    for (let j = 0; j < eachLen; j++) {
                        const response = responseList[j];

                        response && item.list.push(response);
                    }
                    responseList.splice(0, eachLen);
                }

                _ctx.$body.data.list = data.list;
            }
        }
    }
}

module.exports = {
    mergeBlocks,
};
