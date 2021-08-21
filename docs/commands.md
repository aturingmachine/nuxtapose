---
sidebar: auto
prev: ./config.md
next: ./options.md
tags: 
  - commands
  - generate
---
# Commands

## Generate

### Usage

```sh
nuxtapose generate|g <template-type> <output-path>
```

`output-path` should *not* include the base output directory of the template. Output Paths with a trailing slash (i.e. `dir/my-component/`) will create a sub-directory of the same name containing the generated files:

```
components/
  - dir/
    - my-component/
      - my-component.vue
      - my-component.spec.ts
```

### Supported Templates

> nuxtapose currently only supports Typescript projects, Javascript support is coming soon

| template    | output dir      | file type | notes                                                          |
|-------------|-----------------|-----------|----------------------------------------------------------------|
| `c|component` | `components/`   | vue       |                                                                |
| `p|page`      | `pages/`        | vue       |                                                                |
| `l|layout`    | `layouts/`      | vue       | Adds `layout` suffix to provided name                          |
| `v|vuex`      | `store/`        | TS/JS     |                                                                |
| `mod|module`    | `store/<name>/` | TS/JS     | Generates a file each for getters, setters, actions, and state |

### Options

- `--confirm, -c`
  - equivalent to using `"confirmChanges": "all"` in your [`.nuxtaposerc.json`](./config.md)