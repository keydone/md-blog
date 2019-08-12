<template>
    <div class="notfound">
        <el-button @click="back">返回</el-button>
    </div>
</template>

<script>
	export default {
		methods: {
			back() {
				history.go(-1);
			},
		},
	};
</script>
