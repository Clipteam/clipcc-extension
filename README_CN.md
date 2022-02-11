# ClipCC 扩展编写指南

本教程将通过演示编写一个简单的扩展来阐述 ClipCC 扩展的基本编写流程。

请注意！本文档具有时效性，因此本文不能保证内容仍然适用于当前版本。请以 std 文档和 jsdoc 为准。

## 准备

1. 首先，你需要一台性能还过的去的电脑，为了设备安全，请勿使用手机，MP3 甚至空调等设备进行编写。

2. 其次，你需要事先安装好 Node.js 与 npm（也可以使用 yarn 代替），为了节省篇幅不阐述具体安装方法。

## 建立一个新项目

为了方便扩展编写，请您先进入您的工作文件夹再按顺序运行以下命令：

```shell
npm -g install clipcc-extension-cli # 也可替换为 yarn global add clipcc-extension-cli
mkdir example-extension # example-extension 可换为自己的扩展项目名
cd example-extension
npm init # 也可替换为 yarn init
ccext-cli
```

在最后一步，ClipCC 扩展开发脚手架(CLI)将会询问有关扩展信息的问题。由于本文使用 JavaScript (commonjs)作为插件编写示范，因此请在编写语言中选择 JavaScript (commonjs)。如图：

![图片加载中...](https://s3.jpg.cm/2021/08/22/IbEeHG.png)

回答完毕后，脚手架将会自动安装依赖，等待安装完毕后一个新的 ClipCC 扩展项目就建立成功了。

## 编写一个扩展

在运行完毕之后，您的文件夹内容应该是这样的：

```
/src
package.json
webpack.config.js
```

其中，扩展项目的核心代码都存储在 src 文件夹下面，文件夹内容应该是这样的（locales 文件夹不存在很正常，请自行建立该文件夹以附属文件）：

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

其中 locales 目录用于存放不同语言下积木的样式，assets 用于存放插件资源，index.js 为注册积木/实现功能的主要文件，info.json 则是插件信息。

首先打开 src/index.js，填写如下内容：

```javascript
const {api, type, extension} = require('clipcc-extension');
class ExampleExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'clipteam.example.category',
            messageId: 'clipteam.example.category.category',
            color: '#339900'
        });
        api.addBlock({
            opcode: 'clipteam.example.return',
            type: type.BlockType.REPORTER,
            messageId: 'clipteam.example.return.message',
            categoryId: 'clipteam.example.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: 'Hello World!'
                }
            },
            function: args => this.ReturnValue(args.VALUE)
        });
        api.addBlock({
            opcode: 'clipteam.example.helloworld',
            type: type.BlockType.COMMAND,
            messageId: 'clipteam.example.helloworld.message',
            categoryId: 'clipteam.example.category',
            function: args => this.HelloWorld()
        });
    }
    onUninit() {
        api.removeCategory('clipteam.example.category');
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

然后打开 src/locales/en.json 与 src/locales/zh-cn.json，分别填写

```json
{
    "clipteam.example.name": "Example",
    "clipteam.example.category.message": "Example",
    "clipteam.example.description": "ClipCC example extension.",
    "clipteam.example.return.message": "return [VALUE]",
    "clipteam.example.message": "Hello World!"
}
```

```json
{
    "clipteam.example.name": "示例",
    "clipteam.example.category.message": "示例",
    "clipteam.example.description": "ClipCC 示例扩展.",
    "clipteam.example.return.message": "返回 [VALUE]",
    "clipteam.example.helloworld.message": "Hello World!"
}
```

编写完毕之后，在项目顶层文件夹执行``npm run build``，生成的插件可以在 dist/ 下找到。之后将生成的插件直接导入 ClipCC 3.1 即可使用，效果如图：

![图片加载中...](https://s3.jpg.cm/2021/08/22/IbEuKQ.png)

## 最后

以上则是一个最简单的 ClipCC 插件示例，以下内容可能对你的进一步编写有帮助：

ClipCC 扩展文档：[点这里](https://clipteam.github.io/clipcc-extension/)

ClipCC 字符串扩展代码：[点这里](https://github.com/JasonXu134590/clipcc-extension-string)

ClipCC 文件交互扩展代码：[点这里](https://github.com/Clipteam/clipcc-extension-fileio)

ClipCC 官方交流 QQ 群：959825608

