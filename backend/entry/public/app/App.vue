<template>
	<el-container id="app">
		<!-- 头部开始 -->
		<el-header class="base-header">
			<layout-header />
		</el-header>
		<!-- 头部结束 -->

		<el-container>
			<!-- 侧边栏开始 -->
			<layout-side />
			<!-- 侧边栏结束 -->

			<el-container class="base-container">
				<!-- 主体开始 -->
				<el-main>
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
	import LayoutSide from "@bcomp/LayoutSide/LayoutSide.vue";
	import LayoutHeader from "@bcomp/LayoutHeader/LayoutHeader.vue";
	import LayoutFooter from "@bcomp/LayoutFooter/LayoutFooter.vue";

	export default {
		name: "App",
		components: {
			LayoutSide,
			LayoutHeader,
			LayoutFooter
		},
		created() {
			console.log("----- app initialized -----");
		}
	};
</script>

<style lang="scss">
	/* 头部样式 */
	.base-header {
		color: $color-white;
		background: url("../assets/images/bg.jpg") repeat-x;
	}

	/* 内容区样式 */
	.base-container {
		overflow-x: hidden;
	}
</style>
