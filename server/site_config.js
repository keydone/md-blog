/* 站点信息 */
const path = require('path');
const { existsSync } = require('fs');

const envFile = existsSync(path.resolve(__dirname, '../.env.js'));
const env = Object.assign({
    cdn: '/',
    tstamp: +new Date(),
}, envFile ? require('../.env.js') : {});

module.exports = {
    cdn: env.cdn,
    tstamp: env.tstamp,
    title: 'keydone',
    subtitle: 'For everything beautiful!',
    // banner显示的简短介绍
    subtitle_desc: '我不希望年老的时候，含着泪对年轻的自己说：<br>对不起，我没有成为当初你想要成为的那个人！',
    keywords: '前端博客, 前端, 程序员, 前端开发, 全栈开发, node.js, javascript, react, vue',
    timezone: 'Asia/Shanghai',
    logo: `${env.cdn}static/img/logo.png`,
    favicon_ico: `${env.cdn}static/img/favicon.ico`,
    avatar: `${env.cdn}static/img/avatar.png`,
    header_cover: `${env.cdn}static/img/dy.png`,
    loader_img: `${env.cdn}static/img/loader.gif`,
    default_cover: `${env.cdn}static/img/dy.png`,
    author: {
        name: 'keydone',
        link: 'https://github.com/keydone'
    },
    about: {
        info: '本站是基于 koa 搭建的静态资源博客，主要用于分享日常学习、生活及工作的心得总结，欢迎品尝。',
        address: '广东深圳',
        email: 'k754708625@gmail.com',
    },
    url: 'https://kaiziye.cn',
    permalink: 'p-:title-:year:month:day',
    new_post_name: ':title-:year:month:day.md',
    external_link: true, // 新标签页打开
    render_drafts: false,
    date_format: 'YYYY-MM-DD',
    time_format: 'HH:mm:ss',
    per_page: 10,
    theme: 'hexo-theme-skapp',
    menu: {
        home: {
            link: '/',
            title: '首页'
        },
        archives: {
            link: '/archives',
            title: '归档'
        },
        precious: {
            link: '/precious',
            title: '收藏'
        },
        about: {
            link: '/about',
            title: '关于'
        },
    },
    QRcode: `${env.cdn}static/img/avatar.png`,
    footers: [{
        name: '友情链接',
        values: [{
            link: 'https://github.com/Mrminfive/hexo-theme-skapp',
            desc: 'hexo-theme-skapp',
        }, {
            link: 'https://www.pandashen.com',
            desc: 'PandaShen',
        }]
    }, {
        name: '构建工具',
        values: [{
            link: 'https://koa.bootcss.com/',
            desc: 'Koa',
        }]
    }],
    secials: [{
        icon: 'github',
        link: 'https://github.com/keydone',
    }, {
        icon: 'email',
        link: 'k754708625@gmail.com',
    }],
    aside: {
        title: '淘金...',
        intro: '简介',
        desc: '我要做前端上的皇帝！<br>哼哼哈嘿哼哼哈嘿<br>- 前端渣渣<凯子>',
        categories: '文章分类',
        last_post: '最新文章',
        tag: '文章标签',
    },
    announce: '感谢您的阅读，本文由 <a href="http://kaiziye.cn">keydone</a> 原创提供。<br>如若转载，请注明出处：keydone'
};
