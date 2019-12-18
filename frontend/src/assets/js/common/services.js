/**
 * 公共服务接口
 * method 默认为 post
 */
const api = '/api/';
const isLogin = false;

/**
 * 用户注册
 */
export const register = {
    url: `${api}user/register`,
    isLogin,
};
/**
 * 用户登录
 */
export const login = {
    url: `${api}user/login`,
    isLogin,
};
/**
 * 注销登录
 */
export const logout = {
    url: `${api}user/login`,
};
/**
 * 重置密码
 */
export const resetpassword = {
    url: `${api}user/resetpassword`,
    isLogin,
};
/**
 * 查询首页板块
 */
export const getBlocks = {
    url:    `${api}home/blocks`,
    method: 'GET',
    isLogin,
};
/**
 * 首页查询最新文章
 */
export const newestArticles = {
    url:    `${api}article/list`,
    method: 'GET',
    isLogin,
};
/**
 * 发布文章
 */
export const articlePost = {
    url: `${api}article/save`,
    isLogin,
};
/**
 * 查询文章分类
 */
export const getCategories = {
    method: 'get',
    url:    `${api}category/list`,
    isLogin,
};
/**
 * 新增文章分类
 */
export const saveCategory = {
    url: `${api}category/save`,
    isLogin,
};
/**
 * 查询文章标签
 */
export const getTags = {
    method: 'get',
    url:    `${api}tags/list`,
    isLogin,
};
/**
 * 新增文章标签
 */
export const saveTags = {
    url: `${api}tags/save`,
    isLogin,
};
/**
 * 查询网站设置
 */
export const getSiteSetup = {
    method: 'get',
    url:    `${api}setup`,
    isLogin,
};
/**
 * 查询网站底部板块
 */
export const getFooterBlock = {
    method: 'get',
    url:    `${api}footerblock/list`,
    isLogin,
};
/**
 * 查询网站友链
 */
export const getFriendLinks = {
    method: 'get',
    url:    `${api}friendlinks/list`,
    isLogin,
};
/**
 * 查询文章详情
 */
export const getArticleDetails = {
    method: 'get',
    url:    `${api}article/find`,
    isLogin,
};
/**
 * 查询笔记列表
 */
export const getNotes = {
    method: 'get',
    url:    `${api}notes/list`,
    isLogin,
};
/**
 * 查询笔记详情
 */
export const getNotesDetails = {
    method: 'get',
    url:    `${api}notes/find`,
    isLogin,
};
/**
 * 保存笔记
 */
export const saveNotes = {
    method: 'post',
    url:    `${api}notes/save`,
    isLogin,
};
