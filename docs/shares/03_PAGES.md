# Pages (TBD)

Prefer to build some really custom pages that go above and beyond the page builder? You can build custom page with slots
that are populated from the pagebuilder.

## Runtime (TBD)

```
<some-layout-component>
    <some-content-slot>
        <YOUR-PAGE-COMPONENT></YOUR-PAGE-COMPONENT>
    </some-content-slot>
    <another-content-slot></some-content-slot>
</div>
```

## Example

```
<template>
<div>
    <pb-slot tag="div" name="bar" :action="action"></slot>
</div>
</template>

<script>
export default {
  mixins: [CommsHub.page],
}
</script>
```

## Mixin `CommsHub.page`

- $router?
- $route?
- routeParams? (as "resolved?")

## comms.json

`Page` share type does additional properties are:

- `slots` - object with available slots in the Page builder
- `resolve` - array with parameters resolved in the url - `packet`, `offer`, `category`, `unit`, `gallery`, `news`

Updated `comms.json` looks like:

```
{
    ...
    "page": {
        "slots": {
            "content": "Content",
            "header": "Header",
            "footer": "Footer"
        },
        "resolve": ["packet"]
    }
}
```

## All pages

See [all pages on Comms Hub](https://hub.comms.dev/)
