[Chinese version](https://github.com/Clipteam/clipcc-extension/blob/master/README_CN.md)
# ClipCC Extension

`clipcc-extension` is an API for writing ClipCC extensions.
## What is ClipCC3 extension?
ClipCC3 Extension is a ClipCC3 feature under development that allows users to freely add new features to ClipCC3 (including but not limited to new modules, new look and feel).
![](https://i.niupic.com/images/2021/05/20/9i1I.jpg)
<!--more-->
## Before the begining
Please note! Before you start learning to develop extensions, please note that **ClipCC3 extensions are still in development** and there may be major changes to existing extension APIs that may cause extensions to fail before the official release of the feature. This tutorial will use the ClipCC3 extension API as of May 20 for demonstration purposes.
## Environmental requirements
You need to install NodeJS and npm beforehand (you can also use yarn instead), in order to save space not to describe the installation method in detail, please check the tutorial through the search engine itself.
## Make an new project
For project management purposes, please go to your working folder first and then run the following commands in order:
``` bash
npm -g install clipcc-extension-cli # can also be replaced with yarn global add clipcc-extension-cli
mkdir example-extension # example-extension can also be replaced with your extension name
cd example-extension
npm init # can also be replaced with yarn init
ccext-cli -g
npm install # can also be replaced with yarn
```
After running, the contents of your folder should look like this:
```
/src
package.json
webpack.config.js
```
Among them, the core code of the extension project are stored under the src folder, the contents of the folder should look like this (it is normal that the locales folder does not exist, please create the folder yourself to attach files)
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
The locales directory is used to store the style of modules in different languages, assets is used to store the plugin resources, index.js is the main file for registering modules/realizing functions, and info.json is the plugin information.
## Writing an extension
First of all, please open src/info.json and fill in the following content:
```json
{
    "id": "your.extension.id",
    "author": "Your Name",
    "version": "1.0.0",
    "icon": "assets/icon.jpg",
    "inset_icon": "assets/inset_icon.svg"
}
```
Then open src/index.js and fill in the following content.
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
Then open src/locales/en.json and src/locales/zh-cn.json and fill in them:
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
After writing, run ``npm run build`` in the project top-level folder, the generated plugins can be found under dist/, and then directly imported into ClipCC to use.
![](https://i.niupic.com/images/2021/05/20/9i21.jpg)
## Lastly
The above is a sample of the simplest ClipCC plugin, the following may be useful for your further writing.
ClipCC extension documentation: [click here](https://clipteam.github.io/clipcc-extension/)
ClipCC local storage extension code: [click here](https://github.com/Clipteam/clipcc-extension-local-storage)
ClipCC JavaScript extension code: [click here](https://github.com/SinanGentoo/clipcc-extension-javascript)
ClipCC official exchange QQ group: 959825608