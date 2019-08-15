/**
 * 公共服务接口
 */
const api = '/api/';
const isLogin = false;
const headers = false;

/**
 * 用户登录
 */
export const login = {
    method: 'post',
    url:    `${api}user/login`,
    headers,
    isLogin,
};
/**
 * 用户注册
 */
export const register = {
    method: 'post',
    url:    `${api}user/register`,
    headers,
    isLogin,
};
/**
 * 注销登录
 */
export const logout = {
    method: 'post',
    url:    `${api}user/logout`,
    isLogin,
};
/**
 * 找回密码
 */
export const resetPassword = {
    method: 'post',
    url:    `${api}user/resetpassword`,
    headers,
    isLogin,
};
/**
 * 查询首页板块
 */
export const getIndexBlocks = {
    method: 'get',
    url:    `${api}home/blocks`,
};
/**
 * 保存首页板块
 */
export const saveIndexBlock = {
    showSuccessMsg: true,
    url:            `${api}home/blocks-save`,
};
/**
 * 删除首页板块
 */
export const deleteIndexBlock = {
    url: `${api}home/blocks-delete`,
};
/**
 * 更新首页板块
 */
export const updateIndexBlock = {
    url: `${api}home/blocks-update`,
};
/**
 * 查询广告板块
 */
export const getAdvs = {
    method: 'get',
    url:    `${api}home/advertises`,
};
/**
 * 保存广告板块
 */
export const saveAdvs = {
    showSuccessMsg: true,
    url:            `${api}home/advs-save`,
};
/**
 * 删除广告板块
 */
export const deleteAdvs = {
    url: `${api}home/advs-delete`,
};
/**
 * 更新广告板块
 */
export const updateAdvs = {
    url: `${api}home/advs-update`,
};
/**
 * 查询注册用户
 */
export const userSigned = {
    method: 'get',
    url:    `${api}user/signed-list`,
};
/*
* 查询文章
*/
export const getArticles = {
    method: 'get',
    url:    `${api}article/list`,
    isLogin,
};
/*
* 保存文章
*/
export const saveArticle = {
    url: `${api}article/save`,
    isLogin,
};
/*
* 删除文章
*/
export const deleteArticle = {
    url: `${api}article/delete`,
    isLogin,
};
/*
* 查询分类
*/
export const getCategories = {
    method: 'get',
    url:    `${api}category/list`,
    isLogin,
};
/*
* 保存分类
*/
export const saveCategory = {
    url: `${api}category/save`,
    isLogin,
};
/*
* 删除分类
*/
export const deleteCategory = {
    url: `${api}category/delete`,
    isLogin,
};
/*
* 查询标签
*/
export const getTags = {
    method: 'get',
    url:    `${api}tags/list`,
    isLogin,
};
/*
* 保存标签
*/
export const saveTags = {
    url: `${api}tags/save`,
    isLogin,
};
/*
* 删除标签
*/
export const deleteTags = {
    url: `${api}tags/delete`,
    isLogin,
};
/*
* 查询网站设置
*/
export const getSiteSetup = {
    method: 'get',
    url:    `${api}setup`,
    isLogin,
};
/*
*  保存网站设置
*/
export const saveSiteSetup = {
    url:            `${api}setup/save`,
    showSuccessMsg: true,
    loading:        true,
    isLogin,
};
/*
* 查询网站底部板块
*/
export const getFooterBlock = {
    method: 'get',
    url:    `${api}footerblock/list`,
    isLogin,
};
/*
* 保存网站底部板块
*/
export const saveFooterBlock = {
    url:            `${api}footerblock/save`,
    showSuccessMsg: true,
    isLogin,
};
/*
* 删除网站底部板块
*/
export const deleteFooterBlock = {
    url: `${api}footerblock/delete`,
    isLogin,
};
/*
* 查询网站底部板块
*/
export const getFriendLinks = {
    method: 'get',
    url:    `${api}friendlinks/list`,
    isLogin,
};
/*
* 保存网站底部板块
*/
export const saveFriendLinks = {
    url:     `${api}friendlinks/save`,
    loading: true,
    isLogin,
};
/*
* 删除网站底部板块
*/
export const deleteFriendLinks = {
    url:     `${api}friendlinks/delete`,
    loading: true,
    isLogin,
};
