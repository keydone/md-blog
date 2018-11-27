import {
    Button,
    Form,
    FormItem,
    Icon,
    Input,
    Tabs,
    TabPane,
} from 'element-ui';

const components = [
    Button,
    Form,
    FormItem,
    Icon,
    Input,
    Tabs,
    TabPane,
];

export default {
    install(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    },
};
