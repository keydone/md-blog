<template>
    <div class="wrapper adv-wrapper">
        <h3 class="el-card__header">广告管理</h3>

        <div class="el-card__body">
            更换图片/编辑文字描述/推广链接
        </div>
        <div class="el-card__body">
            <div
                v-for="(item, index) in list"
                :key="index"
                class="block-list"
            >
                <el-form
                    label-width="100px"
                    inline
                >
                    <el-form-item label="显示广告位">
                        <el-select v-model="item.show">
                            <el-option
                                label="是"
                                :value="true"
                            />
                            <el-option
                                label="否"
                                :value="false"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="广告位置">
                        <el-select v-model="item.layout">
                            <el-option
                                label="首页置顶"
                                :value="0"
                            />
                            <el-option
                                label="侧边栏置顶"
                                :value="1"
                            />
                            <el-option
                                label="文章片段随机广告"
                                :value="2"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="广告位标题">
                        <el-input v-model="item.title" />
                    </el-form-item>
                    <el-form-item label="显示广告标题">
                        <el-select v-model="item.showTitle">
                            <el-option
                                label="是"
                                :value="true"
                            />
                            <el-option
                                label="否"
                                :value="false"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="轮播切换时长">
                        <el-select v-model="item.during">
                            <el-option
                                v-for="during in item.duration"
                                :key="during"
                                :label="`${during} 秒`"
                                :value="during"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="idIndex = index;"
                        >
                            添加广告
                        </el-button>
                    </el-form-item>

                    <el-table
                        :data="item.list"
                        border
                    >
                        <el-table-column
                            type="index"
                            width="50"
                        />
                        <el-table-column
                            label="id"
                            prop="_id"
                        />
                        <el-table-column
                            label="封面图"
                            prop="cover"
                        >
                            <template slot-scope="scope">
                                <img
                                    class="cover-img"
                                    :src="scope.row.cover"
                                    @click="showBigImage(scope.row.cover)"
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="url"
                            prop="url"
                        />
                        <el-table-column
                            label="推广参数"
                            prop="params"
                        />
                        <el-table-column
                            label="描述"
                            prop="desc"
                        />
                        <el-table-column
                            width="120"
                            label="操作"
                        >
                            <div
                                slot-scope="scope"
                                class="operation"
                            >
                                <el-button
                                    size="small"
                                    type="primary"
                                    @click="cancelShow(index, scope.$index, item._id)"
                                >
                                    更新
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="cancelShow(index, scope.$index, item._id)"
                                >
                                    下架
                                </el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="deleteAdv(index, scope.$index, item._id)"
                                >
                                    删除广告
                                </el-button>
                            </div>
                        </el-table-column>
                    </el-table>

                    <div class="pt20">
                        <el-button
                            size="small"
                            type="primary"
                            @click="saveAdvs($event, index, item)"
                        >
                            保存
                        </el-button>
                        <el-button
                            v-if="list.length"
                            size="small"
                            type="danger"
                            @click="deleteBlock(index, item._id)"
                        >
                            删除该广告位
                        </el-button>
                        <el-button
                            size="small"
                            class="fr"
                            @click="addBlock"
                        >
                            新增广告位
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>

        <!-- 查看大图 -->
        <el-dialog :visible.sync="ImageDialogVisible">
            <img
                width="100%"
                :src="dialogImageUrl"
            >
        </el-dialog>
    </div>
</template>

<script>
    import {
        getAdvs,
        saveAdvs,
        deleteAdvs,
        updateAdvs,
        getArticles,
    } from '@bjs/common/services';

    const item = {
        _id:       '',
        title:     '轮播广告',
        show:      true,
        showTitle: true,
        layout:    0,
        during:    3,
        sort:      0,
        duration:  [3, 5, 7, 10],
        list:      [
            {
                _id:    '',
                url:    '',
                cover:  '',
                desc:   '',
                params: '',
            },
        ],
    };

    export default {
        data() {
            return {
                getArticles,
                ImageDialogVisible: false,
                dialogImageUrl:     '',
                idIndex:            0,
                list:               [item],
                form:               {
                    title: '',
                },
            };
        },
        created() {
            this.getAdvs();
        },
        methods: {
            async getAdvs() {
                const { code, data } = await this.$http(getAdvs);

                if (code === 0) {
                    if (data.list && data.list.length) {
                        this.list = data.list;
                    }
                }
            },
            // 保存
            async saveAdvs($event, index, item) {
                if (item.list.length === 0) {
                    return this.$message.error('请先添加广告');
                }

                const { code, data } = await this.$http(saveAdvs, {
                    btnState: {
                        target: $event,
                    },
                    data: item,
                });

                if (code === 0 && !this.list[index]._id) {
                    this.list[index]._id = data._id;
                }
            },
            // 删除
            deleteBlock(index, id) {
                const vm = this;

                vm.$confirm('确定要删除该广告位吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '删除',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(deleteAdvs, {
                                    data: {
                                        _id: id,
                                    },
                                });

                                if (code === 0) {
                                    vm.list.splice(index, 1);
                                }
                                instance.confirmButtonLoading = false;
                            } else {
                                vm.list.splice(index, 1);
                            }
                        }
                    },
                });
            },
            // 新增广告
            addBlock() {
                this.list.push(item);
            },
            // 查看封面大图
            showBigImage(src) {
                this.dialogImageUrl = src;
                this.ImageDialogVisible = true;
            },
            // 下架
            cancelShow(index, $index, id) {
                const vm = this;

                vm.$confirm('确定要下架这条广告吗?', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '确定',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(updateAdvs, {
                                    data: {
                                        _id: id,
                                    },
                                });

                                if (code === 0) {
                                    vm.list[index].list.splice($index, 1);
                                    vm.$message.success('操作成功');
                                }
                                instance.confirmButtonLoading = false;
                            } else {
                                vm.list[index].list.splice($index, 1);
                            }
                        }
                    },
                });
            },
            // 删除广告
            deleteAdv() {},
        },
    };
</script>

<style lang="scss">
    .adv-wrapper {
        .cover-img {
            width: 100px;
        }
        .operation {
            .el-button {
                display: block;
                margin: 10px auto;
            }
        }
        .block-list {
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid $border-color-light;
            .el-form--inline {
                border: 0;
            }
        }
        .el-table__empty-block {
            min-height: 150px;
        }
    }
</style>
