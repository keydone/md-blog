const path = require('path');
const { existsSync, mkdirSync } = require('fs');

class Utils {
    // 获取今天的日期 年月日
    today () {
        const now = new Date();
        const year = now.getFullYear();

        let month = now.getMonth() + 1;

        if (month < 10) {
            month = String(month).padStart(2, '0');
        }

        let date = now.getDate();

        if (date < 10) {
            date = String(date).padStart(2, '0');
        }

        return `${year}${month}${date}`;
    }

    // 同步创建文件夹
    mkdirSync (dirpath) {
        if (!existsSync(dirpath)) {
            let pathtmp;

            dirpath.split('/').forEach((dirname) => {
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                } else {
                    // 如果在linux系统中，第1个dirname的值为空，所以赋值为"/"
                    pathtmp = dirname || '/';
                }
                if (!existsSync(pathtmp)) {
                    if (!mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true;
    }

    // 判断是否是手机
    isMobile (ctx) {
        const ua = ctx.request.headers['user-agent'];

        return /mobile/i.test(ua) && true;
    }

    // 接口报错
    unexpected (error, ctx, next) {
        const msgArr = [];
        const _ctx = ctx;

        for (const errNameIgnored in error.errors) {
            msgArr.push(error.errors[errNameIgnored].message);
        }
        const result = {
            code: 1,
            msg: msgArr[0] || error.message || '我也不知道发生了什么 (-_-)',
        };

        _ctx[`${next ? '$' : ''}body`] = result;
    }

    // 数组递归展平
    flatten (array) {
        while (array.some(item => Array.isArray(item))) {
            //如果当前数组中还有数组，则展开
            array = [].concat(...array);
        }
        return array;
    }

    // 检查session是否失效
    async checkSession (ctx, next) {
        const _ctx = ctx;

        if (ctx.session.user) {
            // 已登录
            if (ctx.request.path === '/login') {
                const { url } = ctx.request;
                const ref = url.split('?ref=')[1];

                ctx.redirect(ref || '/admin');
            }
        } else if (ctx.request.path !== '/login') {
            // 未登录
            const { url } = ctx.request;

            if (ctx.request.method === 'POST') {
                _ctx.body = {
                    code: 1,
                    msg: '请重新登录!',
                    redirect: '/login',
                };
                return;
            }
            _ctx.redirect(`/login?ref=${url}`);
        }
        await next();
    }

    // 检查登录是否有效
    async checkRedis (ctx, next) {
        const _ctx = ctx;

        if (_ctx.headers.token) {
            // 有权限
            const authToken = true;

            if (authToken) {
                /* _ctx.body = {
                    code: 0, msg:  'ok',
                }; */

                if (next) {
                    return await next(_ctx);
                }
            }

            _ctx.status = 403;
            _ctx.body = { code: _ctx.status, msg: 'access denied.' };
            return;
        }

        _ctx.status = 401;
        _ctx.body = {
            code: _ctx.status,
            msg: '请先登录',
        };
        return;
    }
    // 检查用户权限
    async checkAuthent (ctx, next) {
        const _ctx = ctx;

        // 有访问权限
        if (_ctx.request.headers.token) {

            if (next) {
                return await next(_ctx);
            }
        }

        // 没有访问权限
        _ctx.status = 403;
        _ctx.body = {
            code: _ctx.status, msg: 'access denied.',
        };
        return;
    }
}

module.exports = new Utils();
