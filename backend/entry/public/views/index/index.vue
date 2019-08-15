<template>
    <div class="wrapper block-wrapper">
        <h3 class="el-card__header">板块管理</h3>

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
                    <el-form-item label="板块标题">
                        <el-input v-model="item.title" />
                    </el-form-item>
                    <el-form-item label="显示板块">
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
                    <el-form-item label="显示板块标题">
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
                    <el-form-item label="布局类型">
                        <el-select v-model="item.layout">
                            <el-option
                                label="横向"
                                value="x"
                            />
                            <el-option
                                label="纵向"
                                value="y"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="每行展示数量">
                        <el-input v-model="item.number" />
                    </el-form-item>
                    <el-form-item label="显示行数">
                        <el-input v-model="item.lines" />
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="item.sort" />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="addItemDialogVisible=true; idIndex = index;"
                        >
                            添加项目
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
                            label="标题"
                            prop="title"
                        />
                        <el-table-column
                            label="内容"
                            prop="text"
                        />
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="cancelShow(index, scope.$index, item._id)"
                                >
                                    取消展示
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="pt20">
                        <el-button
                            size="small"
                            type="primary"
                            @click="saveIndexBlock($event, index, item)"
                        >
                            保存
                        </el-button>
                        <el-button
                            v-if="list.length"
                            size="small"
                            type="danger"
                            @click="deleteBlock(index, item._id)"
                        >
                            删除该板块
                        </el-button>
                        <el-button
                            size="small"
                            class="fr"
                            @click="addBlock"
                        >
                            新增板块
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

        <!-- 新增项目弹窗 -->
        <el-dialog
            title="添加项目"
            width="1100px"
            :visible.sync="addItemDialogVisible"
        >
            <el-form inline>
                <el-form-item label="文章标题">
                    <el-input
                        v-model="form.title"
                        placeholder="支持模糊搜索"
                        clearable
                    />
                </el-form-item>
                <el-button
                    type="primary"
                    @click="getSelection"
                >
                    搜索
                </el-button>
            </el-form>
            <base-table
                ref="table"
                :custom-action="true"
                :http="[getArticles]"
                @confirmEvent="getSelection"
                @cancelEvent="addItemDialogVisible=false;"
            >
                <el-table-column
                    label="序号"
                    type="selection"
                    width="50"
                />
                <el-table-column
                    prop="title"
                    label="标题"
                />
                <el-table-column
                    prop="subtitle"
                    label="副标题"
                />
                <el-table-column
                    prop="author"
                    label="作者"
                />
                <el-table-column label="内容">
                    <template slot-scope="scope">{{ scope.row.text.substring(0, 100) }}...</template>
                </el-table-column>
                <el-table-column
                    prop="postDate"
                    label="发布时间"
                />
                <el-table-column
                    prop="recommandBlocks"
                    label="推荐板块"
                />
                <el-table-column
                    prop="role"
                    label="阅读权限"
                />
                <el-table-column
                    prop="categoryId"
                    label="分类"
                />
                <el-table-column
                    prop="tags"
                    label="标签"
                />
                <el-table-column
                    prop="isDraft"
                    label="是否为草稿"
                />
            </base-table>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getIndexBlocks,
        saveIndexBlock,
        deleteIndexBlock,
        updateIndexBlock,
        getArticles,
    } from '@bjs/common/services';

    const item = {
        _id:       '',
        title:     '轮播板块',
        show:      true,
        showTitle: true,
        layout:    'x',
        number:    1,
        lines:     2,
        sort:      0,
        idlist:    [],
        list:      [
            // {_id:   '', title: '', cover: '', text:  ''},
        ],
    };

    export default {
        data() {
            return {
                getArticles,
                addItemDialogVisible: false,
                ImageDialogVisible:   false,
                dialogImageUrl:       '',
                idIndex:              0,
                list:                 [item],
                form:                 {
                    title: '',
                },
            };
        },
        created() {
            this.getIndexBlocks();
        },
        methods: {
            async getIndexBlocks() {
                const { code, data } = await this.$http(getIndexBlocks);

                if (code === 0) {
                    if (data.list && data.list.length) {
                        data.list.forEach(block => {
                            if (block.idlist.length === 0) {
                                block.list = [];
                            }
                        });
                        this.list = data.list;
                    }
                }
            },
            // 保存
            async saveIndexBlock($event, index, item) {
                if (item.idlist.length === 0) {
                    return this.$message.error('请先添加项目');
                }

                const { code, data } = await this.$http(saveIndexBlock, {
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

                vm.$confirm('确定要删除这条数据吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '删除',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(deleteIndexBlock, {
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
            // 新增板块
            addBlock() {
                this.list.push(item);
            },
            // 查看封面大图
            showBigImage(src) {
                this.dialogImageUrl = src;
                this.ImageDialogVisible = true;
            },
            // 获取选中id
            getSelection({ $event, selection }) {
                if (selection.length) {
                    const { idlist, list } = this.list[this.idIndex];

                    for (let i = 0; i < selection.length; i++) {
                        const element = selection[i];

                        idlist.forEach(id => {
                            if (element._id === id) {
                                selection.splice(i, 1);
                                i--;
                            }
                        });
                    }
                    if (selection.length) {
                        selection.forEach(item => {
                            idlist.forEach(id => {});
                            idlist.push(item._id);
                            list.push(item);
                        });
                    }
                    this.addItemDialogVisible = false;
                }
            },
            cancelShow(index, $index, id) {
                const vm = this;

                vm.$confirm('确定要取消展示这条数据吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '确定',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            if (id) {
                                const $ids = [...vm.list[index].idlist];

                                $ids.splice($index, 1);
                                instance.confirmButtonLoading = true;
                                const { code } = await vm.$http(updateIndexBlock, {
                                    data: {
                                        _id:    id,
                                        idlist: $ids,
                                    },
                                });

                                if (code === 0) {
                                    vm.list[index].idlist.splice($index, 1);
                                    vm.list[index].list.splice($index, 1);
                                    vm.$message.success('操作成功');
                                }
                                instance.confirmButtonLoading = false;
                            } else {
                                vm.list[index].idlist.splice($index, 1);
                                vm.list[index].list.splice($index, 1);
                            }
                        }
                    },
                });
            },
        },
    };
</script>

<style lang="scss">
    .block-wrapper {
        .cover-img {
            width: 100px;
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
