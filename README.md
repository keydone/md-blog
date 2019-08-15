# 项目结构文档

采取主框架和各个子系统的模块化划分规范, 主框架关注底层实现, 包含 http 请求, 常量, 主路由, 主 store 等.

子系统类似于主框架的划分, 但只包含与该系统相关的组件/业务等, 并根据需要可以提取该系统下的公共组件等.

## 安装

```js
npm i
// or
yarn install
```

## 目录结构解析

```shell
├── config              环境变量开发配置
└── src
    └── app             应用启动入口
    └── assets
        └── images      图片资源
        └── js          公共js目录
            └── common  包含了 公共接口, 如登录/注销等
                        抽取element-ui组件, 并将大型组件进行异步导入,
                        * 以后需要添加组件就在该文件中添加
            └── const   存放常量js, 比如 cookie, localstorage, 全局变量,
                        常用正则表达式
            └── http    封装http服务
            └── storage 应用存储文件夹, cookie, ls 等 * 使用cookie时必须从这里引入
            └── router  提供路由拦截, 路由权限
            └── store   公共store
            └── utils   提供时间格式化, 数据类型转换等工具函数
        └── styles  存放基础样式, 为支持换肤做准备
    └── Components:     存放公共组件, 如头部, 侧边栏等
    └── route:          存放临时路由表, 文件根据系统动态生成
    └── store:          存放临时store, 文件根据系统动态生成
    └── modules:        根据子系统划分, 内部文件夹划分类似于主框架
        └── weconfig    子系统
            └── assets      该系统公共附件, 内部结构参考主框架
            └── Components  该子系统公共组件
            └── views       该子系统的页面
                └── index
                └── list
                └── detail
            └── route       该子系统的路由
            └── store       该子系统的store
    └── template            存放模板文件
    └── views               主框架页面
├── webpack                 打包脚本
```

## 计划

将 SPA 当成 MPA 看待, 项目大了维护起来更清晰, 强相关的代码按系统(模块)存放

- [ ] 开发时根据命令只开发相应的系统, 而不必 watch 整个项目
- [ ] 监听子系统下的 router, store, 生产文件, 与主框架合并
  - `router 结构待定`
  - `store 结构待定`
- [ ] 封装 http 服务
  - 全局错误处理
  - 请求自动使用 loading
  - 支持 url?query=xx 形式的请求
    // - 多次请求相同接口时自动断开前面的请求
- [ ] 封装 router, 多标签页打开同步用户信息(强制用户多标签同时注销等)
- [ ] 支持操作记录, 包括翻页, tab, 搜索等
- [ ] 将样式颜色抽离, 为换肤做准备
- [ ] 资源占位(图片高度, 区块高度)
- [ ] 事件管理? eventbus
- [ ] 代理转发(跨域)

## 项目规划

### 网络请求层 http

1, 封装 axios, service, [分离入参], [url], 合并 service 文件方便管理

2, 采用 restful 风格入参, [params] 代表 url query, [body] 代表 post 中的 data, 请求方法 post, get, put 等

3, 请求拦截: 设置公共头, 支持 [loading] 参数, 区分 development/production 环境, 支持 development 使用 mock 数据(可有可无)

4, [请求权限] & [响应拦截]: 优先判断前台用户登录权限及请求权限, 通过后再根据后台响应做处理

5, 处理[公共错误], 如 404, 500

### App 入口

1, 注册组件, router, store 等

2, render 前获取菜单, 用户登录状态, 进行[权限拦截]

### 路由控制

1, [合并主路由和子路由]

2, [beforeEach] 鉴定访问权限 (登录状态以及用户访问权限)

3, 跳转登录时带上前面的 url, 登录成功自动返回 (ref)

### 状态和存储

1, [vuex] 严格按照 actions(异步更新), mutations(同步更新), getter, store(默认状态) 划分

2, 与 cookie 或 localstorage 搭配[缓存用户登录状态.左侧菜单等]

3, cookie, localstorage 定义 key 值都必须在 consts 文件夹, 方便查找和维护

4, cookie, localstorage 通过封装再导出使用, 默认设置失效时间, 公共 path 等

5, 用户登录状态/全局状态信息的获取和更新必须使用[公共方法]

### 工具层

1, 通用日期/时间格式化的方法, 尽量不引入第三方库

2, 数据类型基本处理, 包括是否为空, 深拷贝等

3, 地址栏参数处理, 需要满足支持解析任意传入的 url

### css 模块化

1, 可以使用[flex 布局]吧

2, 引入 css [module], 动态生成 css, 让每个组件具有局部作用域, 避免 css 冲突, 难以命名等问题

3, 或者使用 [postcss] 进行简单处理

### 子系统规范

提供独立 api, 支持切换[开发环境], 包括打包和 http 请求, 子系统可覆盖全局默认配置

### 打包规划

1, 使用[别名]导入

2, [按系统文件夹启动] dev

3, 按系统文件夹 build (可能不需要)

4, 开发和打包前动态[合并] router 和 store

5, 全量打包

## 编码规范

1, data [变量尽量加注释]

2, component 文件名采用大写驼峰

3, 语法校验 eslint, 使用编辑器[自动解决语法问题]

4, vue 模板, js 和 样式尽量[分成 3 个文件], 少量样式可以不分开

## 非紧急的优化

1, [缓存当前菜单], 后台悄悄请求并更新

2, 表单内容支持历史记录, 尽量将搜索关键字放到地址栏, 先 push 历史记录, 再请求接口完成搜索

## 脚手架计划

- 自动创建新系统目录 npm run cli --addsystem=xxx
- 自动指定打包时的皮肤 npm run cli --skin=xxx

基础库封装:

## axios 封装

- 公共错误
- 登录是否有效, 登录权限, 用户权限
- 方法拆分, 入参细化

> 书写案例:

```js
// 默认方式
const serverA = {
  url: "xxx",
  loading: true // 默认为 false
};

// 多次请求相同的接口自动取消前面的请求:
const res = await this.$http.post(serverA, {
  urltail: "pageIndex/pageSize",
  isCancel: true, // 或 'all' 或 {type: true/'all', msg: 'xxx'}
  params: {
    xx: "xxx"
  }
});
```

## 表格

- 自动请求接口
- 本地分页
- 重新加载表格数据

| table 属性 | 作用 | 默认值
---------|----------|----------
 data | 表格数据 | 无
 height | 固定表头 | 无
 stripe | 表格条纹 | Boolean: true
 border | 表格边框 | Boolean: true
 maxHeight | 表格最大高度 | Number
 spanMethod | 合并行列 | Function
 highlightCurrentRow | 高亮当前行 | true
 http | http 请求 | Array: ['http 方法 get|post', service, params]
 dataTransform | http 数据拦截 | Function
 disabled | 禁用分页 | false
 paging | 是否使用分页 | true
 localPaging | 是否使用本地分页 | false
 pageSize | 每页显示条数 | 10
 pageSizes | 分页下拉选择器 | [10, 20, 30, 50, 100]
 currentPage | 当前页码 | 1
 layout | 分页布局 | 'sizes, prev, pager, next'
 showDownload | 显示下载 xsl 文档 | false

| table 方法 | 作用 | 用法
---------|----------|----------
 reload |  重新加载表格数据 | this.$refs.table.reload()
 download |  下载 xsl 文档 | this.$refs.table.download()

| el-table-column 属性 | 作用
---------|----------
 prop | 同 element-ui
 label | 同 element-ui
 width | 同 element-ui

```html
<!-- 组件书写案例 -->
<base-table
    ref="basetable"
    :http="[service.serviceLogin, {}]"
    :local-paging="true"
>
    <template slot-scope="slot">
        <el-table-column
            v-for="(col, index) in slot.columns"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
        />
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button>编辑 {{ scope.$index }}</el-button>
                <el-button>删除</el-button>
            </template>
        </el-table-column>
    </template>
</base-table>
```
