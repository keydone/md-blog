/*
*  公共 store 配置文件
*/
import user from './modules/user'; // 主系统
import others from '@js/store/others';

const modules = {
    user,
    // 其他系统
    ...others,
};

export default modules;
