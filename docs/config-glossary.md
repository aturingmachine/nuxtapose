---
sidebar: auto
prev: ./config.md
tags: 
  - config
  - configuration
  - api
  - options
---
# Configuration Glossary

## `component`

Sets the template to use for **Components**, **Pages**, and **Layouts**

- options: `'class-based' | 'options-api' | string`
  - Non-enum values are treated as custom template paths

## `confirmChanges`

Set under what circumstances nuxtapose should ask for confirmation before writing a file.

- options: `'never' | 'overwrite-only' | 'always'`
  - `never` - Never ask for confirmation to write a file
  - `overwrite-only` - Only ask for confirmation if a file of the same name already exists **(default)**
  - `always` - Ask for confirmation before writing any file

## `module`

> [Nuxt Vuex Module Sub-Directories](https://nuxtjs.org/docs/2.x/directory-structure/store#example-folder-structure)

Set the template to use for **Vuex Module Sub-Directories**.

- options: `'modules'`

## `reportLevel`

Controls verbosity of after-run reporting.

- options: `'all' | 'completed-only' | 'none'`
  - `all` - Report all events **(default)**
  - `completed-only` - Only report events for operations that completed
  - `none` - Suppress the after-run report entirely

## `srcDir`

Set the directory under which nuxtapose should generate all templates. This should match the [`srcDir`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir) option in your Nuxt config.

nuxtapose will attempt to automatically determine this value by reading your Nuxt Configuration file during the Configuration Wizard.

- type: `string`

## `vuex`

Sets the template to use for **Vuex Store Files**.

- options: `'modules' | string`
  - Non-enum values are treated as custom template paths
