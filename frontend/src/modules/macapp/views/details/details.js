import markdownItVue from 'markdown-it-vue';

export default {
    components: {
        markdownItVue,
    },
    data() {
        return {
            form: {
                email: '',
            },
            select: [{
                label: '@163.com',
                value: '@163.com',
            }, {
                label: '@QQ.com',
                value: '@qq.com',
            }, {
                label: '@outlook.com',
                value: '@outlook.com',
            }, {
                label: '@gmail.com',
                value: '@gmail.com',
            }],
        };
    },
    methods: {
        handleCommand(command) {
            console.log(command);

        },
    },
};
