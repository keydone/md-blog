<template>
    <div class="nav-aside">
        <div class="nav-aside_fixed">
            <div class="admin-logo">
                <router-link :to="{ name: 'index' }">admin-logo</router-link>
            </div>
            <el-scrollbar class="main-aside">
                <el-aside width="190px">
                    <el-menu
                        router
                        class="aside-menu"
                        :unique-opened="true"
                        :default-active="activeIndex"
                        :default-openeds="defaultOpens"
                        :collapse="isCollapsed"
                        @select="menuSelected"
                    >
                        <menu-temp :menus="menuList" />
                    </el-menu>
                    <!-- <div class="current-pos" /> -->
                </el-aside>
            </el-scrollbar>
        </div>
    </div>
</template>

<script src="./LayoutSide.js"></script>

<style lang="scss">
    .sideBarCollapsed {
        .base-heading,
        .base-container {
            left: 64px;
        }
        .el-aside,
        .nav-aside,
        .nav-aside_fixed {
            width: 64px !important;
        }
        .admin-logo,
        .el-menu-item,
        .el-submenu__title,
        .el-submenu__icon-arrow {
            font-size: 0;
        }
        .aside-menu:not(.el-menu--collapse) {
            .el-menu-item {
                &.is-active {
                    display: none;
                }
            }
        }
        .main-aside {
            .el-scrollbar__bar {
                &.is-horizontal {
                    display: none;
                }
            }
        }
    }
    .nav-aside_fixed {
        position: fixed;
        top: 0;
        left: 10px;
        bottom: 0;
        width: 190px;
        transition: width 0.2s;
    }
    .nav-aside {
        width: 200px;
        // background: $aside-background;
        transition: width 0.25s;
        overflow: hidden;
        .admin-logo {
            height: 100px;
            line-height: 60px;
            padding: 20px 0;
            text-align: center;
        }
        .main-aside {
            position: absolute;
            top: 100px;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .el-menu {
            color: #fff;
            border-right: 0;
            background: transparent;
        }
        .el-scrollbar__wrap {
            overflow-x: hidden;
        }
        .el-scrollbar__view {
            padding-bottom: 20px;
            .el-aside {
                overflow-x: hidden;
            }
        }
        .aside-menu:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .el-menu-item-group__title {
            display: none;
        }
    }
    .el-menu {
        .el-menu-item,
        .el-submenu__title,
        .el-submenu__icon-arrow {
            color: #fff;
            transition: font-size 0.3s, background-color 0.4s;
        }
        .el-menu-item,
        .el-submenu__title {
            width: 190px;
            overflow: hidden;
            min-width: auto;
            border-radius: 4px;
            &.is-active,
            &:focus {
                color: #fff;
                background: #3080fe;
            }
            &:hover {
                background: #448dff;
                i {
                    color: #fff;
                }
            }
        }
        .el-submenu__title {
            height: 46px;
            line-height: 44px;
        }
        .el-menu-item {
            height: 36px;
            line-height: 34px;
            padding: 0 20px 0 50px !important;
            &.el-submenu__title {
                padding-left: 20px !important;
            }
        }
    }

    /* 折叠样式 */
    .el-menu--collapse {
        .el-submenu__title {
            width: auto;
        }
        .is-opened {
            .el-submenu__title {
                background: $nav-background-active;
                i {
                    color: #fff;
                }
            }
        }
    }

    /* 悬浮菜单 */
    .el-menu--vertical {
        & > .el-menu--popup {
            min-width: 100px;
            max-height: calc(100vh - 20px);
            background: #4a4d58;
            overflow-y: auto;
        }
        .el-menu-item-group__title {
            border-bottom: 1px solid #3a4150;
        }
        .title-text {
            font-size: 13px;
            color: #fff;
        }
        .el-menu-item {
            color: #fff;
            border-radius: 0;
            &.is-active,
            &:hover,
            &:focus {
                color: $nav-active-color;
                background: $nav-background-active;
                [class*="el-icon-"] {
                    color: #fff;
                }
            }
        }
    }
</style>
