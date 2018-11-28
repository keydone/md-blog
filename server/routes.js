module.exports = router => {
    // 前台页面
    router.use('/', require('./routes/index.js'));
    // 前台 post / get
    router.use('/api', require('./api'));
    // 后台管理
    router.use(['backdoor', '/admin'], require('./routes/backdoor.js'));
};
