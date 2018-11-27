<template>
    <div
        width="200px"
        class="nav-aside"
    >
        <el-aside
            width="100px"
            class="main-aside"
        >
            <el-menu>
                <el-menu-item index="1">
                    <i class="el-icon-menu" />
                    <h4 slot="title">weconfig</h4>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-setting" />
                    <h4 slot="title">wedefend</h4>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-aside
            width="200px"
            class="second-menus"
        >
            <el-menu>
                <el-menu-item index="1">
                    <i class="el-icon-menu" />
                    <span slot="title">导航1</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-setting" />
                    <span slot="title">导航2</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>

<script src="./LayoutSide.js"></script>

<style lang="scss">
	@import "./LayoutSide.scss";
</style>
