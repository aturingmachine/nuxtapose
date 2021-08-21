---
sidebar: auto
prev: ./getting-started.md
next: ./commands.md
tags: 
  - config
  - configuration
---
# Configuration

The behavior of nuxtapose can be controlled via the `.nuxtaposerc.json`

## Example Config

```json
{
  "component": "custom-comp",
  "vuex": "modules",
  "module": "modules",
  "confirmChanges": "overwrite-only",
  "reportLevel": "none"
}
```

## Template Configuration

### Custom Templates

Custom templates can be provided to the configuration by passing the path to the config as a string.

[Custom Templating](/custom-templates.md)

### `component`

Sets the template type for `Components`, `Pages`, and `Layouts`.

#### Options

- Typescript
  - `class-based`
  - `options-api`
- Javascript
  - Coming Soon

### `vuex`

Sets the template type for new Vuex Store files.

#### Options

- Typescript
  - `modules`
  - `class-based` (Coming Soon)
- Javascript
  - Coming Soon

### `module`

Sets template type for Vuex Modules. Vuex Modules generate sub directories under the `store/` directory and separate their `actions`, `mutations`, `getters`, and `state` to different files.

#### Options

- Typescript
  - `modules`
- Javascript
  - Coming Soon

## Runtime Configuration

### `confirmChanges`

Sets when nuxtapose should ask for confirmation to write a file.

#### Options

- `never` - Never ask for confirmation to write a file
- `overwrite-only` - Only ask for confirmation if a file of the same name already exists **(default)**
- `always` - Ask for confirmation before writing any file

### `reportLevel`

Controls how verbose nuxtapose should be in its after-run reports.

#### Options

- `all` - Report all events **(default)**
- `completed-only` - Only report events for operations that completed
- `none` - Suppress the after-run report entirely