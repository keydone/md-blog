<template>
    <div id="app">
        <!-- 头部开始 -->
        <layout-header v-if="!$route.meta.hideBaseHeader" />
        <!-- 头部结束 -->

        <main :class="['main-container', { 'full-screen': $route.meta.hideBaseHeader }]">
            <section class="main-section">
                <!-- 主体开始 -->
                <router-view />
                <!-- 主体结束 -->
            </section>

            <!-- 侧边栏开始 -->
            <layout-side v-if="$route.meta.showSideBlock !== false" />
            <!-- 侧边栏结束 -->
        </main>

        <!-- footer 开始 -->
        <layout-footer v-if="!$route.meta.hideBaseHeader" />
        <!-- footer 结束 -->
    </div>
</template>

<script>
	import LayoutSide from '@comp/LayoutSide/LayoutSide.vue';
	import LayoutHeader from '@comp/LayoutHeader/LayoutHeader.vue';
	import LayoutFooter from '@comp/LayoutFooter/LayoutFooter.vue';

	export default {
		name: 'App',
		components: {
			LayoutSide,
			LayoutHeader,
			LayoutFooter,
		},
		data() {
			return {
				showSideBlock: false,
			};
		},
		created() {
			console.log('----- app initialized -----');
		},
	};
</script>

<style lang="scss">
	/* 头部样式 */
	.base-heading {
		margin-bottom: 30px;
		height: 64px;
		line-height: 36px;
	}

	/* 内容区样式 */
	.main-container {
		max-width: 1600px;
		margin: 0 auto;
	}
	.main-section {
		flex: 1;
		padding-left: 30px;
	}
</style>
