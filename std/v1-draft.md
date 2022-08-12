本文是 ClipCC 扩展标准（v1，草案）文档，所有扩展必须遵循本文档所规定内容。

*请注意，本文档仍然属于草案，其中 API 可能在正式版中发生变动*

## 1 标准更新与适用版本

|标准版本|API 版本|更新日期|状态|备注|
|:-:|:-:|:-:|:-:|:-:|
|v1|0.x|2022/5/2|草案||

标准版本为扩展 API 遵循的标准，API 版本为对应的 clipcc-extension 包版本。

## 2 定义

**编辑器（editor）**：特指 ClipCC 编辑器

**扩展（extension）**：指能够扩展编辑器功能的文件，这里特指 `*.ccx` 格式的扩展。

**警告（warning）**：指通过 `console.warn` 等形式给出的警告信息。

**错误（error）**：指通过 `throw` 或 `console.err` 形式给出的错误信息。

**扩展的加载（Load）**：即 `onInit` 事件。

**扩展的卸载（Unload）**：即 `onUninit` 事件。

## 3 文件格式与结构

ClipCC 扩展必须以 zip 格式打包为 `*.ccx` 文件。

在 `*.ccx` 文件内部的根目录下，必须包含 `info.json` 和 `main.js` 两个文件。

## 4 扩展信息

在扩展文件内部根目录下的 `info.json` 为扩展的基本信息，该文件中各字段必须按照下面规定的方式填写。缺少必要字段的，应当拒绝加载该扩展；有无用字段的，不对无用字段做任何响应。

```json
{
    "id": "extension.example",
    "author": "Clip Team",
    "version": "1.0.0",
    "icon": "assets/icon.jpg",
    "inset_icon": "assets/inset_icon.svg",
    "api": 1,
    "optional": false,
    "dependency": {
        "anothor.extension": "0.1.0"
    }
}
```

字段说明（标注有可选的表示这一选项是可选的，否则必须填写）：

**id**：插件的 ID，必须是唯一的，推荐的写法为 `作者ID.插件名`，其中整个 ID 必须满足 `[a-zA-Z0-9_-]+`。不推荐使用多个 `.` 分割 ID，如有必要，每个 `.` 之间必须至少有一个合法的字符。

**author**：作者名，可以是一个字符串，或者一个列表。

**version**：版本。

**icon**：插件头图。

**inset_icon**：插件小图标。

**api**：API 版本标识（标准版本），如果当前的编辑器不支持该 API，则应当拒绝加载该扩展。

**optional**：（可选）是否是可选的扩展，默认为 `false`。如果设为 `true` 则表示这个扩展是可选的，不加载并不会对作品文件造成影响。如果为 `false` 表示这个扩展必须被加载才能保证作品文件正常打开，例如这个扩展添加了新的模块。

**dependency**：(可选）依赖的扩展，键为扩展 ID，值为依赖的版本。版本号有如下格式：`1.2.0` 表示版本只能为 `1.2.0`；`1.2.*` 表示版本号可以为 `1.2.0`、`1.2.1` 等，在匹配中 `*` 可以出现多次，但必须表示版本号中完整的某一段，即 `1.2.3*` 是不合法的，并且 `*` 不能出现在包含 `^` 或 `~` 开头的版本号匹配中；`^1.2.3` 表示版本号大于等于 `1.2.3` 但小于 `2.0.0`；`~1.2.3` 表示版本号大于等于 `1.2.3` 但小于 `1.3.0`。

## 5 加载与执行

### 5.1 入口文件

在扩展文件内部根目录下的 `main.js` 为扩展的入口文件，在扩展被加载到编辑器时，该文件将被载入编辑器并执行。

入口文件必须显式导出一个类，该类应当实现 `onInit` 和 `onUninit` 方法（但不是强制的），以响应加载和卸载事件。

目前，扩展导出的类必须以 CommonJS 形式导出，即导出到 `module.exports`。

下面是一个基于 CommonJS 规范的扩展最小实现：

```javascript
class HelloExtension {
    onInit() { /* ... */}
    onUninit() { /* ... */ }
}

module.exports = HelloExtension;
```

### 5.2 加载与依赖项

扩展允许有一个或多个依赖，一个扩展依赖的全部扩展必须先序于该扩展被加载。如果两个扩展之间没有直接或间接的依赖关系，那两个扩展的加载顺序是随机的。

### 5.2.1 加载模式

扩展的加载模式分为主动加载和被动加载，其在编辑器中的卸载行为不同。

主动加载是编辑器或用户主动的要求加载某一个扩展；而在加载某一个扩展时，如果该扩展存在依赖，那么其依赖被隐式加载的行为称为被动加载。

如果一个扩展在加载链中即是主动加载也是被动加载，那么其加载模式为主动加载。

如果一个扩展被被动加载了，那么他不应当被主动卸载。

### 5.2.2 加载序与卸载序

当一个扩展被加载时，其所有的依赖项必须先序于该扩展被加载，并且其所有的依赖项均为被动加载模式。

当一个扩展被卸载时，其所有的非主动加载模式的依赖项均后序于该扩展被卸载，所有依赖该扩展的扩展均先序于该扩展被卸载。

### 5.3 事件响应

扩展响应一个具体事件通过编辑器直接调用插件的相关方法，如对于调用扩展 A 的 `onInit` 事件，即直接调用 `a.onInit()`，其中 `a` 表示扩展 A 的一个实例。

当扩展实例没有定义某一个事件的时候，编辑器调用该事件时不给出警告或错误，而应该跳过对其的调用。例如，如果某个扩展不存在 `onInit` 事件，那么这个扩展也应当被正常加载，但不会响应 `onInit` 事件。

下面是扩展的全部事件及对其的解释：

**onInit()**：当插件被启用时触发。在这个事件中，扩展应当完成对编辑器内容的添加。

**beforeProjectLoadExtension(data, extensions)**：在编辑器加载一个项目文件时，该事件在加载项目所需的扩展之前被触发，这个事件会被发送到所有的插件，无论是否被加载。

**beforeProjectLoad(data, extensions)**：当编辑器在加载一个项目时，触发这个事件。参数 `data` 表示当前项目的数据,参数 `extensions` 表示当前项目所需要的扩展。在这个事件中，扩展应当完成对旧版本项目的替换，以保证其适合新版本。请注意，如果原项目和当前环境完全一致，这个事件依然会被触发，此时扩展不应当修改该项目。扩展中的这一事件应当提供判断，保证版本迁移的正确性。

**beforeProjectSave(data)**：当编辑器在保存一个项目时，触发这个事件。参数 `data` 表示当前项目的数据。

**onUninit()**：当插件被禁用时触发。在这个事件中，扩展应当完成对添加到编辑器的内容的删除。

### 5.4 扩展间交互

扩展间交互通过暴露一个函数实现，在扩展中，使用 `registerGlobalFunction` 函数将扩展原型中的某一个成员函数暴露，允许其他扩展通过 `callGlobalFunction` 函数调用。注意，在其他扩展中直接获取某一个扩展的实例同样也是不被禁止的，但其结果是未定义的行为。

```javascript
class HelloExtension {
    onInit() {
        api.registerGlobalFunction('helloWorld', this.helloWorld);
    }

    helloWorld() {
        console.log('Hello, world!');
    }
}
```

**registerGlobalFunction(name, func)**：接受两个参数，分别表示全局函数名和函数对象，函数名推荐使用 `扩展名.函数名` 的形式，以防止与其他扩展的函数冲突。如果某个名称已经被占用了，那么后注册的函数不应当被载入，并抛出一个错误。

**unregisterGlobalFunction(name)**：删除某个已经注册的全局函数，注意，你应当只删除自己注册的全局函数，否则行为未定义。在扩展被卸载后，该扩展注册的全局函数应当被删除。

**callGlobalFunction(name, ...arg)**：接受一个函数名，后面跟随着参数列表，用来调用对应的函数。如果对应的函数不存在，则应当抛出一个错误。

## 6 翻译文本

### 6.1 翻译目录与文件

所有的翻译文本均在 `locale` 文件夹下，以 `<lang>.json` 形式命名，`<lang>` 应该为某个具体的语言编号，如 `en`、`zh-cn` 等，具体编辑器中支持的语言见编辑器对应的翻译文档。

### 6.2 数据格式

对于具体的 JSON 文件，应当满足如下格式：

```json
{
    "message.id.1": "this is message 1",
    "message.id.2": "this is message 2"
}
```

在上述格式中，JSON 文件必须有一个仅有键值对构成的对象，其中键必须是满足 `[a-zA-Z0-9-.]` 的合法字符串，即为翻译 ID，值必须是字符串类型，即为对应的翻译内容。

### 6.3 冲突处理

多个扩展可能会对同一个翻译 ID 提供翻译，此时后加载的扩展应当覆盖先前载入的翻译。特别地，规定编辑器主体的翻译必须是最先加载的。

例如扩展 A 翻译文件 `en.json` 如下：

```json
{
    "message.say": "Hello!",
    "message.world": "World!"
}
```

扩展 B 翻译文件 `en.json` 如下：

```json
{
    "message.say": "How are you?",
    "message.hi": "Hi!"
}
```

假如先加载扩展 A，后加载扩展 B，那么最终加载到编辑器中的翻译相当于如下内容，可以看到 `message.say` 的内容被覆盖了：

```json
{
    "message.say": "How are you?",
    "message.world": "World!",
    "message.hi": "Hi!"
}
```

## 7 设置项

设置项被定义在扩展文件内部根目录下的 `settings.json` 文件中，用于添加设置项到编辑器。扩展的全部设置项在扩展被载入时就会添加到编辑器中，而不是启用时。即用户可以在扩展并没有被启用的时候修改该扩展的设置项。

### 7.1 数据格式

`settings.json` 文件使用键值对数组的形式定义设置项，具体格式如下所示：

```json
[
    {
        "id": "option1",
        "type": "boolean",
        "default": false
    },
    {
        "id": "option2",
        "type": "number",
        "default": 0
    }
]
```

所有的设置项均以 `object` 形式定义，其最终在设置中的顺序与 `settings.json` 顺序一致，基本键值说明如下：

**id**：设置项的 ID，注意在扩展载入后，实际的 ID 为你的扩展 ID 后加上设置项的 ID，如上述 `option1` 的实际 id 为 `your.extension.id.option1`，其中 `your.extension.id` 是你的扩展 ID，其被定义于 `info.json`。这确保了插件间的设置不会出现冲突。

**type**：设置项类型，对应了在设置中的控件类型，具体取值见后。

**default**：默认值，如果对应的控件是可输入的，那么默认值同时会作为该控件的 placeholder 属性。当设置被用户恢复默认值时，该设置项将被设置为此值。

### 7.2 类型

#### 7.2.1 boolean

这个设置项是一个布尔类型，其值只能是 `true` 或者 `false`，对应的控件为 `Switch`。

```json
{
    "id": "option",
    "type": "boolean",
    "default": false
}
```

#### 7.2.2 number

这个设置项是一个数字类型，对应的控件为 `Input`。

```json
{
    "id": "option",
    "type": "number",
    "default": 0,
    "max": 20,
    "min": 1,
    "precision": 0
}
```

**max**：（可选）限定数字的最大值。

**min**：（可选）限定数字的最小值。

**precision**：（可选）限定数字的小数点后位数，`0` 表示限定为整数。

#### 7.2.3 selector

这个设置项是一个字符串类型，对应的控件为 `Selector`

```json
{
    "id": "option",
    "type": "selector",
    "default": "apple",
    "options": [{
        "id": "apple",
        "message": "message.apple"
    }, {
        "id": "boy",
        "message": "message.boy"
    }, {
        "id": "cat",
        "message": "message.cat"
    }, {
        "id": "dog",
        "message": "message.dog"
    }]
}
```

**items**：设置选择器的全部选项，每个选项应当以一个对象的形式说明，这个对象的 `id` 表示该选项的值，`message` 表示对应的翻译 ID。

### 7.3 翻译

设置项应当有翻译文本以及（可选的）描述文本。如果一个设置项没有设置描述文本的翻译，那么不会显示其描述文本。

```json
{
    "your.extension.id.settings.option1": "Option 1",
    "your.extension.id.settings.option1.description": "Help message for option 1"
}
```

如上述内容所示，设置项翻译的键应当为 `your.extension.id.settings` 加上设置项 ID 的形式，对应的描述文本的键应在其后面添加 `.description`。

### 7.4 获取设置项

获取设置项的 api 函数均被定义在 `api` 命名空间中。

```typescript
function getSettings(id: string): any;
```

效果：获取设置项 ID 为 `id` 的值。

## 8 接口和定义

全部的 api 函数均被定义在 `api` 命名空间中。全部的类型均被定义在 `type` 命名空间中。

### 8.1 Block

Block 被定义为编辑器中的一个模块，原型如下所示：

```typescript
interface BlockPrototype {
    opcode: string;
    type: BlockType;
    option?: BlockOption;
    param?: { [key: string]: ParameterPrototype };
    messageId: string;
    categoryId: string;
    function: Function;
}

interface BlockOption {
    terminal?: boolean;
    monitor?: boolean;
    filter?: FilterType;
}

enum FilterType {
    SPRITE, STAGE, ALL, HIDE
}

enum BlockType {
    COMMAND, REPORTER, BOOLEAN, HAT
}

interface ParameterPrototype {
    type: ParameterType;
    default?: any;
    menu?: (MenuItemPrototype[]|string|function);
    menuId: string;
    field?: boolean;
    shadow?: ShadowPrototype;
}

enum ParameterType {
    NUMBER, STRING, BOOLEAN
}

interface ShadowPrototype {
    type: string;
    fieldName: string;
}
```

```typescript
function addBlock(block: BlockPrototype): void;
```

效果：将 `block` 添加到编辑器中。

```typescript
function addBlocks(blocks: BlockPrototype[]): void;
```

效果：将多个 `block` 添加到编辑器中。

```typescript
function removeBlock(opcode: string): void;
```

效果：从编辑器中删除 opcode 为 `opcode` 的 Block。

```typescript
function removeBlocks(opcodes: string[]): void;
```

效果：从编辑器中删除多个 Block。

### 8.2 Category

Category 被定义为编辑器中的一个模块分类，原型如下所示：

```typescript
interface CategoryPrototype {
    categoryId: string;
    messageId: string;
    color: string;
}
```

```typescript
function addCategory(category: CategoryPrototype): void;
```

效果：将 `category` 添加到编辑器中。

```typescript
function removeCategory(categoryId: string): void;
```

效果：从编辑器中删除 id 为 `categoryId` 的 Category。

### 8.3 全局函数

全局函数可以在扩展之间被互相调用，达到扩展间交互的作用。

```typescript
function registerGlobalFunction(name: string, func: Function): void;
```

效果：将函数 `func` 以 `name` 为名字注册为全局函数。

```typescript
function unregisterGlobalFunction(name: string): void;
```

效果：删除名为 `name` 的全局函数。

```typescript
function callGlobalFunction(name: string, ...args: any[]): any;
```

效果：调用全局函数 `name`，并把 `...args` 作为参数传入。
返回：对应函数的返回值。

### 8.4 工具函数

```typescript
function migrateChangeBlock(targets: Object, srcBlockId: string, dstBlockId: string): void;
```

效果：将项目数据 `targets` 中全部的 opcode 为 `srcBlockId` 的 Block 的 opcode 替换为 `dstBlockId`。

### 8.5 编辑器实例

扩展可以获取编辑器的一些实例，通过直接修改或调用实例的方式完成更为复杂的功能，但对于实例的所有操作的结果完全取决于编辑器的实现，其稳定性和可行性不被保证，在版本间可能存在变动。

```typescript
function getVmInstance(): Object;
function getGuiDocument(): Document;
function getGuiInstance(): Object;
function getBlockInstance(): Object;
```

### 8.6 舞台

```typescript
function getStageCanvas(): HTMLCanvasElement;
```

效果：获取舞台 canvas 实例。请注意，如果对该 canvas 对象调用 `getContext` 方法，`contextType` 必须为 `webgl`。

### 8.7 MigrationHelper

MigrationHelper 是一个用以快捷构建迁移链和项目版本迁移的工具类。

```typescript
class MigrationHelper {
    constructor(): void;
    addVersionMigration(srcVer: string, dstVer: string, migrationScript: Function): void;
    migrationFromVersion(srcVer: string, dstVer: string, projectData: Object): void;
}
```

```typescript
function addVersionMigration(srcVer: string, dstVer: string, migrationScript: Function): void;
```

效果：给当前的迁移链增加一个从 `srcVer` 到 `dstVer` 版本的迁移脚本，迁移时调用 `migrationScript` 以完成对项目的更改。

```typescript
function migrationFromVersion(srcVer: string, dstVer: string, projectData: Object): void;
```

备注：本函数暂时待定，之后会发生变更，请留意。
效果：根据当前的迁移链，将项目 `projectData` 从版本 `srcVer` 迁移到 `dstVer`。迁移的方式是根据之前的构造的版本之间的迁移图，寻找一条最短路，并按序执行响应迁移脚本。

## 9 标准迁移和兼容性

这是第一个标准版本。

## 10 致谢

感谢下面的人为 ClipCC 扩展的设计给出的宝贵意见（排名按字母顺序）：
- Alex Cui
- SinanGentoo
- Sparrow He
- SteveXMH
