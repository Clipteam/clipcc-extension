## Initialize a Project
```
yarn global add clipcc-extension-cli
mkdir example-extension
cd example-extension
yarn init
ccext-cli -g
yarn install
```

## Write Basic Infomation
src/info.json
```json
{
    "id": "example.example",
    "author": "Example",
    "version": "0.1.0",
    "icon": "assets/icon.jpg",
    "inset_icon": "assets/inset_icon.svg"
}
```

## Write Code
src/index.js
```js
const ClipCC = require('clipcc-extension');

class JsonExtension extends ClipCC.Extension {
    init() {
        ClipCC.API.addCategory({
            categoryId: 'example.example.category',
            messageId: 'JSON',
            color: '#FFB11B'
        });
        ClipCC.API.addBlock({
            opcode: 'example.example.hello',
            type: ClipCC.Type.BlockType.REPORTER,
            messageId: 'Hello',
            categoryId: 'example.example.category',
            function: args => "Hello, world!"
        });
    }
}
```

These codes will add a new round block which called `Hello` to your ClipCC when you load it.

## Build Your Extension
```bash
yarn run build
```

It will create `build` and `dist` directories in your workspace, and output `example.example@0.1.0.ccx`.
