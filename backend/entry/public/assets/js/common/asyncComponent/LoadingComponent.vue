<template>
    <div
        v-loading="true"
        class="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
    />
</template>
<style>
	.loading {
		position: absolute;
		width: inherit;
		height: calc(100vh - 200px);
		background-color: transparent;
	}
</style>
