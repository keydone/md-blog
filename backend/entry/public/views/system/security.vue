<template>
    <div class="wrapper">
        <h3 class="el-card__header">安全设置</h3>

        <div class="el-card__body">
            <div class="es-security">安全等级</div>

            <ul class="es-setting">
                <li>
                    <i class="el-icon el-icon-a" />
                    <span class="setting-title">登录密码</span>
                    <span class="setting-content">经常更改密码有助于保护您的帐号安全</span>
                    <span class="setting-action">
                        <i class="setting-status el-icon-" />已设置
                        <el-button>修改</el-button>
                    </span>
                </li>
                <li>
                    <i class="el-icon el-icon-a" />
                    <span class="setting-title">安全问题</span>
                    <span class="setting-content">设置安全问题，保护帐号密码安全</span>
                    <span class="setting-action">
                        <i class="setting-status el-icon-" />未设置
                        <el-button>设置</el-button>
                    </span>
                </li>
                <li>
                    <i class="el-icon el-icon-a" />
                    <span class="setting-title">手机绑定</span>
                    <span class="setting-content">可用于找回登录密码. (已绑定手机：130****8015)</span>
                    <span class="setting-action">
                        <i class="setting-status el-icon-" />已设置
                        <el-button>修改</el-button>
                    </span>
                </li>
                <li>
                    <i class="el-icon el-icon-a" />
                    <span class="setting-title">邮箱设置</span>
                    <span class="setting-content">可用于找回登录密码. (已绑定邮箱：130****8015)</span>
                    <span class="setting-action">
                        <i class="setting-status el-icon-" />已设置
                        <el-button>绑定</el-button>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    role: 'super',
                },
                rules: {
                    role: [{ required: true }],
                },
            };
        },
    };
</script>
