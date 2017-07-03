## grunt-scaffold

这是一个基于grunt前面自动化框架上配置的一个脚手架项目，方便大家不用每次开发都去配置一遍，特意开了一个仓库来保存起来。这次在配置的时候主要是对传统html,css,js开发作的优化。使用grunt-contrib-watch配合livereload来实现热更新，通过grunt build 命令达到html,css,js的文件压缩。

### 使用方法

项目基于[node.js](https://nodejs.org/en/)，热更新需要借助chrmoe插件[livereload](http://livereload.com/)，还没有安装的可以去下面网站自行安装：

- [node.js下载](https://nodejs.org/en/download/)
- [livereload下载](https://chrome.google.com/webstore/search/livereload?utm_source=chrome-ntp-icon)
*对于livereload下载不了的华广的同学可以试一下通过这个地址[下载](http://125.216.145.57:9080/download?resource=softwares/liveReload_chromeExtension.rar&name=liveReload_chrome)，下载完后解压，然后打开chrome浏览器，在地址栏输入chrome://extensions/，最后把解压后缀为crx的文件拖到chrome页面中就可安装*

上面的东西都准备好之后，运行以下命令**安装依赖**：

```
npm install
```

**启动服务：**

```
grunt
```

服务启动后打开浏览器输入localhost:3000 即可访问。

**运行打包任务：**

```
grunt build
```

等待打包完成后，会发现在dist目录下有经过处理的打包文件，接下来你们喜欢把这些文件怎么放到服务上就是你们的事了。

### 项目结构

```
│  .gitignore
│  gruntfile.js
│  package.json
│  server.js
│  
├─asset
│      router.js
│          
├─public
│  ├─css
│  │      index.css
│  │      
│  ├─img
│  │      byj_2016.png
│  │      
│  └─js
│          about.js
│          index.js
│          
├─src
│  │  about.html
│  │  index.html
│  │  
│  └─product
│          xingCard.html
│          
└─test
```

首先解释一下各目录的作用：

1. asset（服务器资源文件夹）
2. public（页面的各种资源，也就是js,css,img）
3. src（页面代码目录，html）
4. test(测试代码目录)

最后希望这个工具对大家有用 (@^ _ ^@)