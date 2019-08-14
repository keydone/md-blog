
export default {
    data() {
        return {
            mainMenus: [],
            secondMenus: [],
        };
    },
    watch: {
        '$route.path'() {
            this.resolveRoute();
        },
    },
    created() {
        this.resolveRoute();
    },
    methods: {
        async resolveRoute() {
            const { routes } = this.$router.options;

            this.mainMenus = routes;
            this.mergeRoute(routes);
            console.log('routes', routes);
        },
        mergeRoute() { },
    },
};
