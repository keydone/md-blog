const files = require.context('../../../modules', true, /route\/routes\.js$/);

const modules = [];

files.keys().forEach(key => {
    modules.push(...files(key).default);
});

export default modules;
