# ClipCC Extension

`clipcc-extension` 是一个用于编写 ClipCC 扩展的API。
## 什么是ClipCC3 扩展？
ClipCC3 扩展是正在开发中的ClipCC3功能，他允许用户能够自由的为ClipCC3添加新的功能（包括但不限于新模块，新外观）。
![](https://i.niupic.com/images/2021/05/20/9i1I.jpg)
<!--more-->
## 在开始之前
请注意！在开始学习开发扩展之前，请注意**ClipCC3 扩展功能仍处于开发阶段**，在正式发布该功能之前已有扩展API可能会出现大的改动造成扩展失效。本教程将使用截至5月20日的ClipCC3 扩展API进行演示。
## 环境要求
您需要事先安装好NodeJS与npm（也可以使用yarn代替），为了节省篇幅不详细叙述安装方法，请通过搜索引擎自行查询教程。
## 建立一个新项目
为了方便项目管理，请您先进入您的工作文件夹再按顺序运行以下命令：
``` bash
npm -g install clipcc-extension-cli # 也可替换为yarn global add clipcc-extension-cli
mkdir example-extension # example-extension可换为自己的扩展项目名
cd example-extension
npm init # 也可替换为yarn init
ccext-cli -g
npm install # 也可替换为yarn
```
在运行完毕之后，您的文件夹内容应该是这样的：
```
/src
package.json
webpack.config.js
```
其中，扩展项目的核心代码都存储在src文件夹下面，文件夹内容应该是这样的（locales文件夹不存在很正常，请自行建立该文件夹以附属文件）：
```
assets/
- icon.jpg
- inset_icon.svg
locales/
- en.json
- zh-cn.json
index.js
info.json
```
其中locales目录用于存放不同语言下模块的样式，assets用于存放插件资源，index.js为注册模块/实现功能的主要文件，info.json则是插件信息。
## 编写一个最简单的扩展
首先请先打开src/info.json，填写如下内容：
```json
{
    "id": "your.extension.id",
    "author": "Your Name",
    "version": "1.0.0",
    "icon": "assets/icon.jpg",
    "inset_icon": "assets/inset_icon.svg"
}
```
然后打开src/index.js，填写如下内容：
```javascript
const ClipCC = require('clipcc-extension');

class ExampleExtension extends ClipCC.Extension {
    init() {
        ClipCC.API.addCategory({
            categoryId: 'your.extension.id.category',
            messageId: 'your.extension.id.category.name',
            color: '#339900'
        });
        ClipCC.API.addBlock({
            opcode: 'your.extension.id.return',
            type: ClipCC.Type.BlockType.REPORTER,
            messageId: 'your.extension.id.return',
            categoryId: 'your.extension.id.category',
            argument: {
                VALUE: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: 'Hello World!'
                }
            },
            function: args => this.ReturnValue(args.VALUE)
        });
        ClipCC.API.addBlock({
            opcode: 'your.extension.id.helloworld',
            type: ClipCC.Type.BlockType.COMMAND,
            messageId: 'your.extension.id.helloworld',
            categoryId: 'your.extension.id.category',
            function: args => this.HelloWorld()
        });
    }

    uninit() {
        ClipCC.API.removeCategory('your.extension.id.category');
    }
    
    ReturnValue(VALUE) {
        return VALUE;
    }
    
    HelloWorld() {
        console.log("Hello World!");
        alert("Hello World!");
    }
}

module.exports = ExampleExtension;
```
然后打开src/locales/en.json与src/locales/zh-cn.json，分别填写
```json
{
    "your.extension.id.name": "Example",
    "your.extension.id.category.name": "Example",
    "your.extension.id.description": "ClipCC example extension.",
    "your.extension.id.return": "return [VALUE]",
    "your.extension.id.helloworld": "Hello World!"
}

```

```json
{
    "your.extension.id.name": "示例",
    "your.extension.id.category.name": "示例",
    "your.extension.id.description": "ClipCC示例扩展.",
    "your.extension.id.return": "返回 [VALUE]",
    "your.extension.id.helloworld": "Hello World!"
}

```
编写完毕之后，在项目顶层文件夹执行``npm run build``，生成的插件可以在 dist/ 下找到，之后直接导入ClipCC即可使用。
![](https://i.niupic.com/images/2021/05/20/9i21.jpg)
## 最后
以上则是一个最简单的ClipCC插件示例，以下内容可能对你的进一步编写有帮助：
ClipCC扩展文档：[点这里](https://clipteam.github.io/clipcc-extension/)
ClipCC本地存储扩展代码：[点这里](https://github.com/Clipteam/clipcc-extension-local-storage)
ClipCC JavaScript扩展代码：[点这里](https://github.com/SinanGentoo/clipcc-extension-javascript)
ClipCC 官方交流QQ群：959825608
