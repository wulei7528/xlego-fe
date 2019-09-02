# X乐高生产管理系统前端项目
xlego-a fe project for production

# 本地开发

## 启动前端构建

```
npm start
```

## 代理配置
推荐使用 https://wproxy.org/whistle/ 这种跨平台的代理工具

教程 https://wiki.n.miui.com/pages/viewpage.action?pageId=135273412

```
#后台服务在50020,先后匹配原则，所以这一行放前面
xlego-local.cn/api/  127.0.0.1:50020
#前端构建html及js，这一行放后面，这样前端和后台就是同一个域名了，没有跨域的问题
xlego-local.cn/  127.0.0.1:3000
```

配置好了以后，本地开发请使用 http://xlego-local.cn 访问
