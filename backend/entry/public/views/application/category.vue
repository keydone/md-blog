<template>
    <div class="article wrapper">
        <h3 class="el-card__header">分类管理</h3>

        <div class="el-card__body">
            <el-form inline>
                <el-form-item label="文章标题">
                    <el-input
                        v-model="form.username"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="文章ID">
                    <el-input
                        v-model="form.username"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input
                        v-model="form.username"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-select
                        v-model="form.searchType"
                        placeholder="全部"
                        autocomplete="on"
                    >
                        <el-option
                            label="全部"
                            value="username"
                        />
                        <el-option
                            label="已发布"
                            value="userid"
                        />
                        <el-option
                            label="待审核"
                            value="userid"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="search"
                    >
                        搜索
                    </el-button>
                </el-form-item>
                <el-button
                    type="primary"
                    class="btn-alone"
                    @click="showAddDialog = true;"
                >
                    新增分类
                </el-button>
            </el-form>

            <base-table
                ref="table"
                :http="[getCategories]"
                :delete-api="deleteCategory"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="60"
                />
                <el-table-column
                    label="分类名称"
                    prop="name"
                />
                <el-table-column label="是否显示">
                    <template slot-scope="scope">
                        {{ scope.row.show ? '是' : '否' }}
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="showEditDialog=true;"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            @click="deleteThis(scope.row._id)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </base-table>

            <el-dialog
                width="400px"
                title="新增分类"
                :visible.sync="showAddDialog"
            >
                <el-form
                    :rules="add_rules"
                    label-width="80px"
                >
                    <el-form-item label="分类名称:">
                        <el-input v-model="cate_name" />
                    </el-form-item>
                    <el-form-item label="访问权限:">
                        <el-select
                            v-model="cate_roles"
                            class="block"
                        >
                            <el-option
                                v-for="(item, index) in allroles"
                                :key="index"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>

                <template
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button @click="showAddDialog=false;">取消</el-button>
                    <el-button
                        type="primary"
                        @click="saveCategory"
                    >
                        确定
                    </el-button>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getCategories,
        saveCategory,
        deleteCategory,
    } from '@bjs/common/services';

    export default {
        data() {
            return {
                getCategories,
                deleteCategory,
                form:             {},
                rules:            {},
                showAddDialog:    false,
                showEditDialog:   false,
                showDeleteDialog: false,
                add_rules:        {},
                allroles:         [],
                cate_name:        '',
                cate_roles:       '',
            };
        },
        methods: {
            async search() {},
            // 保存分类
            async saveCategory($event) {
                const { code } = await this.$http(saveCategory, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        name: this.cate_name,
                    },
                });

                if (code === 0) {
                    this.showAddDialog = false;
                    // 刷新列表
                    this.$refs.table.reload();
                }
            },
            deleteThis(id) {
                this.$refs.table.deleteThis(id);
            },
        },
    };
</script>

<style lang="scss">
    .el-form-item__label {
        text-align: left;
    }
</style>
