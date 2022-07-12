# Demo

In this tutorial we'll build an __item__ share which can be used to display any content or listing. See fully featured
examples for all share types in [CommsCenter/commsexamples](https://github.com/commscenter/commsexamples) repository.

__Step 0: Set up Comms CLI and learn about basic commands__

See how to [set up](./SETUP.md) Comms CLI. Make sure you're using the latest version.

You will also need a free development store. You can list your stores with `comms-cli stores:list` or create a new
development store by running `comms-cli store:create`.

__Step 1: Bootstrap your new share__

We want every share to live in a dedicated space. So let's scaffold some files.

```
$ comms-cli hub:bootstrap
```

__Step 2: Install share to the store__

Though the share is empty, we want to notify the store about the new share so we can use it in Pagebuilder.

```
$ comms-cli hub:mock
```

__Step 3: Run local dev server__

Run a webpack dev server so you can preview your component.

```
$ comms-cli hub:serve
```

After you confirm the security exception for [https://0.0.0.0:9005](https://0.0.0.0:9005/autodiscover.js), you should be
able to preview your changes by visiting your dev store.

__Step 4: Write code__

There are different types of [shares](./shares/) (components) which all need to follow some rules due to different
requirements and features. Mixins `CommsHub.{Type}` are globally available and give components basic features on top of
which you can build, well, more features.

We've chosen to build a new _item_ share, so here's what we'll do:

- we have a `content` variable available from the `CommsHub.item` mixin
- serve resized image over CDN
- display internal or external link using `pb-link` component
- display microcontent

```html

<template>
    <div :style="{backgroundImage: cdn(imageResize(content.image, 'c', '800x800'))}">
        <pb-link v-if="content.url" :to="content.url">{{ __('frontend.btn.more') }}</pb-link>
    </div>
</template>

<!-- you can choose between css, less and saas -->
<style lang="less"></style>

<script>
    export default {
        mixins: [CommsHub.item],
    }
</script>
```

__Step 5: Document your component__

Update `comms.json` with reasonable values.

```json
{
  "share": {
    "type": "item",
    "identifier": "demo-item",
    "name": "Demo item",
    "version": "0.0.1a",
    "vendor": "comms"
  },
  "settings": {},
  "require": {}
}
```

_Tip: See [./CONFIG.md](./CONFIG.md) for more info about configuration options and features._

__Step 6: Publish your component__

Once you're happy with the result, run publish your work to Hub.

```
comms-cli hub:publish
```

__Step 7: Install your share to Library in your (production) Comms Store__

Open Theme settings > Library in your Comms store and add your new share to the Library. Or you can install the share
directly from the Comms Hub.

__Step 8: Use your share in Page builder__

You can now select your newly developed template in Page builder.
