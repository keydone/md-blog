const crypto = require('crypto');
const UserModel = require('../models/user-model');

class User {
    // 注册
    static async register(ctx) {
        const { name, password, email } = ctx.request.body;

        if (!name || !password) {
            ctx.body = {
                status: 1,
                msg: '参数不合法!',
            };
        } else {
            // 检查用户名是否存在
            const checkUser = await UserModel.findOne({
                name,
            });

            if (checkUser !== null) {
                ctx.body = {
                    status: 1,
                    msg: '用户名已存在!',
                };
            } else {
                const user = new UserModel({
                    name,
                    password: crypto.createHash('md5').update(password).digest('hex'), // 密码加密存储
                    email,
                });

                const result = await user.save();

                ctx.body = result !== null ? {
                    status: 0, msg: '注册成功',
                } : {
                        status: 1, msg: '注册失败',
                    };
            }
        }
    }

    // 登录
    static async login(ctx) {
        const { name, password } = ctx.request.body;

        if (!name || !password) {
            ctx.body = {
                status: 1,
                msg: '参数不合法!',
            };
        } else {
            const result = await UserModel.findOne({
                name,
                password: crypto.createHash('md5').update(password).digest('hex'),
            });

            if (result !== null) {
                ctx.session.user = name;

                ctx.body = {
                    status: 0,
                    msg: '登录成功!',
                };
            } else {
                ctx.body = { status: 1, msg: '用户名或密码错误!' };
            }
        }
    }

    // 获取用户信息
    static async userInfo(ctx) {
        const { name, password } = ctx.request.body;
        const result = await UserModel.findOne({
            name,
            password: crypto.createHash('md5').update(password).digest('hex'),
        });

        if (result !== null) {
            ctx.body = {
                status: 0,
                msg: '查询成功!',
                data: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    avatar: result.avatar,
                },
            };
        } else {
            ctx.body = { status: 0, msg: '未找到!' };
        }
    }
}

module.exports = User;
