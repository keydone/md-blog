<template>
    <blocker
        id="besttop"
        title="置顶推荐"
    >
        <ul slot="content-slot">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </blocker>
</template>

<script>
	import blocker from './blocker';
	export default {
		components: {
			blocker,
		},
	};
</script>
