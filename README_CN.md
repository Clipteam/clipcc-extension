# ClipCC 扩展编写指南

#### 请注意！在开始学习开发扩展之前，请注意 ClipCC 扩展功能**仍处于开发阶段**，在正式发布该功能之前已有扩展 API 可能会出现大的改动造成扩展失效。本教程将使用截至8月22日的 ClipCC 扩展 API 进行演示。

## 准备

1. 首先，你需要一台性能还过的去的电脑，为了设备安全请勿使用手机或空调等设备进行编写。
2. 其次，你需要事先安装好 Node.js 与 npm（也可以使用 yarn 代替），为了节省篇幅不详细叙述安装方法。

## 建立一个新项目

为了方便扩展编写，请您先进入您的工作文件夹再按顺序运行以下命令：

```shell
npm -g install clipcc-extension-cli # 也可替换为yarn global add clipcc-extension-cli
mkdir example-extension # example-extension可换为自己的扩展项目名
cd example-extension
npm init # 也可替换为yarn init
ccext-cli
```

在最后一步，ClipCC 扩展开发脚手架将会询问有关扩展信息的问题，请逐个回答即可，如图：

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

其中 locales 目录用于存放不同语言下模块的样式，assets 用于存放插件资源，index.js 为注册模块/实现功能的主要文件，info.json则是插件信息。

首先打开src/index.js，填写如下内容：

```javascript
const ClipCC = require('clipcc-extension');

class ExampleExtension extends ClipCC.Extension {
    onInit() {
        ClipCC.API.addCategory({
            categoryId: 'clipteam.example.category',
            messageId: 'clipteam.example.category.category',
            color: '#339900'
        });
        ClipCC.API.addBlock({
            opcode: 'clipteam.example.return',
            type: ClipCC.Type.BlockType.REPORTER,
            messageId: 'clipteam.example.return.message',
            categoryId: 'clipteam.example.category',
            argument: {
                VALUE: {
                    type: ClipCC.Type.ArgumentType.STRING,
                    default: 'Hello World!'
                }
            },
            function: args => this.ReturnValue(args.VALUE)
        });
        ClipCC.API.addBlock({
            opcode: 'clipteam.example.helloworld',
            type: ClipCC.Type.BlockType.COMMAND,
            messageId: 'clipteam.example.helloworld.message',
            categoryId: 'clipteam.example.category',
            function: args => this.HelloWorld()
        });
    }

    onUninit() {
        ClipCC.API.removeCategory('clipteam.example.category');
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
    "clipteam.example.description": "ClipCC示例扩展.",
    "clipteam.example.return.message": "返回 [VALUE]",
    "clipteam.example.helloworld.message": "Hello World!"
}

```

编写完毕之后，在项目顶层文件夹执行``npm run build``，生成的插件可以在 dist/ 下找到。之后将生成的插件直接导入 ClipCC 3.1 即可使用，效果如图：

![图片加载中...](https://s3.jpg.cm/2021/08/22/IbEuKQ.png)

## 最后

以上则是一个最简单的ClipCC插件示例，以下内容可能对你的进一步编写有帮助：
ClipCC扩展文档：[点这里](https://clipteam.github.io/clipcc-extension/)
ClipCC本地存储扩展代码：[点这里](https://github.com/Clipteam/clipcc-extension-local-storage)
ClipCC JavaScript扩展代码：[点这里](https://github.com/SinanGentoo/clipcc-extension-javascript)
ClipCC 官方交流QQ群：959825608
