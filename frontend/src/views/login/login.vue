<template>
    <div class="user-auth">
        <div class="auth-logo">auth-logo</div>
        <h1 class="auth-title">登录网站</h1>
        <el-form
            ref="form"
            v-model="form"
            :rules="rules"
            inline
            label-width="100px"
        >
            <el-form-item label="邮箱/用户名:">
                <el-input placeholder="输入邮箱/用户名" />
            </el-form-item>
            <el-form-item label="输入密码:">
                <el-input
                    type="password"
                    placeholder="密码"
                />
            </el-form-item>
        </el-form>
        <el-button>返回首页</el-button>
        <el-button>立即登录</el-button>

        <div class="to-register">
            <router-link :to="{name: 'register'}">立即注册</router-link> . <router-link :to="{name: 'resetpassword'}">忘记密码</router-link>
        </div>

        <div class="copyright">@2019-2021 All Right Reserved · claude</div>
    </div>
</template>

<script src="./login.js"></script>

<style lang="scss">
	.user-auth {
		width: 400px;
		margin: 20px auto;
	}
</style>
