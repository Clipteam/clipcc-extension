There are two ways of adding `clipcc-extension` to a project;
1. (**Recommended**) Use [CLI](#CLI) to generate a project
2. Install it using [npm/yarn](#npm/yarn)

## CLI
ClipCC provides a official CLI for quickly creating an extension project. You can easily generate an project in the following steps.

First, you should install `clipcc-extension-cli` as a global package. The package will automatically add a binary named `ccext-cli`.

```bash
npm install clipcc-extension-cli -g
# OR
yarn global add clipcc-extension-cli
```

Then create a node project in an empty directory.

```bash
npm init
# OR
yarn init
```

Generate the project with CLI.

```bash
ccext-cli -g
```

Install all the dependencies.
```bash
npm install
# OR
yarn install
```

## npm/yarn
```bash
npm install clipcc-extension
# OR
yarn add clipcc-extension
```

Config your own webpack environment or use other pack tools.
