# nuxtapose

_nuxtapose is in alpha and may be unstable or changing_

- [Installation](#installation)
- [Configuration](#configuration)
  - [Configuration Options](#configuration-fields)
- [Global CLI Options](#global-cli-options)
  - [Logging Levels](#logging-levels)
- Commands
  - [Generate](#generate-command)
- [Roadmap](#roadmap)

nuxtapose is a cli designed to do the repetitive work of Nuxt development for you.

```sh
# Create a new component file at 'log-details/log-info.vue' and a corresponding spec file
nuxtapose generate component log-details/log-info

# Generate a new page file at 'pages/faq.vue' and a corresponding spec file
nuxtapose generate page faq

# Generate a new vuex store file at `store/users.ts` and a corresponding spec file
nuxtapose generate vuex users
```

## Installation

```sh
npm install -g nuxtapose
```

## Configuration

nuxtapose can be configured via a `.nuxtaposerc.json` in the projects root directory. nuxtapose will also run a configuration wizard if it is run in a project without a `.nuxtaposerc.json`

### Configuration Fields

```js
{
  // Required Configuration
  "component": "class-based | options-api",
  "vuex": "modules | class-based",
  "module": "modules", // More options coming soon (tm)

  // Optional Configuration
  "confirmChanges": "never | overwrite-only | always",
  "reportLevel": "all | completed-only | none",
}
```

- `component`
  - `class-based`: generate components using the class based pattern
  - `options-api`: generate components using the options api
- `vuex`
  - `modules`: generate store files using GetterTree, ActionTree, and MutationTree
  - `class-based`: Currently unsupported
- `module`
  - `modules`: Generate a store as a module using GetterTree, ActionTree, and MutationTree
- `confirmChanges` - Default `overwrite-only`
  - `never`: never ask for confirmation before taking an action
  - `overwrite-only`: ask for confirmation if the action will overwrite a file
  - `always`: ask for confirmation before any action
- `reportLevel` - Default `all`
  - `all`: include all events in the run report
  - `completed-only`: only show events for actions that were completed
  - `none`: do not generate an after run report

## Global CLI Options

### Logging Levels

- `--debug, -d`
  - increases verbosity of logging
- `--quiet, -q`
  - supress all logs and after run reports
- `--verbose, -v`
  - equal to  `--debug` and `"reportLevel": "all"`

## Generate Command

Generate a new templated file. This is similar to the `ng generate` command.

- [Usage](#generate-usage)
- [Templates](#generate-templates)
- [CLI Options](#generate-cli-options)

### Generate Usage

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

### Generate Templates

> nuxtapose currently only supports Typescript projects, Javascript support is coming soon

| template    | output dir      | file type | notes                                                          |
|-------------|-----------------|-----------|----------------------------------------------------------------|
| `c\|component` | `components/`   | vue       |                                                                |
| `p\|page`      | `pages/`        | vue       |                                                                |
| `l\|layout`    | `layouts/`      | vue       | Adds `layout` suffix to provided name                          |
| `v\|vuex`      | `store/`        | TS/JS     |                                                                |
| `mod\|module`    | `store/<name>/` | TS/JS     | Generates a file each for getters, setters, actions, and state |

### Generate CLI Options

- `--confirm, -c`
  - equivalent to using `"confirmChanges": "all"`


## Roadmap

Features that I am hoping to implement in the near future:

- custom templates
- storybook story templating for components
- javascript templates
- middleware templates
- programmatic API