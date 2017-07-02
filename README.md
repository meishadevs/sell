## 配置 vue-cli 环境

#### 安装 vue-cli

	npm install -g vue-cli

#### 运行vue命令

	vue

#### 查看vue.js中可以使用的模板

	vue list

#### 使用webpack模板创建一个sell项目

	vue init webpack sell 

#### 进入sell目录下

	cd sell

#### 查看sell目录下的完整的文件信息

	ll -a

#### 安装项目依赖

	npm install

#### 运行

	npm run dev

## .babelrc中的代码解释

	//babel编译的一些配置，babel可以将ES6编译成ES5
	{
	  //babel转换时需要预先安装的插件
	  "presets": [
	    ["env", { "modules": false }],
	
	    //ECMA的草案
	    "stage-2"
	  ],
	
	  //该插件用于将一些ES6的方法做转换
	  "plugins": ["transform-runtime"],
	
	  //false表示转换后的代码不生成注释
	  "comments": false,
	  "env": {
	    "test": {
	      "presets": ["env", "stage-2"],
	      "plugins": [ "istanbul" ]
	    }
	  }
	}

## .editorconfig中的代码解释
	
	//编辑器的配置

	root = true
	
	[*]
	
	//编码
	charset = utf-8
	
	//缩进风格，表示基于一个空格做缩进
	indent_style = space
	
	//缩进的大小是2格缩进
	indent_size = 2
	
	//表示换行符的风格，lf表示Linux和Mac的换行符风格
	end_of_line = lf
	
	//表示创建一个文件时，会自动在文件末尾插入一个新行
	insert_final_newline = true
	
	//表示会自动在行尾移除多余的空格
	trim_trailing_whitespace = true

## .eslintignore中的代码解释

	//忽略做ES语法检测的目录文件

	build/*.js
	config/*.js

## 名词解释
**devDependencies：**项目开发时的依赖  
**Dependencies：**项目运行时的依赖  
**node_modules：**项目依赖的代码库

## 遇到的问题及其解决方法

**1.在执行 `npm run dev` 命令的时候出现8080端口被占用**  
**解决方法：[https://segmentfault.com/a/1190000007020889](https://segmentfault.com/a/1190000007020889)**

