(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{377:function(t,e,a){"use strict";a.r(e);var s=a(45),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"custom-templates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#custom-templates"}},[t._v("#")]),t._v(" Custom Templates")]),t._v(" "),a("p",[t._v("In addition to the bundled templates nuxtapose supports using custom templates. These can be useful if your Nuxt project includes some custom boilerplate patterns, and you would like to leverage nuxtapose to the fullest.")]),t._v(" "),a("p",[t._v("Custom templates should be placed inside the "),a("code",[t._v(".nuxtapose/")]),t._v(" directory in the root of your project. There are two ways to write custom templates:")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#object-style"}},[t._v("Object Style")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#directory-style"}},[t._v("Directory Style")])])]),t._v(" "),a("h2",{attrs:{id:"object-style"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#object-style"}},[t._v("#")]),t._v(" Object Style")]),t._v(" "),a("p",[t._v("Object Style is the more compact method of using Custom Templates. Templates are placed inside a file named as the preferred template name, "),a("code",[t._v("my-template.js")]),t._v(" as the sole export.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// .nuxtapose/my-template.js")]),t._v("\n\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  implementation"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'NP_KEBAB_CASE-custom'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'<template>\\n  <div class="NP_KEBAB_CASE-custom-wrapper">\\n  </div>\\n</template>\\n\\n<script lang="ts">\\nimport { Component, Vue, Prop } from \\\'nuxt-property-decorator\\\'\\n\\n@Component({})\\nexport default class NP_PASCAL_CASE extends Vue {\\n\\n  mounted(): void {\\n    //\\n  }\\n}\\n<\/script>\\n\\n<style scoped lang="scss">\\n.NP_KEBAB_CASE-wrapper {}\\n</style>\\n\'')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  spec"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'NP_KEBAB_CASE-custom'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"import { Wrapper, shallowMount } from '@vue/test-utils'\\nimport NP_PASCAL_CASE from './NP_KEBAB_CASE.vue'\\n\\ndescribe('NP_SENTENCE_CASE', () => {\\n  let wrapper: Wrapper<NP_PASCAL_CASE>\\n\\n  beforeEach(() => {\\n    mountWrapper()\\n  })\\n\\n  describe('Template', () => {})\\n  \\n  describe('Getters', () => {})\\n\\n  describe('Class Methods', () => {})\\n\\n  describe('Watchers', () => {})\\n\\n  function mountWrapper(): void {\\n    const propsData = {}\\n\\n    wrapper = shallowMount(NP_PASCAL_CASE, { propsData })\\n  }\\n})\"")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("implementation")]),t._v(" and "),a("code",[t._v("spec")]),t._v(" objects use the filename as the key and the source code as the value.")]),t._v(" "),a("h2",{attrs:{id:"directory-style"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#directory-style"}},[t._v("#")]),t._v(" Directory Style")]),t._v(" "),a("p",[t._v("Directory Style Templates are more verbose and easier to maintain. Create a subdirectory under your "),a("code",[t._v(".nuxtpose/")]),t._v(" directory with the desired template name, as well as two inner directories "),a("code",[t._v("implementation/")]),t._v(" and "),a("code",[t._v("spec/")]),t._v(". Under these directories you will place your templates.")]),t._v(" "),a("h3",{attrs:{id:"example-directory-structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-directory-structure"}},[t._v("#")]),t._v(" Example Directory Structure")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(".nuxtapose/\n|\n|- my-template/\n   |\n   |- implementation/\n   |  |\n   |  |- my-template.vue\n   |\n   |- spec/\n   |  |\n   |  |- my-template.spec.ts\n")])])]),a("h3",{attrs:{id:"example-template-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-template-file"}},[t._v("#")]),t._v(" Example Template File")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("NP_KEBAB_CASE-custom-wrapper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ts"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Component"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Prop "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'nuxt-property-decorator'")]),t._v("\n\n@"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Component")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("NP_PASCAL_CASE")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mounted")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("scoped")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("scss"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".NP_KEBAB_CASE-wrapper")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n")])])]),a("h2",{attrs:{id:"template-variables"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-variables"}},[t._v("#")]),t._v(" Template Variables")]),t._v(" "),a("blockquote",[a("p",[t._v("Nuxtapose currently only supports expanding Template Variables if the original name is kebab-case")])]),t._v(" "),a("p",[t._v("Template Variables allow you to inject the parsed name of the template into the source-code. Nuxtapose currently supports the following Template Variables:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("NP_PASCAL_CASE")]),t._v(" - Inject the name PascalCased\n"),a("ul",[a("li",[a("code",[t._v("my-component-name")]),t._v(" -> "),a("code",[t._v("MyComponentName")])])])]),t._v(" "),a("li",[a("code",[t._v("NP_KEBAB_CASE")]),t._v(" - Inject the name kebab-cased\n"),a("ul",[a("li",[a("code",[t._v("my-component-name")]),t._v(" -> "),a("code",[t._v("my-component-name")])])])]),t._v(" "),a("li",[a("code",[t._v("NP_SENTENCE_CASE")]),t._v(" - Inject the name Sentence Cased\n"),a("ul",[a("li",[a("code",[t._v("my-component-name")]),t._v(" -> "),a("code",[t._v("My Component Name")])])])]),t._v(" "),a("li",[a("code",[t._v("NP_RAW_NAME")]),t._v(" - Inject the name as it is provided from the CLI\n"),a("ul",[a("li",[a("code",[t._v("my_component_name")]),t._v(" -> "),a("code",[t._v("my_component_name")])])])])]),t._v(" "),a("h3",{attrs:{id:"templating-file-names"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#templating-file-names"}},[t._v("#")]),t._v(" Templating File Names")]),t._v(" "),a("p",[t._v("Template Variables can also be used to generate file names, simply use the desired placeholder in the filename of the template, nuxtapose will handle the rest.")]),t._v(" "),a("p",[t._v("The template "),a("code",[t._v("NP_PASCAL_CASE-custom-name.vue")]),t._v(" generating "),a("code",[t._v("my-component")]),t._v(" will produce a "),a("code",[t._v("MyComponent-custom-name.vue")])])])}),[],!1,null,null,null);e.default=n.exports}}]);