/*!
 * @author claude
 * date 07/05/2019
 * 解析地址栏参数
 */

export const parse = (url) => {

    const { href } = window.location;

    href.search(url);

    return {
        pathname: '',
        queries: '',
    };
};
