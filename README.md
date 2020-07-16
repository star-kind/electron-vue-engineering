# move-rename-front

> The graphical interface of a project that renames and moves files to specified directory.

#### 工程简介

	本项目是首个基于electron的桌面图形软件开发之练习项目.
	
	亦可按照electron-vue+node.js的前后端分离流程进行开发,使用vue-cli构建,采用C/S形式发布
	
	"move-rename-front" 为前端图形UI客户端,而使用express框架的node.js项目为业务后端服务器.


----------------------------------------

#### 前端client架构:

+ vue
+ element-ui
+ electron
+ electron-vue
+ sqlite3(嵌入式文件型数据库)
+ Promise

#### 后端server架构

+ express
+ sqlite3
+ axios
+ node.js
+ es6

------------------------------------

### 已实现功能

+ 批量将JPG图片文件按所在目录名增加前缀名,并移动至指定目录
+ 批量将哔哩哔哩缓存之blv视频文件,按所在目录中的json文件内容节点增加前缀名,并移动至指定目录


