<template>
    <div
        v-loading="showLoading"
        class="base-table"
    >
        <!-- 下载表格 -->
        <json-to-excel
            v-show="showDownload"
            ref="jsonToExcel"
            :data="tableData"
        />

        <el-table
            ref="multipleTable"
            :border="border"
            :stripe="stripe"
            :height="height"
            :data="tableData"
            :max-height="maxHeight"
            :highlight-current-row="highlightCurrentRow"
            :span-method="spanMethod"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange"
            @sort-change="sortChange"
            @row-click="rowClick"
        >
            <slot :tableData="tableData" />
        </el-table>

        <div
            v-if="paging && tableData.length"
            class="flex table-action"
        >
            <div
                v-if="customAction"
                class="flex_1"
            >
                <el-button
                    type="primary"
                    @click="confirmEvent"
                >
                    确定
                </el-button>
                <el-button @click="cancelEvent">取消</el-button>
            </div>

            <div class="flex_1 text-right">
                <el-pagination
                    background
                    :total="total"
                    :layout="layout"
                    :disabled="disablePaging"
                    :page-sizes="pageSizes"
                    :page-size="pageSizeNum"
                    :current-page="currentPageNum"
                    @current-change="currentChange"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @size-change="sizeChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import jsonToExcel from '../JsonToExcel/JsonToExcel';
    import { deepMerge } from '@bjs/utils/types';

    export default {
        name:       'BaseTable',
        components: {
            jsonToExcel,
        },
        props: {
            loading: {
                type:    Boolean,
                default: true,
            },
            // 固定表头
            height: {
                type:    String,
                default: null,
            },
            // 表格数据
            data: {
                type:    Object,
                default: () => {},
            },
            // 表格条纹
            stripe: {
                type:    Boolean,
                default: true,
            },
            // 表格边框
            border: {
                type:    Boolean,
                default: true,
            },
            // 表格最大高度
            maxHeight: {
                type:    Number,
                default: null,
            },
            // 高亮当前行
            highlightCurrentRow: {
                type:    Boolean,
                default: true,
            },
            // 合并行列
            spanMethod: {
                type:    Function,
                default: () => [1, 1],
            },
            // http 方法, service, params
            http: {
                type:    Array,
                default: () => ['get', '', {}],
            },
            // 删除 api
            deleteApi: {
                type:    Object,
                default: null,
            },
            // http 数据拦截
            dataTransform: {
                type:    Function,
                default: null,
            },
            // 禁用分页
            disablePaging: {
                type:    Boolean,
                default: false,
            },
            // 是否使用本地分页
            localPaging: {
                type:    Boolean,
                default: false,
            },
            // 是否使用分页
            paging: {
                type:    Boolean,
                default: true,
            },
            // 每页显示条数
            pageSize: {
                type:    Number,
                default: 10,
            },
            // 分页下拉选择器
            pageSizes: {
                type:    Array,
                default: () => [10, 20, 30, 50, 100],
            },
            // 当前页码
            currentPage: {
                type:    Number,
                default: 1,
            },
            // 分页布局
            layout: {
                type:    String,
                default: 'sizes, prev, pager, next',
            },
            // 显示下载 xsl 文档
            showDownload: {
                type:    Boolean,
                default: false,
            },
            // 显示自定义按钮
            customAction: {
                type:    Boolean,
                default: false,
            },
        },
        data() {
            return {
                total:             0,
                isLocal:           false,
                tableData:         [],
                localTableData:    [],
                multipleSelection: [],
                showLoading:       this.loading,
                currentPageNum:    this.currentPage,
                pageSizeNum:       this.pageSize,
                columns:           [
                    {
                        prop:  'date',
                        label: '日期',
                    },
                    {
                        prop:  'name',
                        label: '名字',
                    },
                    {
                        prop:  'address',
                        label: '地址',
                    },
                ],
            };
        },
        created() {
            this.init({
                currentPage: this.currentPageNum,
                pageSize:    this.pageSizeNum,
            });
        },
        methods: {
            async init(opt = { currentPage: 1, pageSize: 10 }) {
                if (this.localPaging && this.localTableData.length) {
                    // 本地分页
                    this.localPagination(opt.currentPage, opt.pageSize);
                } else {
                    // 请求接口
                    const service = this.http[0];
                    // 合并外部入参
                    const params = deepMerge(
                        {
                            params: {
                                pageSize:  opt.pageSize,
                                pageIndex: opt.currentPage,
                            },
                        },
                        this.http[1]
                    );

                    const { code, data } = await this.$http(service, params);

                    this.showLoading = false;
                    if (code === 0) {
                        const { list } = data;

                        if (list) {
                            const transformedData = this.dataTransform
                                ? await this.dataTransform(list)
                                : list;

                            if (this.localPaging) {
                                this.localTableData = transformedData;
                            } else {
                                this.tableData = transformedData;
                            }
                        } else {
                            this.tableData = [];
                        }
                    } else {
                        this.tableData = [];
                    }
                }
            },
            // 重新加载表格数据
            reload(opt = { currentPage: 1 }) {
                console.log(opt.currentPage);

                if (this.paging) {
                    this.currentPageNum = opt.currentPage;
                }
                this.$nextTick(() => {
                    this.init();
                });
            },
            // 删除数据
            deleteThis(id) {
                const vm = this;

                vm.$confirm('确定要删除这条数据吗? 此操作不可撤销!', '警告', {
                    type:               'warning',
                    customClass:        'delete-confirm',
                    confirmButtonClass: 'el-button--danger',
                    confirmButtonText:  '删除',
                    async callback(action, instance) {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            const { code } = await vm.$http(vm.deleteApi, {
                                data: {
                                    id,
                                },
                            });

                            if (code === 0) {
                                // 刷新列表
                                vm.reload();
                            }
                            instance.confirmButtonLoading = false;
                        }
                    },
                });
            },
            // 本地分页
            localPagination(currentPage, pageSize) {
                this.tableData = [];
                this.localTableData.forEach((value, index) => {
                    this.tableData.push(value);
                });
            },
            currentChange(currentPage) {
                this.reload({ currentPage });
                // this.$emit('current-change', currentPage);
            },
            prevClick(currentPage) {
                // this.$emit('prev-click', currentPage);
            },
            nextClick(currentPage) {
                // this.$emit('next-click', currentPage);
            },
            sizeChange(items) {
                this.reload({ items });
                // this.$emit('size-change', items);
            },
            select(arg) {
                this.multipleSelection = arg;
                this.$emit('select', arg);
            },
            selectAll(arg) {
                this.$emit('select-all', arg);
            },
            selectionChange(arg) {
                this.multipleSelection = arg;
                this.$emit('selection-change', arg);
            },
            sortChange(...arg) {
                this.$emit('sort-change', ...arg);
            },
            rowClick(...arg) {
                this.$emit('row-click', ...arg);
            },
            download() {
                this.$refs.jsonToExcel.generate();
            },
            // 发布确定事件
            confirmEvent($event) {
                this.$emit('confirmEvent', {
                    $event,
                    selection: this.multipleSelection,
                });
            },
            // 发布取消事件
            cancelEvent() {
                this.$refs.multipleTable.clearSelection();
                this.$emit('cancelEvent');
            },
        },
    };
</script>

<style lang="scss">
    .base-table {
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 300px;
        .table-action {
            margin-top: 20px;
        }
    }
    .el-table__empty-block {
        min-height: 500px;
    }
</style>
