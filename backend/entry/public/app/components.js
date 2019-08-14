import {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Form,
    FormItem,
    Icon,
    Input,
    Option,
    Tabs,
    TabPane,
    Select,
} from 'element-ui';

const components = [
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Form,
    FormItem,
    Icon,
    Input,
    Option,
    Tabs,
    TabPane,
    Select,
];

export default {
    install(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    },
};
