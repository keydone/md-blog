<template>
    <el-breadcrumb
        v-if="menus.length > 1"
        separator-class="el-icon-arrow-right"
        class="BreadCrumb"
    >
        <el-breadcrumb-item
            v-for="(item, index) in menus"
            :key="index"
        >
            <router-link
                v-if="index + 1 !== menus.length"
                :to="{name: item.name}"
            >
                {{ item.title }}
            </router-link>
            <span v-else>{{ item.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script src="./BreadCrumb.js"></script>

<style lang="scss">
	@import "./BreadCrumb.scss";
</style>
