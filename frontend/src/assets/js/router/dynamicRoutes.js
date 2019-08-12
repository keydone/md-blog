/*!
 * @author claude
 * date 07/05/2019
 * 其他模块路由
 */

const files = require.context('../../../modules', true, /route\/routes\.js$/);

const modules = [];

files.keys().forEach(key => {
    modules.push(...files(key).default);
});

export default modules;
