const crypto = require('crypto');
const base64url = require('base64url');
const exclude = require('../utils/exclude');
const DataModel = require('../models/user-model');
const { decode } = base64url;

class User {
    // 注册
    static async register(ctx) {
        const _ctx = ctx;

        let { username, password } = _ctx.request.body;

        if (!username || !password) {
            ctx.body = {
                code: 1,
                msg:  '参数不合法!',
            };
        } else {
            username = decode(username);
            password = decode(password);

            // 检查用户名是否存在
            const checkUser = await DataModel.findOne({
                username,
            }, exclude);

            if (checkUser !== null) {
                _ctx.body = {
                    code: 1,
                    msg:  '用户名已存在!',
                };
            } else {
                const user = new DataModel({
                    username,
                    password: crypto.createHash('md5').update(password).digest('hex'), // 密码加密存储
                });

                const result = await user.save();

                _ctx.body = result !== null ? {
                    code: 0, msg:  '注册成功',
                } : {
                    code: 1, msg:  '注册失败',
                };
            }
        }
    }

    // 登录
    static async login(ctx) {
        const _ctx = ctx;

        let { username, password } = ctx.request.body;

        if (!username || !password) {
            _ctx.body = {
                code: 1,
                msg:  '参数不合法!',
            };
        } else {
            username = decode(username);
            password = decode(password);

            const result = await DataModel.findOne({
                username,
                password: crypto.createHash('md5').update(password).digest('hex'),
            }, exclude);

            if (result !== null) {
                // _ctx.session.user = username;

                _ctx.body = {
                    code: 0,
                    data: {
                        token:    'token',
                        menuList: [{
                            url: '/*',
                        }],
                        btnPermission: ['edit'],
                        userInfo:      {
                            username,
                            /* phone: '',
                            email: '', */
                        },
                    },
                    msg: '登录成功!',
                };
            } else {
                _ctx.body = { code: 1, msg: '用户名或密码错误!' };
            }
        }
    }

    // 获取用户信息
    static async userInfo(ctx) {
        const _ctx = ctx;
        const { username, password } = ctx.request.body;
        const result = await DataModel.findOne({
            username,
            password: crypto.createHash('md5').update(password).digest('hex'),
        }, exclude);

        if (result !== null) {
            _ctx.body = {
                code: 0,
                msg:  '查询成功!',
                data: {
                    _id:    result._id,
                    name:   result.name,
                    email:  result.email,
                    avatar: result.avatar,
                },
            };
        } else {
            _ctx.body = { code: 0, msg: '未找到!' };
        }
    }

    // 获取注册用户列表
    static async signedList(ctx) {
        const _ctx = ctx;
        const query = _ctx.request;
        const { username } = query;
        const searchType = typeof username === 'string' ? 'username' : '_id';

        let { pageSize, pageIndex } = query;

        pageIndex = (pageIndex - 1) || 0;
        pageSize = pageSize || 10;

        const filter = {};

        if (username) {
            filter[searchType] = username;
        }

        const total = await DataModel.countDocuments();
        const result = await DataModel.find(filter, {
            password: 0,
            ...exclude,
        })
            .limit(pageSize)
            .skip(pageIndex * pageSize)
            .sort({ createdAt: -1 });

        if (result !== null) {
            _ctx.body = {
                code: 0,
                msg:  '查询成功!',
                data: {
                    list:      result,
                    pageIndex: pageIndex + 1,
                    pageSize,
                    total,
                },
            };
        } else {
            _ctx.body = { code: 0, msg: '未找到!' };
        }
    }
}

module.exports = User;
