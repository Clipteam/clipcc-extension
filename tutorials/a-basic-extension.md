After configuring the workspace directory, it's time for us to create a simple extension.

## Configure your extension

Open `src/info.json`, write the code below.
```json
{
    "id": "your.extension.id",
    "author": "Your name",
    "version": "0.1.0",
    "icon": "assets/icon.jpg",
    "inset_icon": "assets/inset_icon.svg",
    "api": 1
}
```

Here are the meanings of the keys in it:

**id**: Your unique extension id. We recommended that the ID should be named in the form `author.id`, such as `clipteam.devtools`.

**author**: Your name. It can be set as a string or an array of string.

**version**: 
