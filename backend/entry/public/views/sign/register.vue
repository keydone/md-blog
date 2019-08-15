<template>
    <div
        id="app"
        class="user-auth"
    >
        <div class="user-auth__wrap">
            <div class="auth-logo">auth-logo</div>
            <h1 class="auth-title">注册账号</h1>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="输入你的用户名/邮箱 (8 到 30 个字符)"
                        clearable
                    >
                        <i
                            slot="prepend"
                            class="prepend-ico el-icon-user"
                        />
                    </el-input>
                </el-form-item>
                <el-form-item
                    prop="password"
                    class="passwordInput"
                >
                    <el-input
                        v-model="form.password"
                        placeholder="输入你的密码 (8 到 16 个字符)"
                        :clearable="true"
                        type="password"
                        @focus="focus"
                        @blur="blur"
                    >
                        <i
                            slot="prepend"
                            class="prepend-ico el-icon-lock"
                        />
                    </el-input>
                </el-form-item>
                <p :class="['password-tip', { 'show-warning': form.showWarning }]">密码长度为 8 到 16 个字符且至少包含1个大写字母, 小写字母, 数字和特殊字符</p>
                <el-form-item prop="passwordAgain">
                    <el-input
                        v-model="form.passwordAgain"
                        placeholder="再次输入你的密码"
                        type="password"
                        clearable
                    >
                        <i
                            slot="prepend"
                            class="prepend-ico el-icon-lock"
                        />
                    </el-input>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button
                        type="primary"
                        style="width: 100%"
                        @click="toRegist"
                    >
                        立即注册
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="text-center copyright-text">
                已有账号? <router-link
                    :to="{ name: 'login' }"
                    class="f-small"
                >
                    立即登录
                </router-link>
                <p>提交注册即代表同意我们的 [使用条款]...</p>
                <p>@2019-2021 All Right Reserved · claude</p>
            </div>
        </div>
    </div>
</template>

<script>
    import base64url from 'base64-url';
    import { register } from '@bjs/common/services';

    export default {
        data() {
            return {
                form: {
                    username:      'iamroot!',
                    password:      'iamR00t!',
                    passwordAgain: 'iamR00t!',
                    showWarning:   false,
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
                            message: '密码长度为 8 到 30 个字符',
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
                        { validator: this.validatePassWord, trigger: 'blur' },
                    ],
                    passwordAgain: [
                        {
                            required: true,
                            message:  '请再次输入密码',
                            trigger:  'blur',
                        },
                        {
                            min:     8,
                            max:     16,
                            message: '密码长度为 8 到 16 个字符',
                            trigger: 'blur',
                        },
                        { validator: this.validatePassWordAgain, trigger: 'blur' },
                    ],
                },
            };
        },
        computed: {
            passwordType: () =>
                new RegExp(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).{8,16}$/
                ),
        },
        methods: {
            focus() {
                this.form.showWarning = true;
            },
            blur() {
                this.form.showWarning = false;
            },
            validatePassWord(rule, value, callback) {
                if (!this.passwordType.test(value)) {
                    callback(
                        new Error(
                            '密码必须包含至少1个大写字母, 小写字母, 数字和特殊字符'
                        )
                    );
                } else {
                    callback();
                }
            },
            validatePassWordAgain(rule, value, callback) {
                if (value !== this.form.password) {
                    callback(new Error('两次输入的密码不一致! 请重新输入'));
                    this.form.passwordAgain = '';
                } else {
                    callback();
                }
            },
            async toRegist($event) {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        const { code, msg } = await this.$http(register, {
                            btnState: {
                                target: $event,
                            },
                            data: {
                                username: base64url.encode(this.form.username),
                                password: base64url.encode(this.form.password),
                            },
                        });

                        if (code === 0) {
                            this.$message.success(msg);
                            setTimeout(() => {
                                this.$router.replace({ name: 'login' });
                            }, 1200);
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
