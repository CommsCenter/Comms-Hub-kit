# Lists

List component renders selected `itemComponent` for every item in `contents` array.

The most basic list components (bootstrap, flex, and grid) are already present in the Pagebuilder.

## Runtime

```
<a-parent>
  <YOUR-LIST-COMPONENT :action="action"></YOUR-LIST-COMPONENT>
</a-parent>
```

## Example

A default list, styleable from Pagebuilder.

```
<template>
  <!-- apply CSS classes from pagebuilder -->
  <div :class="templateClass">
  
      <!-- IMPORTANT: render all contents with the template selected by the user -->
      <component v-for="(content, i, index) in subcontents"
                 :is="itemComponent"
                 :content="content"
                 :key="content.id"
                 :index="i"
                 :action="myAction"></component>
                 
  </div>
</template>

<script>
export default {
  mixins: [CommsHub.list],
}
</script>
```

## Mixin `CommsHub.list`

Provides basic properties in templates.

- props
    - `contents` array
    - `action`
- data
    - `myAction` object
    - `capabilities` object
- computed
    - `subactions` array
    - `content` object
    - `subcontents` array
    -
    - `listComponent` string
    -
    - `templateClass` string
    - `hasMediaGrid` bool
    - `mediaGridClass` string

## Default lists

- `bootstrap` - bootstrap v2 - col-xx-yy
- `grid` - by number of items or width
- `no-grid` - item defines elements row/column flow

## All lists

See [all lists on Comms Hub](https://hub.comms.dev/)
