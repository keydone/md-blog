import baseMenu from '@bjs/common/baseMenu.js';

export default {
    data() {
        return {
            menus: [],
        };
    },
    watch: {
        '$route.path'() {
            this.routerResolve();
        },
    },
    methods: {
        /*
         * 组合 menus
         */
        routerResolve() {
            const { path } = this.$route;
            const module = path.split('/')[1];

            this.menus = [];
            for (const key in baseMenu) {
                const value = baseMenu[key];

                if (value.name === module) {
                    this.menus.push(value);
                }
                // 子菜单
                if (value.children) {
                    value.children.forEach(item => {
                        if (item.path === path) {
                            this.menus.push(item);
                        }
                    });
                }
            }
        },
    },
};
