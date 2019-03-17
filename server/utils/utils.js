const path = require('path');
const { existsSync, mkdirSync } = require('fs');

class Utils {
    // 获取今天的日期 年月日
    today() {
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
    mkdirSync(dirpath) {
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
    isMobile(ctx) {
        const ua = ctx.request.headers['user-agent'];
        return /mobile/i.test(ua) && true;
    }

    unexpected(err) {
        const msgArr = [];
        for (const errName in err.errors) {
            msgArr.push(err.errors[errName].message);
        }
        return { success: false, msg: msgArr[0] || err.message || '我也不知道发生了什么 (-_-)' };
    }

    async checkSession(ctx, next) {
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
                ctx.body = {
                    status: 1,
                    msg: '请重新登录!',
                    redirect: '/login',
                };
                return;
            }
            ctx.redirect(`/login?ref=${url}`);
        }
        await next();
    }
}

module.exports = new Utils();
