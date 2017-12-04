# Picidae 后台系统

## 猜想  
预想该项目能够根据 `picidae.config.js` 的配置，结合Picidae的理念  
自动搭建一个较为完善（看的过去）的后台系统。

## 入手项目须知
1. :boom:留意！`package.json` 中的 `scripts`

## TODO

- [x] UI 交互设计 (material-ui)  
- 抽象且通用的接口
    - 配置文件的修改
    - core  
        - doc 的增删改查
        - markdown 中 meta 的抽离解析
- 编辑器的实现（js/markdown）
    - 图床
    - 同步预览更新
- (picidae)指令的配置和监控
- 权限控制（不打算使用数据库）

## Other Todo (细节实现)

- [x] lint 添加至 git_hook

## Dependencies

### 前端
- react(-dom) v16
- react-router v3 (不使用V4，因为不需要用到V4的动态路由)
- webpack V3（终于用上了！:satisfied:）
- babel-preset-env/babel-plugin-tiny-import

### 后端
- koa(尝试)
- swagger-test
- mocha

### 其他
- eslint

## 新的尝试
- mocha-loader (webpack)
- backend/frontend test unit
- backend swagger doc