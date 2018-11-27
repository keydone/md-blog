const files = require.context('../../../modules', true, /store\/stores\.js$/);

const modules = [];

files.keys().forEach(key => {
    modules.push(...files(key).default);
});

export default modules;
