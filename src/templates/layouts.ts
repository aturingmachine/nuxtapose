import { Templates } from '.'
import { TypeScriptComponentTypes } from '../models/config'

const classBasedTemplate = {
  implementation: {
    '#[KEBAB_CASE]':
      '<template>\n  <div class="#[KEBAB_CASE]-wrapper">\n    <nuxt />\n  </div>\n</template>\n\n<script lang="ts">\nimport { Component, Vue, Prop } from \'nuxt-property-decorator\'\n\n@Component({})\nexport default class #[PASCAL_CASE] extends Vue {\n\n  mounted(): void {\n    //\n  }\n}\n</script>\n\n<style scoped lang="scss">\n.#[KEBAB_CASE]-wrapper {}\n</style>\n',
  },
  spec: {
    '#[KEBAB_CASE]':
      "import { Wrapper, shallowMount } from '@vue/test-utils'\nimport #[PASCAL_CASE] from './#[KEBAB_CASE].vue'\n\ndescribe('#[SENTENCE_CASE]', () => {\n  let wrapper: Wrapper<#[PASCAL_CASE]>\n\n  beforeEach(() => {\n    mountWrapper()\n  })\n\n  describe('Template', () => {})\n  \n  describe('Getters', () => {})\n\n  describe('Class Methods', () => {})\n\n  describe('Watchers', () => {})\n\n  function mountWrapper(): void {\n    const propsData = {}\n\n    wrapper = shallowMount(#[PASCAL_CASE], { propsData })\n  }\n})",
  },
}

const optionsApiTemplate = {
  implementation: {
    '#[KEBAB_CASE]':
      '<template>\n  <div class="#[KEBAB_CASE]-wrapper">\n    <nuxt />\n  </div>\n</template>\n\n<script lang="ts">\nimport Vue, { PropType } from \'vue\'\n\nexport default Vue.extend({\n  name: \'#[PASCAL_CASE]\',\n\n  data: () => {\n    return {}\n  }\n})\n</script>\n\n<style scoped lang="scss">\n.#[KEBAB_CASE]-wrapper {}\n</style>\n',
  },
  spec: {
    '#[KEBAB_CASE]':
      "import { Wrapper, shallowMount } from '@vue/test-utils'\nimport #[PASCAL_CASE] from './#[KEBAB_CASE].vue'\n\ndescribe('#[SENTENCE_CASE]', () => {\n  let wrapper: Wrapper<#[PASCAL_CASE]>\n\n  beforeEach(() => {\n    mountWrapper()\n  })\n\n  desribe('Template', () => {})\n  \n  desribe('Getters', () => {})\n\n  desribe('Class Methods', () => {})\n\n  desribe('Watchers', () => {})\n\n  function mountWrapper(): void {\n    const propsData = {}\n\n    wrapper = shallowMount(#[PASCAL_CASE], { propsData })\n  }\n})",
  },
}

const LayoutTemplates: Templates = {
  ts: {
    [TypeScriptComponentTypes.ClassBased]: classBasedTemplate,
    [TypeScriptComponentTypes.OptionsApi]: optionsApiTemplate,
  },
  js: {},
}

export default LayoutTemplates
