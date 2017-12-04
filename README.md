# vue_admin
后端管理框架

#### 后台管理框架技术栈

| 前端框架          | UI组件       | 接口技术  | 路由机制       | 代码管理手段  | js版本 |
| ------------- | ---------- | ----- | ---------- | ------- | ---- |
| vue.js(2.0版本) | element.ui | axiso | vue-router | webpack | es6  |

#### 项目结构

> build、config------webpack配置文件

> dist------文件压缩打包后生成文件

> node_modules------第三方依赖包

> src----开发环境

##### 开发环境简介

|   文件或文件夹   |        功能        |
| :--------: | :--------------: |
|    api     |      接口配置文件      |
|   assets   |   外部引用文件、css文件   |
| components |       公共模板       |
| directive  |       js文件       |
|  filters   |     全局过滤器文件      |
|    mock    |    模拟数据文件（暂无）    |
|   router   |       路由文件       |
|   store    |   数据流向封装文件（暂无）   |
|   styles   |      scss文件      |
|   utlis    | localstorage封装文件 |
|    view    |       视图文件       |
|  App.vue   |      视图入口文件      |
|  main.js   |      全局入口文件      |

###  项目启动

- https://nodejs.org/en/

  安装node开发环境（npm是同node安装好的,使用npm -v 查看）

- npm install

  下载第三方依赖(多下两次，以防依赖下在不完全)


- npm run dev

  项目启动(依赖加载完成以后方可使用)


- npm run build

  项目打包(依赖加载完成以后方可使用,使用之前删除dist文件，以防压缩打包报错)

