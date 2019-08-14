/*!
 * @author claude
 * date 07/05/2019
 * 面包屑导航
 */

const files = require.context('../../../modules', true, /menu\/menu\.js$/);

const baseMenu = {};

files.keys().forEach(key => {
    const result = files(key).default;

    baseMenu[`${result.name}`] = result;
});

export default baseMenu;
