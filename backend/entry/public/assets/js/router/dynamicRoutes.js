/*!
 * @author claude
 * date 07/05/2019
 * 动态路由模块
 */
import asyncComponent from '@bjs/common/asyncComponent';

const dynamicRoutes = [
    {
        path: '/',
        meta: {
            permission: true,
            asmenu:     true,
            role:       '*',
        },
        children: [{
            path: '',
            name: 'home',
            meta: {
                title: '控制面板',
                icon:  'el-icon-monitor',
            },
            component: () => asyncComponent(import('@bviews/home')),
        }],
    },
    {
        path: '/index',
        meta: {
            requiresAuth: false,
            permission:   true,
            icon:         'el-icon-s-home',
            title:        '首页管理',
            role:         '*',
        },
        children: [{
            path: '',
            name: 'index',
            meta: {
                title: '板块管理',
            },
            component: () => asyncComponent(import('@bviews/index/index.vue')),
        }, {
            path: 'advertise',
            name: 'advertise',
            meta: {
                title: '广告位管理',
            },
            component: () => asyncComponent(import('@bviews/index/advertise.vue')),
        }, {
            path: 'notice',
            name: 'notice',
            meta: {
                title: '公告管理',
            },
            component: () => asyncComponent(import('@bviews/index/notice.vue')),
        }, {
            path: 'activity',
            name: 'activity',
            meta: {
                title: '活跃度管理',
            },
            component: () => asyncComponent(import('@bviews/index/activity.vue')),
        }],
    }, {
        path: '/application',
        meta: {
            title: '网站文章',
            icon:  'el-icon-document',
        },
        children: [{
            path: '',
            name: 'article',
            meta: {
                title: '文章管理',
            },
            component: () => asyncComponent(import('@bviews/application/article.vue')),
        }, {
            path: 'category',
            name: 'category',
            meta: {
                title: '分类管理',
            },
            component: () => asyncComponent(import('@bviews/application/category.vue')),
        }, {
            path: 'tags',
            name: 'tags',
            meta: {
                title: '标签管理',
            },
            component: () => asyncComponent(import('@bviews/application/tags.vue')),
        }, {
            path: 'mail',
            name: 'mail',
            meta: {
                title: '站内信管理',
            },
            component: () => asyncComponent(import('@bviews/application/mail.vue')),
        }, {
            path: 'workorder',
            name: 'workorder',
            meta: {
                title: '工单审核',
            },
            component: () => asyncComponent(import('@bviews/application/workorder.vue')),
        }],
    }, {
        path: '/user',
        meta: {
            icon:  'el-icon-user',
            title: '用户管理',
        },
        children: [{
            path: '',
            name: 'user',
            meta: {
                title: '注册用户',
            },
            component: () => asyncComponent(import('@bviews/user/user-sign.vue')),
        }, {
            path: 'admin',
            name: 'user-admin',
            meta: {
                title: '后台管理员',
            },
            component: () => asyncComponent(import('@bviews/user/user-admin.vue')),
        }, {
            path: 'role',
            name: 'user-role',
            meta: {
                title: '角色管理',
            },
            component: () => asyncComponent(import('@bviews/user/user-role.vue')),
        }],
    }, {
        path: '/upload',
        meta: {
            icon:  'el-icon-cloudy',
            title: '上传文件',
        },
        children: [{
            path: '',
            name: 'upload',
            meta: {
                title: '上传文件',
            },
            component: () => asyncComponent(import('@bviews/upload/upload.vue')),
        }, {
            path: 'list',
            name: 'uploadlist',
            meta: {
                title: '文件列表',
            },
            component: () => asyncComponent(import('@bviews/upload/upload-list.vue')),
        }],
    }, {
        path: '/system',
        meta: {
            icon:  'el-icon-setting',
            title: '系统设置',
        },
        children: [{
            path: '',
            name: 'setup',
            meta: {
                title: '网站设置',
            },
            component: () => asyncComponent(import('@bviews/system/setup.vue')),
        }, {
            path: 'message',
            name: 'message',
            meta: {
                title: '消息中心',
            },
            component: () => asyncComponent(import('@bviews/system/message.vue')),
        }, {
            path: 'email',
            name: 'email',
            meta: {
                title: '邮件服务',
            },
            component: () => asyncComponent(import('@bviews/system/email.vue')),
        }, {
            path: 'admin',
            name: 'admin',
            meta: {
                title: '我的资料',
            },
            component: () => asyncComponent(import('@bviews/system/admin.vue')),
        }, {
            path: 'security',
            name: 'security',
            meta: {
                title: '账户安全',
            },
            component: () => asyncComponent(import('@bviews/system/security.vue')),
        }],
    },
];

export default dynamicRoutes;
