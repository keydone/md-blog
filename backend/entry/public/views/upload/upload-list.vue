<template>
    <div class="upload wrapper">
        <h3 class="el-card__header">文件列表</h3>

        <div class="el-card__body">
            <el-form inline>
                <el-form-item class="nowrap">
                    按
                    <el-select
                        v-model="form.searchType"
                        popper-class="searchType-dropdown"
                        placeholder="用户名"
                        class="searchType"
                        autocomplete="on"
                    >
                        <el-option
                            label="用户名"
                            value="username"
                        />
                        <el-option
                            label="用户ID"
                            value="userid"
                        />
                    </el-select>
                    搜索:
                    <el-input
                        v-model="form.username"
                        placeholder="用户名支持模糊搜索"
                        class="ml10"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-form>

            <base-table :data="tableData" />
        </div>
    </div>
</template>

<script src="./upload-list.js"></script>

<style lang="scss">
    .use-manage {
        .searchType {
            width: 74px;
            .el-input__inner {
                padding-left: 0;
                border: 0;
            }
        }
    }
    .searchType-dropdown {
        margin: 0 0 0 -10px !important;
        li {
            height: 24px;
            line-height: 24px;
            padding: 0 10px;
        }
    }
</style>
