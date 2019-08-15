<template>
    <div class="wrapper">
        <h3 class="el-card__header">标签管理</h3>

        <div class="el-card__header">
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
                    新增标签
                </el-button>
            </el-form>

            <base-table
                ref="table"
                :http="[getTags]"
                :delete-api="deleteTags"
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
                title="新增标签"
                :visible.sync="showAddDialog"
            >
                <el-form
                    :rules="add_rules"
                    label-width="80px"
                >
                    <el-form-item label="标签名称:">
                        <el-input v-model=" tag_name" />
                    </el-form-item>
                    <el-form-item label="访问权限:">
                        <el-select
                            v-model="tag_roles"
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
                        @click="saveTags"
                    >
                        确定
                    </el-button>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getTags, saveTags, deleteTags } from '@bjs/common/services';

    export default {
        data() {
            return {
                getTags,
                deleteTags,
                form:          {},
                rules:         {},
                showAddDialog: false,
                add_rules:     {},
                allroles:      [],
                tag_name:      '',
                tag_roles:     '',
            };
        },
        methods: {
            async search() {},
            // 保存分类
            async saveTags($event) {
                const { code } = await this.$http(saveTags, {
                    btnState: {
                        target: $event,
                    },
                    data: {
                        name: this.tag_name,
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
