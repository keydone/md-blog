<template>
    <div class="forbidden">
        没有访问权限
        <el-button @click="back">返回首页</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.replace({ name: 'index' });
            },
        },
    };
</script>
