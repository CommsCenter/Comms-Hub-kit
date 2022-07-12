# Items

Item component presents `content` which contains info about any content in CMS:

- `id`
- `title`
- `description`
- `content` (HTML)
- `url` (absolute or relative)
- `icon` (Font Awesome icon identifier)
- `image` (absolute or relative URL)
- `published_at` (datetime)
- optionally `price` for listings
- optionally `category` or `offer` objects
- optionally `_original` object with non-transformed original content (such as packet, category, news, gallery, ...)

## Runtime

### Listed

```
<some-list-component>
  <!-- this is where and how your ITEM component will be rendered -->
  <YOUR-ITEM-COMPONENT v-for="(content, i, index) in subcontents"
     :content="content"
     :key="content.id"
     :index="index"
     :action="myAction"></component>
</div>
```

### Single

```
<a-parent>
  <YOUR-ITEM-COMPONENT
     :content="content"
     :key="content.id"
     :index="null" <!-- no index prop will be passed -->
     :action="myAction"></YOUR-ITEM-COMPONENT>
</a-parent>
```

## Example

Resized image (`content.image`) that links to `content.url`.

```
<template>
    <!-- use pb-link component to handle internal routes and external redirects -->
    <pb-link :to="content.url" :title="content.title">
        <!-- serve image from cdn and resize it to 960px -->
        <img v-src="cdn(imageCache(content.image, 'w', '960'))"/>
    </pb-link>
</template>

<script>
export default {
  mixins: [CommsHub.item],
}
</script>
```

## Mixin `CommsHub.item`

Provides basic properties for all templates.

- props
  - `content` object -> data.`myContent`
  - `action` -> data.`myAction`
  - `index` number
  - `settings` object
- data
  - `tpl` string
  - `myAction` object
  - `myContent` object
- computed
  - `templateClass` + `magicTemplateClass` string
  - `contents` array

## All items

See [all items on Hub](https://hub.comms.dev/)
