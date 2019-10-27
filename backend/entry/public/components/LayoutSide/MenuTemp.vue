<template>
    <ul class="sub-menu-list">
        <template v-for="(item, index) in menus">
            <template v-if="!item.meta.asmenu && item.children && item.children.length">
                <el-submenu
                    :key="item.name"
                    :index="`${item.index}`"
                >
                    <template slot="title">
                        <i
                            v-if="item.meta.icon"
                            :class="item.meta.icon"
                        />
                        <span class="title-text">{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">
                            <span class="title-text">{{ item.meta.title }}</span>
                        </template>
                        <!-- 递归调用组件 -->
                        <menu-temp :menus="item.children" />
                    </el-menu-item-group>
                </el-submenu>
            </template>

            <template v-else-if="item.meta.asmenu">
                <el-menu-item
                    :key="index"
                    :index="item.children[0].$path"
                    class="el-submenu__title"
                >
                    <i :class="item.children[0].meta.icon" />
                    <span slot="title">{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </template>

            <template v-else>
                <el-menu-item
                    :key="index"
                    :index="item.$path"
                >
                    <i :class="item.meta.icon" />
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </ul>
</template>

<script>
    export default {
        name:  'MenuTemp',
        props: {
            menus: {
                type:    Array,
                default: () => [],
            },
        },
    };
</script>
