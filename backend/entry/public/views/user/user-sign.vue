<template>
    <div class="use-manage wrapper">
        <h3 class="el-card__header">注册用户</h3>
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

            <base-table :http="[userSigned]">
                <el-table-column
                    prop="username"
                    label="用户名"
                />
                <el-table-column label="账号状态">
                    <template slot-scope="scope">
                        {{ scope.row.state === 0 ? '正常': (scope.row.state === 1 ? '审核中' : '已冻结') }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="用户角色"
                />
                <el-table-column
                    label="操作"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="editData(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            @click="editData(scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </base-table>
        </div>
    </div>
</template>

<script src="./user-sign.js"></script>

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
