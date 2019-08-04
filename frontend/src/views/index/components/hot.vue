<template>
    <blocker
        id="hot"
        title="热门板块"
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
