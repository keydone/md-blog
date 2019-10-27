<template>
    <section
        id="app"
        :class="{'scroll-x': $route.meta.showSideBlock !== false}"
    >
        <!-- 头部开始 -->
        <layout-header
            v-if="!$route.meta.hideBaseHeader"
            :transition="transition"
        />
        <!-- 头部结束 -->

        <el-container :class="['main-container', { 'full-height': $route.meta.hideBaseHeader, 'full-width': $route.meta.showSideBlock === false }]">
            <section class="main-section">
                <!-- 主体开始 -->
                <transition name="fade">
                    <keep-alive v-if="$route.meta.keepAlive">
                        <router-view v-if="isRouterAlive" />
                    </keep-alive>

                    <router-view v-else-if="isRouterAlive" />
                </transition>
                <!-- 主体结束 -->
            </section>

            <!-- 侧边栏开始 -->
            <transition name="fade">
                <layout-side v-if="$route.meta.showSideBlock !== false" />
            </transition>
            <!-- 侧边栏结束 -->
        </el-container>

        <!-- footer 开始 -->
        <layout-footer v-if="!$route.meta.hideBaseHeader" />
        <!-- footer 结束 -->
    </section>
</template>

<script>
    import LayoutSide from '@comp/LayoutSide/LayoutSide.vue';
    import LayoutHeader from '@comp/LayoutHeader/LayoutHeader.vue';
    import LayoutFooter from '@comp/LayoutFooter.vue';

    export default {
        name:       'App',
        components: {
            LayoutSide,
            LayoutHeader,
            LayoutFooter,
        },
        provide() {
            return {
                refresh: this.refresh,
            };
        },
        data() {
            return {
                isRouterAlive: true,
                transition:    false,
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.transition = true;
            });
        },
        methods: {
            refresh() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            },
        },
    };
</script>

<style lang="scss">
    /* 内容区样式 */
    .main-container {
        max-width: 1600px;
        min-height: 700px;
        margin: 0 auto;
        &.full-width {
            .main-aside {
                display: none;
            }
        }
    }
    .main-section {
        flex: 1;
        margin: 0 30px;
        min-width: 800px;
        position: relative;
    }
</style>
