<template>
    <blocker
        id="hot"
        title="热门板块"
    >
        <div
            v-for="i in 3"
            :key="i"
            slot="content-slot"
            class="col-row"
        >
            <div
                v-for="index in 3"
                :key="index"
                class="col-item"
            >
                <a
                    class="entry-thumb"
                    href="##"
                >
                    <span
                        class="thumb-img"
                        :style="`background: url(${i});`"
                    >
                        <img
                            :src="i"
                            class="hidden"
                        >
                    </span>
                </a>
                <div class="entry-detail">
                    <h3 class="entry-title">
                        <a
                            class="entry-link"
                            href="##"
                        >标题</a>
                    </h3>
                    <div class="entry-desc">描述描述</div>
                </div>
            </div>
        </div>
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
