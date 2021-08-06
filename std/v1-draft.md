本文是 ClipCC 扩展标准（v1，草案）文档，所有扩展必须遵循本文档所规定内容。

## 1 标准更新与适用版本

|标准版本|API 版本|更新日期|状态|备注|
|:-:|:-:|:-:|:-:|:-:|
|v1|0.x|2021/7/17|草案||

标准版本为扩展 API 遵循的标准，API 版本为对应的 clipcc-extension 包版本。

## 2 定义

**编辑器（editor）**：特指 ClipCC 编辑器

**扩展（extension）**：指能够扩展编辑器功能的文件，这里特指 `*.ccx` 格式的扩展。

**警告（warning）**：指通过 `console.warn` 等形式给出的警告信息。

**错误（error）**：指通过 `throw` 或 `console.err` 形式给出的错误信息。

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
    "api": 1
}
```

字段说明:

**id**：插件的ID，必须是唯一的，推荐的写法为 `作者ID.插件名`，其中整个 ID 必须满足 `[a-zA-Z0-9_-]+`。不推荐使用多个 `.` 分割 ID，如有必要，每个 `.` 之间必须至少有一个合法的字符。

**author**：作者名，可以是一个字符串，或者一个列表。

**version**：版本。

**icon**：插件头图。

**inset_icon**：插件小图标。

**api**：API 版本标识（标准版本）。

## 5 加载与执行

### 5.1 入口文件

在扩展文件内部根目录下的 `main.js` 为扩展的入口文件，在扩展被加载入编辑器时，该文件将被载入编辑器并执行。

入口文件必须显式导出一个类，该类应当实现 `onInit` 和 `onUninit` 方法（但不是强制的），以响应加载和卸载事件。

下面是一个基于 CommonJS 规范的扩展最小实现：

```javascript
class HelloExtension {
    onInit() { /* ... */}
    onUninit() { /* ... */ }
}

module.exports = HelloExtension;
```

### 5.2 生命周期

### 5.3 事件响应

扩展响应一个具体事件通过编辑器直接调用插件的相关方法，如对于调用扩展 A 的 `onInit` 事件，即直接调用 `a.onInit()`，其中 `a` 表示扩展 A 的一个实例。

当扩展实例没有定义某一个事件的时候，编辑器调用该事件时不给出警告或错误，而应该跳过对其的调用。例如，如果某个扩展不存在 `onInit` 事件，那么这个扩展也应当被正常加载，但不会响应 `onInit` 事件。

下面是扩展的全部事件及对其的解释：

**onInit()**：当插件被启用时触发。在这个事件中，扩展应当完成对编辑器内容的添加。

**onMigration(data)**：当编辑器在加载一个项目时，触发这个事件。参数 `data` 表示当前项目的数据。在这个事件中，扩展应当完成对旧版本项目的替换，以保证其适合新版本。请注意，如果原项目和当前环境完全一致，这个事件依然会被触发，此时扩展不应当修改该项目。扩展中的这一事件应当提供判断，保证版本迁移的正确性。

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

## 7 接口和定义

### 7.1 Block

Block 被定义为编辑器中的一个模块，原型如下所示：

```typescript
class BlockPrototype {
    opcode: string;
    type: BlockType;
    msg: string;
    categoryId: string;
    func: Function;
    param: ParameterPrototype[];
}

enum BlockType {
    COMMAND, REPORTER, BOOLEAN, BRANCH, HAT
}

class ParameterPrototype {
    type: ParameterType;
    default: any;
    shadow: ShadowPrototype;
}

enum ParameterType {
    NUMBER, STRING, BOOLEAN, ANY,
    COLOR
}

class ShadowPrototype {
    type: string;
    fieldName: string;
}
```

```typescript
function addBlock(block: BlockPrototype): void;
```

效果：将 `block` 添加到编辑器中。

```typescript
function removeBlock(opcode: string): void;
```

效果：从编辑器中删除 opcode 为 `opcode` 的 Block。

### 7.2 Category

Category 被定义为编辑器中的一个模块分类，原型如下所示：

```typescript
class CategoryPrototype {
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

### 7.3 Global Function

Global Function 即全局函数。

```typescript
function registerGlobalFunction(name: string, func: Function): void;
```

效果：将函数 `func` 以 `name` 为名字注册为全局函数。

```typescript
function callGlobalFunction(name: string, ...args: any[]): any;
```

效果：调用全局函数 `name`，并把 `...args` 作为参数传入。
返回：对应函数的返回值。

## 8 标准迁移和兼容性

这是第一个标准版本。

## 9 鸣谢

感谢下面的人为 ClipCC 扩展的设计给出的宝贵意见（排名按字母顺序）：
- Alex Cui
- SinanGentoo
- Sparrow He
- SteveXMH

格式参考：
- ISO/IEC 14882:2020
