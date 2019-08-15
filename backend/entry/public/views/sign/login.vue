<template>
    <div
        id="app"
        class="user-auth"
    >
        <div class="user-auth__wrap">
            <div class="auth-logo">auth-logo</div>
            <h1 class="auth-title">xx网站后台</h1>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
            >
                <el-form-item>
                    <el-input
                        v-model="form.username"
                        placeholder="输入你的用户名/邮箱"
                    >
                        <i
                            slot="prepend"
                            class="prepend-ico el-icon-user"
                        />
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="输入你的密码"
                    >
                        <i
                            slot="prepend"
                            class="prepend-ico el-icon-lock"
                        />
                    </el-input>
                </el-form-item>
                <el-form-item class="form-checkbox">
                    <el-checkbox
                        v-model="easyLogin"
                        @change="easyToLogin"
                    >
                        记住账号密码
                    </el-checkbox>
                    <router-link
                        :to="{name: 'resetpassword'}"
                        class="fr"
                    >
                        忘记密码 ?
                    </router-link>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="tologin"
                        @click="autoLogin"
                    >
                        立即登录
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="to-register">
                <!-- <router-link :to="{name: 'register'}">立即注册</router-link> -->
                <div class="copyright">@2019-2021 All Right Reserved · claude</div>
            </div>
        </div>
    </div>
</template>

<script>
    import base64url from 'base64-url';
    import ls from '@bjs/storage/localstorage';
    import { lsEasyToLogin } from '@bjs/const/consts';
    import { baseLogin } from '@bjs/router/auth';
    import { login } from '@bjs/common/services';

    const { encode } = base64url;

    export default {
        data() {
            return {
                easyLogin: false,
                form:      {
                    username: 'iamroot!',
                    password: 'iamR00t!',
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message:  '请输入用户名',
                            trigger:  'blur',
                        },
                        {
                            min:     8,
                            max:     16,
                            message: '密码长度为 8 到 16 个字符',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {
                            min:     8,
                            max:     16,
                            message: '密码长度为 8 到 16 个字符',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },
        created() {
            this.easyLogin = ls.get(lsEasyToLogin);
        },
        methods: {
            easyToLogin(value) {
                ls.set(lsEasyToLogin, value);
            },
            async autoLogin($event) {
                // 请求接口
                const { code, data } = await this.$http(login, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        username: encode(this.form.username),
                        password: encode(this.form.password),
                    },
                });

                if (code === 0) {
                    baseLogin(data);
                }
            },
            async toRegist($event) {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        const { code, msg } = await this.$http(login, {
                            btnState: {
                                target: $event,
                            },
                            data: {
                                username: this.form.username,
                                password: this.form.password,
                            },
                        });

                        if (code === 0) {
                            this.$router.replace({ name: 'index' });
                        } else {
                            this.$message.error(msg);
                        }
                    }
                });
            },
        },
    };
</script>

<style lang="scss">
    @import "./sign.scss";
</style>
