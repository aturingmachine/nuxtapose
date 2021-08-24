import { Source } from '../../src/templates'

export const mockTemplate = (): Source => ({
  implementation: {
    'NP_KEBAB_CASE-impl':
      'implementation\nNP_KEBAB_CASE\nNP_PASCAL_CASE\nNP_SENTENCE_CASE\nNP_RAW_NAME',
  },
  spec: {
    'NP_KEBAB_CASE-spec':
      'spec\nNP_KEBAB_CASE\nNP_PASCAL_CASE\nNP_SENTENCE_CASE\nNP_RAW_NAME',
  },
})
