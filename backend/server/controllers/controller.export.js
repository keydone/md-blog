const ControllerBase = require('./controller.base');
const activity = new ControllerBase('home/acts-model');
const advertise = new ControllerBase('home/advs-model');
const blocks = new ControllerBase('home/blocks-model');
const notice = new ControllerBase('home/notice-model');
const category = new ControllerBase('category-model');
const footerblock = new ControllerBase('footerblock-model');
const friendlinks = new ControllerBase('friendlink-model');
const setup = new ControllerBase('setup-model');
// const stuff = new ControllerBase('stuff-model');
const tags = new ControllerBase('tags-model');
const article = require('./article');
const user = require('./user');

module.exports = {
    activity,
    advertise,
    blocks,
    notice,
    article,
    category,
    footerblock,
    friendlinks,
    setup,
    // stuff,
    tags,
    user,
};
