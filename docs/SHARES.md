# Shares

# Develop

See [./shares/](./shares/) for detailed info about every share type.

## Mixins

### Vue mixins for shares

All share mixins (`CommsHub.item`, `CommsHub.list`, `CommsHub.component`, `CommsHub.layout`, `CommsHub.page`) expose `settings(name)` method.

### Global Vue mixins

Some mixins are globally available in all components:

- `pckgTranslations`
    - exposes method `__(slug)` - returns a Microcontent from Comms store
- `pckgCdn`
    - exposes method `cdn(url)` - transforms image URL and serves it from CDN

### Translations

When you use the `pckgTranslations` mixin with `__` helper, we recommend you to define at least English defaults. See
example in [./headers/](./07_headers/). Translations will be registered under `hub.shareType.vendorName.shareIdentifier`
namespace.

## Capabilities

Shares can require or define different capabilities:

- items can require lists to have specific capabilities for designs to be rendered correctly (such as `grid`
  or `no-grid`)
- capabilities `contents`, `content` and `content: [...fields]` adds classic content fields to the template
- add `subactions` capability to allow component to have children
- add `slots` capability and define available slots in Page builder for dynamic components

```vue

<script>
export default {
    // ...
    capabilities: ['no-grid'],
}
</script>
```

## Content

You can create single-, two-, or multi-level structure with generic content. Content cannot be linked to a page, layout
or header - you can use slots and render a content component there.

Available content fields:

- `id` number
- `created_at` datetime
- `updated_at` datetime
- `order` number
- `title` string
- `subtitle` string
- `description` string (HTML)
- `content` string (HTML)
- `picture` string - relative url, use cdn(content.picture), or cdn(imageResize(content.picture, 'c', '200x200'))
- `video` string - youtube or vimeo video
- `icon` string - FA icon
- `url` string - relative or absolute URL

# Advanced components (node_modules)

If your component depends on some library, you'll need to create the standard `package.json`, install your dependencies.

# Content shares

_Shares that do not need to be built (emails, microcontent, and documents) should be located in the root of the .zip
file._
