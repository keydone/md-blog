<template>
    <div class="base-tags">
        <div
            v-if="tagsList.length"
            class="tags-list"
        >
            <el-scrollbar :noresize="false">
                <el-tag
                    v-for="(item, index) in tagsList"
                    :key="index"
                    size="medium"
                    :closable="true"
                    :class="{'is-active': isActive(item.name)}"
                    @close="closeTags(index)"
                    @click="routerTo(item.path)"
                >
                    <router-link
                        :to="item.path"
                        class="tags-li-title"
                    >
                        {{ item.title }}
                    </router-link>
                </el-tag>
            </el-scrollbar>
        </div>

        <el-dropdown
            class="tags-close-box"
            @command="handleTags"
        >
            <el-button
                size="mini"
                type="primary"
            >
                标签选项<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu
                slot="dropdown"
                size="small"
            >
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import ls from '@bjs/storage/localstorage';
    import { lsTagsKey } from '@bjs/const/consts';
    import { UPDATE_TAGSLIST } from '@bjs/store/mutationTypes';

    export default {
        inject:   ['refresh'],
        computed: {
            tagsList() {
                return this.$store.state.base.tagsList;
            },
        },
        watch: {
            '$route.path'() {
                this.setTags(this.$route);
            },
        },
        created() {
            this.$nextTick(() => {
                // 同步历史记录
                const tagsList = ls.get(lsTagsKey);

                if (tagsList) {
                    this.commitStore('set', tagsList);
                }

                this.setTags(this.$route);
            });
        },
        methods: {
            isActive(name) {
                return name === this.$route.name;
            },
            routerTo(path) {
                if (path === this.$route.path) {
                    this.refresh();
                }
            },
            // 关闭单个标签
            closeTags(index) {
                const tagsList = [...this.tagsList];
                const delItem = tagsList.splice(index, 1)[0];
                const item = tagsList[index]
                    ? tagsList[index]
                    : tagsList[index - 1];

                if (item) {
                    delItem.name === this.$route.name &&
                        this.$router.push({ name: item.name });
                } else {
                    this.$router.push({ name: 'index' });
                }

                this.commitStore('indexes', [index]);
            },
            // 关闭全部标签
            closeAll() {
                this.commitStore('all');
                this.$router.push({ name: 'index' });
            },
            // 关闭其他标签
            closeOther() {
                const tagsList = [...this.tagsList];
                const deleteIndexes = [];

                tagsList.filter((item, index) => {
                    if (item.name !== this.$route.name) {
                        deleteIndexes.push(index);
                    }
                });

                this.commitStore('indexes', deleteIndexes);
            },
            // 设置标签
            setTags(route) {
                const tagsList = [...this.tagsList];
                const isExist = tagsList.find(item => item.name === route.name);

                if (!isExist) {
                    tagsList.push({
                        title: route.meta.title,
                        path:  route.path,
                        name:  route.name,
                    });
                }
                this.commitStore('set', tagsList);
            },
            commitStore(type, data) {
                this.$store.commit(UPDATE_TAGSLIST, { type, data });
            },
            handleTags(command) {
                command === 'other' ? this.closeOther() : this.closeAll();
            },
        },
    };
</script>

<style lang="scss">
    .base-tags {
        background: #fff;
        border-radius: 3px;
        padding: 5px 120px 5px 10px;
        box-shadow: 0 3px 3px rgba(146, 146, 146, 0.1);
        position: absolute;
        top: 100%;
        left: 20px;
        right: 20px;
        line-height: 28px;
    }
    .tags-list {
        overflow-x: auto;
        white-space: nowrap;
        .el-tag {
            border: 0;
            line-height: 28px;
            margin-right: 10px;
        }
        .is-active {
            color: #fff;
            background: $color-link-base;
            &:hover {
                background: $color-link-base-hover;
            }
            .tags-li-title,
            .el-tag__close {
                color: #fff;
            }
        }
    }
    .tags-close-box {
        position: absolute;
        top: 5px;
        right: 10px;
    }
</style>
