<template>
    <el-container v-loading="loading">
        <!-- 头部开始 -->
        <el-header class="base-header">
            <layout-header />
        </el-header>
        <!-- 头部结束 -->

        <el-container>
            <!-- 侧边栏开始 -->
            <layout-side v-if="showSidebar" />
            <!-- 侧边栏结束 -->

            <el-container class="base-container">
                <!-- 主体开始 -->
                <el-main>
                    <bread-crumb v-if="showSidebar" />
                    <router-view />
                </el-main>
                <!-- 主体结束 -->

                <!-- footer 开始 -->
                <el-footer>
                    <layout-footer />
                </el-footer>
                <!-- footer 结束 -->
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
	import { mapState } from 'vuex';
	import BreadCrumb from './BreadCrumb/BreadCrumb.vue';
	import LayoutSide from './LayoutSide/LayoutSide.vue';
	import LayoutHeader from './LayoutHeader/LayoutHeader.vue';
	import LayoutFooter from './LayoutFooter/LayoutFooter.vue';

	export default {
		name: 'App',
		components: {
			BreadCrumb,
			LayoutSide,
			LayoutHeader,
			LayoutFooter,
		},
		data() {
			return {
				showSidebar: true,
				loading: false,
			};
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin,
			}),
		},
		created() {
			this.loading = false;
			console.log('isLogin:', this.isLogin);
		},
	};
</script>

<style lang="scss">
	/* 头部样式 */
	.base-header {
		background: url("../assets/images/shiyuan.jpg") repeat-x;
	}

	/* 内容区样式 */
	.base-container {
		overflow-x: hidden;
	}
</style>
