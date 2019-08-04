<template>
    <div class="base-heading">
        <transition
            v-if="skin !== 'fly'"
            name="vertical-slide"
        >
            <div
                v-if="transition"
                class="heading-container"
            >
                <div class="logo">
                    <img src="">
                </div>

                <!-- 导航开始 -->
                <div class="main-nav fl">
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
                </div>

                <!-- 导航右侧内容 -->
                <ul class="heading-side fr">
                    <li>
                        <router-link :to="{ name: 'login' }">
                            <button class="btn-normal">登录</button>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'register' }">
                            <button class="btn-normal btn-primary">注册</button>
                        </router-link>
                    </li>
                    <li class="search-for">
                        <i class="el-icon-search" />
                        <div class="el-input">
                            <input
                                type="text"
                                class="el-input-target"
                                placeholder="回车发起搜索"
                            >
                        </div>
                    </li>
                </ul>

                <!-- 公告 -->
                <div class="base-notice">
                    公告轮播
                    新开站点
                    会员 5 折
                </div>
            </div>
        </transition>

        <div
            v-else
            class="main-nav-fly"
        >
            <div class="main-nav-logo fl">
                <router-link :to="{name: 'index'}">
                    <img
                        src=""
                        alt=""
                        class="logo"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		props: {
			transition: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				skin: 'fly-',
				// transition: false,
			};
		},
	};
</script>

<style lang="scss">
	@import "./LayoutHeader.scss";
</style>
