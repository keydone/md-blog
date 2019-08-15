<template>
    <div class="wrapper">
        <h3 class="el-card__header">邮件服务</h3>

        <div class="el-card__body">
            <el-form
                ref="form"
                class="short-input"
                label-width="120px"
                :model="form"
                :rules="rules"
            >
                <el-form-item
                    label="SMTP服务器"
                    prop="smtpIp"
                >
                    <el-input
                        v-model="form.smtpIp"
                        placeholder="如：smtp.163.com"
                    />
                </el-form-item>
                <el-form-item
                    label="SMTP端口号"
                    prop="smtpPort"
                >
                    <el-input
                        v-model="form.smtpPort"
                        placeholder="通常为 25 或 465"
                    />
                </el-form-item>
                <el-form-item
                    label="发件人邮箱"
                    prop="emailAddress"
                >
                    <el-input
                        v-model="form.emailAddress"
                        placeholder="你的邮箱地址"
                    />
                </el-form-item>
                <el-form-item
                    label="发件人昵称"
                    prop="nickname"
                >
                    <el-input
                        v-model="form.nickname"
                        placeholder="你的邮箱昵称"
                    />
                </el-form-item>
                <el-form-item
                    label="邮箱登录密码"
                    prop="emailPassword"
                >
                    <el-input
                        v-model="form.emailPassword"
                        placeholder="你的邮箱登录密码"
                        type="password"
                    />
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
                    smtpIp:        'smtp.aliyun.com',
                    smtpPort:      25,
                    emailAddress:  '',
                    nickname:      '',
                    emailPassword: '',
                },
                rules: {
                    smtpIp:        [{ required: true }],
                    smtpPort:      [{ required: true }],
                    emailAddress:  [{ required: true }],
                    nickname:      [{ required: true }],
                    emailPassword: [{ required: true }],
                },
            };
        },
    };
</script>
