<template>
    <div class="wrapper">
        <h3 class="el-card__header">设置我的资料</h3>

        <div class="el-card__body">
            <el-form
                ref="form"
                class="short-input"
                label-width="120px"
                :model="form"
                :rules="rules"
            >
                <el-form-item
                    label="我的角色"
                    prop="role"
                >
                    <el-select v-model="form.role">
                        <el-option
                            value="super"
                            label="超级管理员"
                        />
                        <el-option
                            value="admin"
                            label="普通管理员"
                        />
                        <el-option
                            value="moderator"
                            label="版主"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="用户名"
                    prop="username"
                >
                    <el-input
                        v-model="form.username"
                        placeholder="可用于登录后台"
                    />
                </el-form-item>
                <el-form-item
                    label="昵称"
                    prop="nickname"
                >
                    <el-input
                        v-model="form.nickname"
                        placeholder="将显示在站点个人资料中"
                    />
                </el-form-item>
                <el-form-item
                    label="性别"
                    prop="sex"
                >
                    <el-checkbox-group v-model="form.sex">
                        <el-checkbox value="0">男</el-checkbox>
                        <el-checkbox value="1">女</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    label="头像"
                    prop="avatar"
                >
                    <el-input
                        v-model="form.avatar"
                        placeholder="你的头像图片地址"
                    />
                    <el-button>上传图片</el-button>
                    <el-button>查看图片</el-button>
                </el-form-item>
                <el-form-item
                    label="手机号"
                    prop="phone"
                >
                    <el-input
                        v-model="form.phone"
                        placeholder="可用于找回密码"
                    />
                    <router-link :to="{ name: 'security', query: { type: 'phone' } }">修改手机号</router-link>
                </el-form-item>
                <el-form-item
                    label="邮箱"
                    prop="email"
                >
                    <el-input
                        v-model="form.email"
                        placeholder="可用于找回密码"
                    />
                    <router-link :to="{ name: 'security', query: { type: 'email' } }">修改邮箱</router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    role:     'super',
                    username: 'super',
                    nickname: 'super',
                    sex:      'super',
                    avatar:   'super',
                    phone:    'super',
                    email:    'super',
                },
                rules: {
                    role: [{ required: true }],
                },
            };
        },
    };
</script>
