# Components

Custom components can be anything. They can be added to the page as normal action with pagebuilder.

Few examples:

- counter
- calendar
- graph
- game
- slider

## Runtime

```
<a-parent>
    <!-- this is where and how your COMPONENT is rendered -->
    <YOUR-COMPONENT :action=""></YOUR-COMPONENT>
</a-parent>
```

## Example

```
<template>
<div>
This is a standard Vue v2 SFC. You can reuse `content` object, or you can define custom `settings` in `comms.json`
</div>
</template>

<script>
export default {
  mixins: [CommsHub.component],
}
</script>
```

## Mixin `CommsHub.component`

- props:
- `action` object
- `content` object

## comms.json

`component` share type additional properties are:

- `slots` - object with available slots in the Page builder

Updated `comms.json` looks like:

```
{
    ...
    "component": {
        "slots": {
            "header": "Header",
            "content": "Content",
            "footer": "Footer",
            "sidebar": "Sidebar"
        }
    }
}
```

## All components

See [all components on Comms Hub](https://hub.comms.dev/)
