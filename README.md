[Chinese version](https://github.com/Clipteam/clipcc-extension/blob/master/README_CN.md)
# ClipCC Extension Writing Guide

#### Please note! Before you start learning to develop extensions, the ClipCC extensions **are still in development** and there may be major changes to the existing extension API that may cause the extension to fail before the official release of the feature. This tutorial will use the ClipCC extension API as of August 24th for demonstration purposes.

## Preparation

1. you need a computer with acceptable performance. for device safety, please do not developing by smartphone🤔.
2. you need to install Node.js and npm (you can also use yarn instead).

## Create a new project

To make it easier to write the extension, please go to your working folder and then run the following commands in order.

```shell
npm -g install clipcc-extension-cli # You can also replace it with yarn global add clipcc-extension-cli
mkdir example-extension # example-extension can be replaced with the name of your own extension project
cd example-extension
npm init # can also be replaced with yarn init
ccext-cli
```

In the last step, the ClipCC extension development scaffold will ask questions about the extension information. please note that we will use JavaScript for development, so please choose JavaScript as your programming language.

![Image loading...](https://s3.jpg.cm/2021/08/22/IbEeHG.png)

After answering the questions, the scaffold will automatically install the dependencies and wait for the installation to complete before creating a new ClipCC extension project.

## Write an extension

After running, the contents of your folder should look like this.

```
/src
package.json
webpack.config.js
```

Where the core code of the extension is stored under the src folder, the contents of the folder should look like this (it's normal that the locales folder doesn't exist, so please create it yourself to attach files)

```
assets/
- icon.jpg
- inset_icon.svg
locales/
- en.json
index.js
info.json
```

The locales directory is used to store the style of the module in different languages, assets is used to store the plugin resources, index.js is the main file to register the module/implement the function, and info.json is the plugin information.

First, open src/index.js and fill in the following content.

```javascript
const ClipCC = require('clipcc-extension');

class ExampleExtension extends ClipCC.Extension {
    onInit() {
        ClipCC.api.addCategory({
            categoryId: 'clipteam.example.category',
            messageId: 'clipteam.example.category.category',
            color: '#339900'
        });
        ClipCC.api.addBlock({
            opcode: 'clipteam.example.return',
            type: ClipCC.type.BlockType.REPORTER,
            messageId: 'clipteam.example.return.message',
            categoryId: 'clipteam.example.category',
            argument: {
                VALUE: {
                    type: ClipCC.type.ParameterType.STRING,
                    default: 'Hello World!'
                }
            },
            function: args => this.ReturnValue(args.VALUE)
        });
        ClipCC.api.addBlock({
            opcode: 'clipteam.example.helloworld',
            type: ClipCC.type.BlockType.COMMAND,
            messageId: 'clipteam.example.helloworld.message',
            categoryId: 'clipteam.example.category',
            function: args => this.HelloWorld()
        });
    }

    onUninit() {
        ClipCC.api.removeCategory('clipteam.example.category');
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

Then open src/locales/en.json and fill in

```json
{
    "clipteam.example.name": "Example",
    "clipteam.example.category.message": "Example",
    "clipteam.example.description": "ClipCC example extension,
    "clipteam.example.return.message": "return [VALUE]",
    "clipteam.example.message": "Hello World!"
}

```

After writing, run ``npm run build`` in the project top-level folder and the generated plugin can be found under dist/. Afterwards, import the generated plugin directly into ClipCC 3.1 and it will work as follows.

![image loading...](https://s3.jpg.cm/2021/08/22/IbEuKQ.png)

## Finally

The above is an example of the tiny ClipCC extension, the following may be useful for your further development.

ClipCC extension documentation: [click here](https://clipteam.github.io/clipcc-extension/)

ClipCC QQ group: 959825608
