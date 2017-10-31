## RESTful API

> 本项目为纯后端，可随意搭配前端

[查看接口文档](https://github.com/wscj/restapi/wiki)

### 版本

|Node.js|Express.js|
|--|--|
|^7.9.0|^4.15.3|

### 安装与运行

```bash
# 安装依赖
$ npm i

# 运行
$ npm run start

# 开发模式运行
$ npm run dev
```

### 搭配前端

为了方便搭配前端，本项目的静态资源路径设置为根目录的上一级，即只需把本项目的根目录放置在与前端的`index.html`文件同级即可，如下：

```
front-end-project
  |--index.html
  |--restapi //本项目
```

### 示例

使用`postman`发送`POST`请求示例

![](https://github.com/wscj/static-resource/blob/master/images/post.png)
