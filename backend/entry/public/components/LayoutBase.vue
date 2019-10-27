<template>
    <el-container
        id="app"
        v-loading="loading"
        :class="{ 'sideBarCollapsed': sideBarCollapsed }"
    >
        <!-- 侧边栏开始 -->
        <v-side />
        <!-- 侧边栏结束 -->

        <section class="section-container">
            <!-- 头部开始 -->
            <el-header class="base-header">
                <v-header />
            </el-header>
            <!-- 头部结束 -->

            <el-scrollbar
                ref="scrollbar"
                class="base-container"
            >
                <v-tags v-if="tagsList.length" />
                <!-- 主体开始 -->
                <el-main class="posr">
                    <v-bread-crumb />
                    <transition name="slide">
                        <keep-alive :include="tagsList">
                            <router-view v-if="isRouterAlive" />
                        </keep-alive>
                    </transition>
                </el-main>
                <!-- 主体结束 -->

                <!-- footer 开始 -->
                <!-- <el-footer height="40px">
                    <img src="../assets/images/logo.png">
                    xxx 管理系统
                </el-footer> -->
                <!-- footer 结束 -->
            </el-scrollbar>
        </section>
    </el-container>
</template>

<script>
    import vTags from './LayoutTags.vue';
    import vHeader from './LayoutHeader.vue';
    import vBreadCrumb from './BreadCrumb.vue';
    import vSide from './LayoutSide/LayoutSide.vue';
    import ls from '@bjs/storage/localstorage';
    import { lsAsideCollapsedKey } from '@bjs/const/consts';

    export default {
        name:       'App',
        components: {
            vTags,
            vSide,
            vBreadCrumb,
            vHeader,
        },
        provide() {
            return {
                refresh: this.refresh,
            };
        },
        data() {
            return {
                tagsList:         [],
                loading:          false,
                isRouterAlive:    true,
                sideBarCollapsed: false,
            };
        },
        created() {
            this.sideBarCollapsed = ls.get(lsAsideCollapsedKey);

            this.$bus.$on('collapseChanged', asideCollapsed => {
                this.sideBarCollapsed = asideCollapsed;
            });
        },
        mounted() {
            this.$nextTick(() => {
                this.$root.scrollbar = this.$refs.scrollbar.$el;
                setTimeout(() => {
                    this.loading = false;
                }, 500);
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
    .el-header {
        position: relative;
        z-index: 201;
    }
    .el-footer {
        line-height: 30px;
        font-weight: bold;
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        img {
            width: 30px;
            position: relative;
            top: -2px;
        }
    }
</style>
