<template>
    <blocker
        id="popular"
        title="站长推荐"
    >
        <ul slot="content-slot">
            <div class="col-col">
                <div
                    v-for="i in 3"
                    :key="i"
                    class="col-item"
                >
                    <div class="entry-title">
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
                    </div>
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
