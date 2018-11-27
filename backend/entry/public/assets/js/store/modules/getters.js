/**
 * getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
 */
const getters = {
    isLogin(state) {
        return state.isLogin;
    },
    userInfo(state) {
        return state.userInfo;
    },
};

export default getters;
