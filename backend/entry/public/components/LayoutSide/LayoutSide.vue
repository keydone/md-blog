<template>
    <div
        v-if="mainMenus.length"
        width="200px"
        class="nav-aside"
    >
        <el-aside class="main-aside">
            <el-menu>
                <el-menu-item-group
                    v-for="item in mainMenus"
                    :key="item.name"
                >
                    <template slot="title">
                        <i
                            v-if="item.icon"
                            :class="item.icon"
                        />
                        <h4>{{ item.title }}</h4>
                    </template>
                    <el-menu-item
                        v-for="(value, key) in item.children"
                        :key="key"
                    >
                        <i
                            v-if="value.icon"
                            :class="value.icon"
                        />
                        <h4 class="title">{{ value.title }}</h4>
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </el-aside>
        <!-- <el-aside
            width="200px"
            class="second-menus"
        >
            <el-menu>
                <el-menu-item
                    v-for="item in secondMenus"
                    :key="item.name"
                >
                    <i
                        v-if="item.icon"
                        :class="item.icon"
                    />
                    <span
                        slot="title"
                        class="subtitle"
                    >
                        <router-link :to="{name: item.name}">{{ item.title }}</router-link>
                    </span>
                </el-menu-item>
            </el-menu>
        </el-aside> -->
    </div>
</template>

<script src="./LayoutSide.js"></script>

<style lang="scss">
	@import "./LayoutSide.scss";
</style>
