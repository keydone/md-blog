<template>
    <div class="base-heading">
        <!-- 折叠按钮 -->
        <div
            class="btn-collapse fl"
            @click="collapseAside"
        >
            <i class="el-icon-s-fold" />
        </div>

        <!-- logo -->
        <span class="heading-logo fl">
            <img
                width="50px"
                src=""
                alt=""
            >
            xxx 后台管理系统
        </span>

        <div class="heading-bar fr">
            <!-- 全屏显示 -->
            <div
                class="btn-fullscreen"
                @click="fullScreenSwitch"
            >
                <el-tooltip
                    effect="light"
                    content="切换全屏"
                    placement="bottom"
                >
                    <i class="el-icon-full-screen" />
                </el-tooltip>
            </div>

            <!-- 消息中心 -->
            <div class="btn-bell posr">
                <el-tooltip
                    effect="light"
                    placement="bottom"
                    :content="message ? `你有 ${message} 条未读消息, 点击查看`:`消息中心, 点击查看历史消息`"
                >
                    <router-link :to="{ name: 'message' }">
                        <i class="el-icon-bell" />
                        <span
                            v-if="message"
                            class="btn-bell-badge"
                        >{{ message > 50 ? '50+' : message }}</span>
                    </router-link>
                </el-tooltip>
            </div>
            <span class="welcome-u">
                你好, <router-link to="/">{{ username }}</router-link> (<router-link to="/">{{ role }}</router-link>)
            </span>

            <div class="heading-user">
                <!-- 用户名下拉菜单 -->
                <el-dropdown
                    class="user-name"
                    @command="handleCommand"
                >
                    <div class="user-avator">
                        <img
                            width="30px"
                            src=""
                            alt=""
                        >
                        <i class="el-icon-caret-bottom" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/">基本资料</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/">修改密码</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/">系统设置</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item
                            divided
                            command="logout"
                        >
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <v-tags />
    </div>
</template>

<script>
    import { baseLogout } from '@bjs/router/auth';
    import vTags from './LayoutTags.vue';

    export default {
        components: {
            vTags,
        },
        data() {
            return {
                asideCollapsed: false,
                username:       'claude',
                role:           '管理员',
                message:        100,
            };
        },
        methods: {
            collapseAside() {
                this.asideCollapsed = !this.asideCollapsed;
                this.$bus.$emit('collapseChanged', this.asideCollapsed);
            },
            // 检测全屏
            checkFullScreen() {
                const doc = document;

                return Boolean(
                    doc.fullscreenElement ||
                        doc.webkitFullscreenElement ||
                        doc.mozFullScreenElement ||
                        doc.msFullscreenElement
                );
            },
            // 切换全屏
            fullScreenSwitch() {
                const doc = document;

                if (this.checkFullScreen()) {
                    const cancelFullScreen = [
                        'cancelFullScreen',
                        'webkitCancelFullScreen',
                        'mozCancelFullScreen',
                        'msExitFullScreen',
                    ];

                    for (const item of cancelFullScreen) {
                        if (doc[item]) {
                            doc[item]();
                            break;
                        }
                    }
                } else {
                    const element = doc.documentElement;
                    const requestFullscreen = [
                        'requestFullscreen',
                        'webkitRequestFullscreen',
                        'mozRequestFullscreen',
                        'msRequestFullscreen',
                    ];

                    for (const item of requestFullscreen) {
                        if (element[item]) {
                            element[item]();
                            break;
                        }
                    }
                }
            },
            handleCommand(command) {
                if (command === 'logout') {
                    // 退出登录
                    baseLogout();
                }
            },
        },
    };
</script>

<style lang="scss">
    .base-header {
        padding: 0;
    }
    .base-heading {
        // background: $nav-background;
        position: fixed;
        left: 200px;
        right: 0;
        height: 60px;
        line-height: 60px;
        color: #fff;
        z-index: 200;
        transition: left 0.25s;
    }
    .btn-collapse {
        width: 20px;
        margin: 0 20px;
        height: 100%;
        font-size: 18px;
        cursor: pointer;
    }
    .heading-logo {
        font-size: 20px;
    }
    .heading-bar {
        display: flex;
        height: 60px;
        .btn-bell,
        .btn-fullscreen {
            font-size: 20px;
            margin-right: 15px;
            transition: transform 0.2s;
            cursor: pointer;
            &:hover {
                transform: scale(1.2);
            }
        }
        .btn-bell-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 0 5px;
            font-size: 12px;
            min-width: 16px;
            line-height: 16px;
            border-radius: 8px;
            background: $color-danger;
        }
        .el-tooltip {
            color: #fff;
        }
        .user-avator {
            width: 60px;
            height: 60px;
            overflow: hidden;
        }
    }
</style>
