<template>
    <div
        id="app"
        :class="{'appOnload': appOnload}"
    >
        <!-- 头部开始 -->
        <layout-header
            v-if="!$route.meta.hideBaseHeader"
            :transition="transition"
        />
        <!-- 头部结束 -->

        <main :class="['main-container', { 'full-screen': $route.meta.hideBaseHeader }]">
            <section class="main-section">
                <!-- 主体开始 -->
                <transition name="transverse-slide">
                    <router-view />
                </transition>
                <!-- 主体结束 -->
            </section>

            <!-- 侧边栏开始 -->
            <layout-side
                v-if="$route.meta.showSideBlock !== false"
                :transition="transition"
            />
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
	import LayoutFooter from '@comp/LayoutFooter.vue';

	export default {
		name: 'App',
		components: {
			LayoutSide,
			LayoutHeader,
			LayoutFooter,
		},
		data() {
			return {
				appOnload: false,
				showSideBlock: false,
				transition: false,
			};
		},
		created() {
			console.log('----- app initialized -----');
		},
		mounted() {
			this.appOnload = true;
			this.transition = true;
		},
	};
</script>

<style lang="scss">
	@keyframes bounce {
		0% {
			transform: translate(0, -36px);
		}
		50% {
			transform: translate(0, 0);
		}
		80% {
			transform: translate(0, 5px);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	.appOnload {
		.base-heading {
			animation: bounce 0.24s linear forwards;
		}
	}
	/* 头部样式 */
	.base-heading {
		margin-bottom: 30px;
		height: 64px;
		line-height: 36px;
		background: #fff;
		transform: translate(0, -66px);
	}

	/* 内容区样式 */
	.main-container {
		max-width: 1600px;
		min-height: 900px;
		margin: 0 auto;
	}
	.main-section {
		flex: 1;
		padding-left: 30px;
	}
	/* .vertical-slide-enter-active,
		.vertical-slide-leave-active,
		.transverse-slide-enter-active,
		.transverse-slide-leave-active {
		transition: transform 0.2s ease;
		}
		.vertical-slide-enter,
		.vertical-slide-leave-to {
		transform: translateY(10px);
		}
		.transverse-slide-enter,
		.transverse-slide-leave-to {
		transform: translateX(10px);
		}

		.transverse-revert-enter-active,
		.transverse-revert-leave-active {
		transition: transform 0.3s ease;
		}
		.transverse-revert-enter,
		.transverse-revert-leave-to {
		transform: translateX(-10px);
		} */
</style>
