
module.exports = (router) => {
    // 前台页面
    router.use('/', require('./routes/index.js'));
    router.use('/about', require('./routes/about.js'));
    router.use('/archives', require('./routes/archives.js'));
    router.use('/category', require('./routes/category.js'));
    router.use('/precious', require('./routes/precious.js'));
    router.use('/search', require('./routes/search.js'));
    router.use('/articles', require('./routes/article.js'));
    router.use('/tags', require('./routes/tags.js'));

    // 前台 post / get 接口
    router.use('/api', require('./api'));

    // 后台管理 / 发布文章, 管理文章
    router.use('/admin', require('./routes/admin.js'));

};
