<template>
    <div class="main-content">
        <h2>main</h2>
        <router-link :to="{ name: 'weconfig-index' }">前往 wecofnig</router-link>
        <button @click="http">发送请求</button>
        <button @click="loginOut">退出登录</button>
    </div>
</template>

<script>
	import { mapState } from 'vuex';
	import { resetToLogin } from '@bjs/router/auth';
	import { serviceLogin } from '@bjs/common/services';

	export default {
		name: 'Index',
		data() {
			return {};
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			}),
		},
		created() {
			console.log('isLogin:', this.isLogin);
		},
		methods: {
			loginOut() {
				resetToLogin();
			},
			async http() {
				const { code } = await serviceLogin();

				console.log(code);
			},
		},
	};
</script>

<style lang="scss">
	.main-content {
		padding: 10px;
	}
</style>
