# Headers

Headers usually display a logo (desktop and mobile version), menu (desktop and mobile version), and conditionally the
basket module or CTA button. Advanced headers feature multiple menus, custom sections or slots, search component, user
profile and more.

## Runtime

```
...
<body class="page-{$route.slug} scroll|no-scroll logged-{out|in}">
  <div id="vue-app" data-frontend-app>
      <!-- loader indicator component -->
      
      <!-- HEADER component and header offset/placeholder element -->
      <YOUR-HEADER></YOUR-HEADER>
      
      <!-- this is layout -->
      <some-layout></your-layout>

      <!-- modals, notifications -->      
  </div>
  
  <!-- footer assets -->
</body>
```

## Example

```
<template>
  <!-- apply scope class selected in settings -->
  <header :class="scopeClass"
      class="a-header header-vDefault --svSolid --svFixed"
      v-pb-header>
      
      <!-- linked logos -->
      <logo-mobile></logo-mobile>
      <logo-desktop></logo-desktop>
      
      <!-- basket/cart component -->
      <basket-header></basket-header>
      
      <!-- default navigation -->
      <frontend-main-nav></frontend-main-nav>
      
      <!-- hamburger icon -->
      <header-hamburger button-class="mobile-menu-trigger"></header-hamburger>

      <!-- navigation that triggers editing in page builder -->
      <nav :class="[scopeClass]" class="js-menu-mobile" v-pb-menu>
          <frontend-main-nav :compact="true"></frontend-main-nav>
      </nav>
      
      <!-- slots can be populated from the pagebuilder -->
      <pb-slot tag="div" name="bar" :action="action"></pb-slot>
      
  </header>

</template>

<script>
export default {
  mixins: [CommsHub.header],
}
</script>
```

## Mixin `CommsHub.header`

- computed
    - `slotElements` object (slot => elements)
    - `menus` object (slug => items)
    - `logos` object (device => logo)
    - `design` object (theme variables/settings)

## comms.json

`header` share type additional properties are:

- `slots` - object with available slots in the Page builder

Updated `comms.json` looks like:

```
{
    ...
    "header": {
        "slots": {
            "left": "Left",
            "menu": "Menu",
            "right": "Right"
        }
    }
}
```

## All headers

See [all headers on Comms Hub](https://hub.comms.dev/)
