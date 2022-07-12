# Layouts

Every page is by in the default layout component `pckg-app` with html attribute `data-frontend`. Default layout renders
3 positions (`header`, `content` and `footer`) while custom layouts can add more positions (such as `sidebar`).

## Runtime

```
...
<body class="page-{$route.slug} scroll|no-scroll logged-{out|in}">
  <div id="vue-app" data-frontend-app>
      <!-- loader indicator component -->
      <!-- header component and header offset/placeholder element -->
      
      <!-- this is where and how your LAYOUT is rendered -->
      <YOUR-LAYOUT></YOUR-LAYOUT>

      <!-- modals, notifications -->      
  </div>
  
  <!-- footer assets -->
</body>
```

## Example

An example for 4-sections layout that can be repositioned with CSS.

```
<template>
  <div class="pb-sided-layout">

      <pb-position tag="header" name="header"></pckg-position>
      
      <pb-position tag="main" name="content"></pckg-position>
      
      <footer>
          <component v-for="action in $store.getters.groupedRootElements.footer"
                     :action-id="action.id"
                     :is="action.component"
                     :key="action.id"></component>
      </footer>
      
  </div>
</template>

<script>
export default {
  mixins: [CommsHub.layout],
}
</script>
```

## Mixin `CommsHub.layout`

Provides basic properties for all templates.

- computed
    - `groupedActions` array
    - `groupedRootElements` object

## comms.json

`layout` share type additional properties are:

- `slots` - object with available slots in the Page builder

Updated `comms.json` looks like:

```
{
    ...
    "layout": {
        "slots": {
            "header": "Header",
            "content": "Content",
            "footer": "Footer",
            "sidebar": "Sidebar"
        }
    }
}
```

## All layouts

See [all layouts on Comms Hub](https://hub.comms.dev/)
