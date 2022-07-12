# comms.json

Here's a minimum required version for your `comms.json` file. You need to create a Vendor and Share on the Hub to
acquire their identifiers. The file will be validated on upload and all data must match to prevent errors.

```
{
    share: {
        type: "item", # one of allowed share types
        vendor: "vendor-identifier", # your Vendor identifier on Comms Hub
        identifier: "share-identifier", # your Share identifier on Comms Hub 
        version: "0.0.1",
    },
    entrypoint: "item-foo.js" # main .js file from your build
}
```

## Settings

You can add different settings to your shares. They must be defined in `comms.json` so they can be rendered in the
Pagebuilder.

Available property types are:

- `text` - text, up to 255 characters
- `html` - html, up to 1024 characters
- `number` - negative or positive integer
- `decimal` - decimal/float
- `color` - hex color
- `select:single` - dropdown with single select
- `select:multiple` - dropdown with multiple selects
- `checkbox` - true or false
- `unit` - define allowed units

Updated `comms.json` looks like:

```
{
    ...
    "settings": {
        "someStyleSetting": {
            "type": "select:single",
            "required": true,
            "default": "option-two",
            "options": {
                "option-one": "First style",
                "option-two": "Second style"
            }
        },
        "someWidthSetting": {
            "type": "unit",
            "required": true,
            "default": "2px",
            "settings": {
                "units": ["px", "rem"]
            }
        },
    }
}
```

You can access settings in templates under the `action.settings.someStyleSetting` data/prop.
