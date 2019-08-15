<template>
    <div class="index-content">
        <!-- 轮播 -->
        <div class="index-block banners">
            <banner />
        </div>

        <!-- 置顶 -->
        <besttop />

        <!-- 最新发布 -->
        <newest />

        <!-- 热门板块 -->
        <hot />

        <!-- 站长推荐 -->
        <popular />

        <!-- 文章 -->
        <div class="index-block broadcast-msg">
            <ul class="broadcast-msg_wrap">
                <li>欢迎 Claude 加入</li>
                <li>Claude 更新了资料</li>
            </ul>
        </div>
    </div>
</template>

<script>
	import { mapState } from 'vuex';
	import { baseLoginOut } from '@js/router/auth';
	import banner from './components/banner.vue';
	import besttop from './components/besttop.vue';
	import newest from './components/newest.vue';
	import popular from './components/popular.vue';
	import hot from './components/hot.vue';

	export default {
		name: 'Index',
		components: {
			banner,
			besttop,
			newest,
			popular,
			hot,
		},
		data() {
			return {
				activeName: 'first',
			};
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			}),
		},
		created() {
			// console.log('isLogin:', this.isLogin);
		},
		methods: {
			loginOut() {
				baseLoginOut();
			},
		},
	};
</script>

<style lang="scss">
	@import "./index.scss";
</style>
