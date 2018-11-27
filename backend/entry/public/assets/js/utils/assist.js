/**
 * 资源工具
 */

import { CDN } from '../const/consts';
/**
 * 加载资源文件, 如 doc 等
 */
export const getAssistPath = filename => `${CDN}public/file/${filename}`;
