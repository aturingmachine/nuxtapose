# nuxt-gen

_nuxt-gen is in beta_

> cli to generate templated nuxt files

## Supported Templates

### Components

#### Typescript

##### Class Based

Class based components using `nuxt-property-decorator`

##### Options API

Options API using `Vue.extend`

### Vuex Stores

#### Typescript

##### Modules Based

Simple Vuex Store using `GetterTree`, `MutationTree`, and `ActionTree`

### Vuex Modules

### Typescript

Vuex Store Module placed in its own subdirectory and broken up into separate files. The Modules pattern currently only supports output using `GetterTree`, `MutationTree`, and `ActionTree`.