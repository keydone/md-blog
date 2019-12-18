<template>
    <header class="base-heading">
        <div
            v-if="skin !== 'fly'"
            class="heading-container"
        >
            <div class="logo">
                <img src="">
            </div>

            <!-- 导航开始 -->
            <div class="nav-menu fl">
                <div class="nav-menu">
                    <router-link
                        :to="{ name: 'index' }"
                        :class="['menu-link', {'exact-match-link': $route.path === '/'}]"
                    >
                        首页
                    </router-link>
                </div>
                <el-dropdown
                    class="nav-menu"
                    placement="bottom"
                >
                    <router-link
                        :to="{ name: 'list' }"
                        :class="['menu-link', {'exact-match-link': $route.path === '/list'}]"
                    >
                        Mac 软件
                    </router-link>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="sub-nav"
                    >
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                装机必备
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                系统工具
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                图片视频
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown
                    class="nav-menu"
                    placement="bottom"
                >
                    <router-link
                        :to="{ name: 'list' }"
                        class="menu-link"
                    >
                        设计资源
                    </router-link>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="sub-nav"
                    >
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                装机必备
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                系统工具
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link
                                :to="{ name: 'list' }"
                                class="menu-link"
                            >
                                图片视频
                            </router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- <router-link
                    :to="{ name: 'post' }"
                    class="nav-menu"
                >
                    <el-button
                        class="post-btn"
                        type="primary"
                    >
                        发布新资源
                    </el-button>
                </router-link> -->
            </div>

            <!-- 导航右侧内容 -->
            <ul class="heading-side fr hidden">
                <li v-if="!isLogin">
                    <router-link :to="{ name: 'login' }">
                        <button class="btn-normal">登录</button>
                    </router-link>
                </li>
                <li v-if="!isLogin">
                    <router-link :to="{ name: 'register' }">
                        <button class="btn-normal btn-primary">注册</button>
                    </router-link>
                </li>
                <li v-else>
                    <button class="btn-normal">退出登录</button>
                </li>
            </ul>

            <!-- 公告 -->
            <div
                v-if="notices.length"
                class="base-notice"
            >
                公告轮播
                新开站点
                会员 5 折
            </div>
        </div>

        <div
            v-else
            class="main-nav-fly"
        >
            <div class="main-nav-logo fl">
                <router-link :to="{ name: 'index' }">
                    <img
                        class="logo"
                        src="../../assets/images/logo.png"
                        alt="logo"
                    >
                </router-link>
            </div>

            <div class="main-nav-right">
                <div class="nav-top">
                    <el-button>添加到收藏夹</el-button>
                    <el-button>登录</el-button>
                    <el-button>注册</el-button>
                </div>

                <div class="nav-main">
                    <div class="nav-menu">
                        <router-link
                            :to="{name: 'index'}"
                            class="menu-link"
                        >
                            首页
                        </router-link>
                    </div>
                    <div class="nav-menu">
                        <a
                            href="##"
                            class="menu-link"
                        >Mac 软件</a>
                        <ul class="sub-nav">
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >装机必备</a>
                            </li>
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >系统工具</a>
                            </li>
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >图片视频</a>
                            </li>
                        </ul>
                    </div>
                    <div class="nav-menu">
                        <a
                            href="##"
                            class="menu-link"
                        >设计资源</a>
                        <ul class="sub-nav">
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >装机必备</a>
                            </li>
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >系统工具</a>
                            </li>
                            <li class="sub-menu">
                                <a
                                    href="##"
                                    class="submenu-link"
                                >图片视频</a>
                            </li>
                        </ul>
                    </div>
                    <router-link
                        :to="{name: 'post'}"
                        class="nav-menu"
                    >
                        <el-button
                            class="post-btn"
                            type="primary"
                        >
                            发布新资源
                        </el-button>
                    </router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                skin:     'fly-',
                keywords: '',
                notices:  [],
            };
        },
        computed: {
            ...mapState({
                isLogin: state => state.base.isLogin,
            }),
        },
        methods: {
            autoFocus() {
                setTimeout(() => {
                    this.$refs.searchInput.focus();
                }, 200);
            },
            search() {
                const keywords = this.keywords.trim();

                if (keywords !== '' && keywords.length > 2) {
                    this.$router.push({
                        name:  'search',
                        query: {
                            keywords: '',
                        },
                    });
                }
            },
        },
    };
</script>

<style lang="scss">
    @import "./LayoutHeader.scss";
</style>
