<template>
    <div
        id="app"
        class="user-auth"
    >
        <div class="user-auth__wrap">
            <h1 class="auth-title">重置密码</h1>
            <el-form
                ref="form"
                v-model="form"
                :rules="rules"
            >
                <el-form-item label="输入用户名:">
                    <el-input placeholder="用户名" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss">
    @import './sign.scss';
</style>
