module.exports = (router) => {
    // 公共接口
    router.use('/api', require('./common'));
    // 用户模块
    router.use('/api/user', require('./user'));
    // 首页模块
    router.use('/api/home', require('./home'));
    // 系统设置
    router.use('/api/setup', require('./setup'));
    // 文章模块
    router.use('/api/article', require('./article'));
    // 分类模块
    router.use('/api/category', require('./category'));
    // 标签模块
    router.use('/api/tags', require('./tags'));

    // 前台模块
    router.use('/api/footerblock', require('./footerblock'));
    router.use('/api/friendlinks', require('./friendlinks'));
};
