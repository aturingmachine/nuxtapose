---
sidebar: auto
prev: ./options.md
tags:
  - custom
  - templates
  - template variables
---
# Custom Templates

In addition to the bundled templates nuxtapose supports using custom templates. These can be useful if your Nuxt project includes some custom boilerplate patterns, and you would like to leverage nuxtapose to the fullest.

Custom templates should be placed inside the `.nuxtapose/` directory in the root of your project. There are two ways to write custom templates:

- [Object Style](#object-style)
- [Directory Style](#directory-style)

## Object Style

Object Style is the more compact method of using Custom Templates. Templates are placed inside a file named as the preferred template name, `my-template.js` as the sole export.

```js
// .nuxtapose/my-template.js

module.exports = {
  implementation: {
    'NP_KEBAB_CASE-custom':
      '<template>\n  <div class="NP_KEBAB_CASE-custom-wrapper">\n  </div>\n</template>\n\n<script lang="ts">\nimport { Component, Vue, Prop } from \'nuxt-property-decorator\'\n\n@Component({})\nexport default class NP_PASCAL_CASE extends Vue {\n\n  mounted(): void {\n    //\n  }\n}\n</script>\n\n<style scoped lang="scss">\n.NP_KEBAB_CASE-wrapper {}\n</style>\n',
  },
  spec: {
    'NP_KEBAB_CASE-custom':
      "import { Wrapper, shallowMount } from '@vue/test-utils'\nimport NP_PASCAL_CASE from './NP_KEBAB_CASE.vue'\n\ndescribe('NP_SENTENCE_CASE', () => {\n  let wrapper: Wrapper<NP_PASCAL_CASE>\n\n  beforeEach(() => {\n    mountWrapper()\n  })\n\n  describe('Template', () => {})\n  \n  describe('Getters', () => {})\n\n  describe('Class Methods', () => {})\n\n  describe('Watchers', () => {})\n\n  function mountWrapper(): void {\n    const propsData = {}\n\n    wrapper = shallowMount(NP_PASCAL_CASE, { propsData })\n  }\n})",
  },
}
```

The `implementation` and `spec` objects use the filename as the key and the source code as the value. 

## Directory Style

Directory Style Templates are more verbose and easier to maintain. Create a subdirectory under your `.nuxtpose/` directory with the desired template name, as well as two inner directories `implementation/` and `spec/`. Under these directories you will place your templates.

### Example Directory Structure

```
.nuxtapose/
|
|- my-template/
   |
   |- implementation/
   |  |
   |  |- my-template.vue
   |
   |- spec/
   |  |
   |  |- my-template.spec.ts
```

### Example Template File

```vue
<template>
  <div class="NP_KEBAB_CASE-custom-wrapper">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class NP_PASCAL_CASE extends Vue {

  mounted(): void {
    //
  }
}
</script>

<style scoped lang="scss">
.NP_KEBAB_CASE-wrapper {}
</style>

```

## Template Variables

> Nuxtapose currently only supports expanding Template Variables if the original name is kebab-case

Template Variables allow you to inject the parsed name of the template into the source-code. Nuxtapose currently supports the following Template Variables:

- `NP_PASCAL_CASE` - Inject the name PascalCased
  - `my-component-name` -> `MyComponentName`
- `NP_KEBAB_CASE` - Inject the name kebab-cased
  - `my-component-name` -> `my-component-name`
- `NP_SENTENCE_CASE` - Inject the name Sentence Cased
  - `my-component-name` -> `My Component Name`
- `NP_RAW_NAME` - Inject the name as it is provided from the CLI
  - `my_component_name` -> `my_component_name`

### Templating File Names

Template Variables can also be used to generate file names, simply use the desired placeholder in the filename of the template, nuxtapose will handle the rest.

The template `NP_PASCAL_CASE-custom-name.vue` generating `my-component` will produce a `MyComponent-custom-name.vue`