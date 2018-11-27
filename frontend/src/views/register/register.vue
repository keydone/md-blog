<template>
    <div class="user-auth">
        <div class="auth-logo">auth-logo</div>
        <h1 class="auth-title">注册账号</h1>
        <el-form
            ref="form"
            v-model="form"
            :rules="rules"
            inline
            label-width="100px"
        >
            <el-form-item label="输入用户名:">
                <el-input placeholder="用户名" />
            </el-form-item>
            <el-form-item label="输入密码:">
                <el-input
                    type="password"
                    placeholder="密码"
                />
            </el-form-item>
            <el-form-item label="再次输入密码:">
                <el-input
                    type="password"
                    placeholder="确认密码"
                />
            </el-form-item>
        </el-form>
        <el-button>返回首页</el-button>
        <el-button>立即注册</el-button>

        <div class="to-login">
            已有账号? 立即 <router-link :to="{name: 'login'}">登录</router-link>
        </div>

        <div class="right-tip">提交注册即代表同意我们的 [使用条款]...</div>
        <div class="copyright">@2019-2021 All Right Reserved · claude</div>
    </div>
</template>

<script src="./register.js"></script>

<style lang="scss">
	.main-container.full-screen {
		background: url("../../assets/images/bg.jpg") no-repeat;
		background-size: cover;
	}
	.auth-logo {
		padding: 50px;
		width: 150px;
		height: 150px;
		margin: 0 auto;
	}
	.user-auth {
		width: 400px;
		margin: 0 auto;
	}
	.auth-title {
		font-weight: bold;
		text-align: center;
		margin: 30px 0;
		color: #fff;
	}
</style>
