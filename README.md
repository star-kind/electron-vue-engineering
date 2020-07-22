# move-rename-front

> The graphical interface of a project that renames and moves files to specified directory.

#### 工程简介

	本项目是首个基于electron的桌面图形软件开发之练习项目.
	
	亦可按照electron-vue+node.js的前后端分离流程进行开发,使用vue-cli构建,采用C/S形式发布.
	
	"move-rename-front" 为前端图形UI客户端,而使用express框架的node.js项目为业务后端服务器.

	通过本工程,加深了对js面向对象编程(OOP)的掌握程度,受益匪浅.

----------------------------------------

#### 前端client架构:

+ vue
+ element-ui
+ electron
+ electron-vue
+ sqlite3(嵌入式文件型数据库)
+ Promise
+ node.js

#### 后端server架构

+ express
+ sqlite3
+ axios
+ node.js

------------------------------------

### 已实现功能

+ 批量将JPG图片文件按所在目录名增加前缀名,并移动至指定目录
+ 批量将哔哩哔哩缓存之blv视频文件,按所在目录中的json文件内容节点增加前缀名,并移动至指定目录(更为详细之介绍,可以看看某另一座仓库`bilibili-video-front`的readme)

+ web开发中的` hello,world! `: 用户的增改查

----------------------------------------

+ 要对sqlite3数据文件所在目录赋予全部权限:`chmod -R 777 database/`,如此node.js方可进行写入操作

+ 搞定了如何在vue组件中导入并调用OOP设计类型的外部js模块中的函数

+ 于electron中elementUI表格组件不起效,只得自己生成表格内容

+ 密码加密应用了MD5+UUID

+ this在callback(回调)函数中会失效,无法调用

+ 调用` this.$store.dispatch ` 总是报错没有then方法` TypeError: Cannot read property 'then' of undefined `,通过vuex调用store模块宣告失败

+ 全体用户列表组件经常报错,报错时尝试重新加载即可

+ 每当代码有所改动之时,皆需重新加载