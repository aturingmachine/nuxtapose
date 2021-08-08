import { Templates } from '.'
import { TypeScriptVuexTypes } from '../models/config'

const moduleTemplate = {
  implementation: {
    '#[KEBAB_CASE]':
      "import { namespace as createModuleDecorator } from 'nuxt-property-decorator'\nimport type { GetterTree, MutationTree, ActionTree } from 'vuex'\n\nexport const namespace = '#[KEBAB_CASE]'\n\nexport const #[PASCAL_CASE]Store = createModuleDecorator(namespace)\n\nexport enum #[PASCAL_CASE]Status {\n  LOADING = 'LOADING',\n  SUCCESS = 'SUCCESS',\n  ERROR = 'ERROR',\n}\n\nexport enum #[PASCAL_CASE]GetterTypes {\n  Get#[PASCAL_CASE] = 'Get#[PASCAL_CASE]',\n}\n\nexport enum #[PASCAL_CASE]MutationTypes {\n  Set#[PASCAL_CASE]Loading = 'Set#[PASCAL_CASE]Loading',\n}\n\nexport enum #[PASCAL_CASE]ActionTypes {\n  Get#[PASCAL_CASE] = 'Get#[PASCAL_CASE]',\n}\n\nexport interface #[PASCAL_CASE]State {\n  records: {\n    [key: number]: {\n      status: undefined;\n      record: Record<string, unknown>; // This should be the actual model you are using\n    }\n  }\n}\n\nexport const state = (): #[PASCAL_CASE]State => ({\n  records: {}\n})\n\nexport const getters: GetterTree<#[PASCAL_CASE]State, RootState> = {\n  [#[PASCAL_CASE]GetterTypes.Get#[PASCAL_CASE]]: (state: #[PASCAL_CASE]State) => state.records,\n}\n\nexport const mutations: MutationTree<#[PASCAL_CASE]State> = {\n  [#[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading]: (state: #[PASCAL_CASE]State, payload) => {\n    const updates = Object.fromEntries(\n      payload.ids.map((id:number) =>\n        [id, { status: #[PASCAL_CASE]Status.LOADING, record: undefined }]\n      )\n    )\n    state.records = {\n      ...state.records,\n      ...updates\n    }\n  }\n}\n\nexport const actions: ActionTree<#[PASCAL_CASE]State, RootState> = {\n  [#[PASCAL_CASE]ActionTypes.Get#[PASCAL_CASE]] ({ commit }, id: number) {\n    commit({\n      type: #[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading,\n      ids: [id]\n    })\n    // Make a request or something to get the data and commit it\n    // as a Set#[PASCAL_CASE]Success or something\n  }\n}\n",
  },
  spec: {
    '#[KEBAB_CASE]':
      "import {\n  actions,\n  #[PASCAL_CASE]ActionTypes,\n  #[PASCAL_CASE]GettersTypes,\n  #[PASCAL_CASE]MutationTypes,\n  #[PASCAL_CASE]State,\n  #[PASCAL_CASE]Status,\n  getters,\n  mutations,\n  state as initState,\n} from '~/store/#[RAW_NAME]'\n\ndescribe('#[SENTENCE_CASE]', () => {\n  describe('State', () => {\n    it('should have an initial state', () => {\n      const intialState = initState()\n\n      expect(initialState.records).toEqual({})\n    })\n  })\n\n  describe('Getters', () => {\n    let state: #[PASCAL_CASE]State\n\n    beforeEach(() => {\n      state = initState()\n    })\n\n    describe('Get#[PASCAL_CASE]', () => {\n      beforeEach(() => {\n        // Create record\n      })\n\n      it('should return the state', () => {\n        expect(getters[#[PASCAL_CASE]GettersTypes.Get#[PASCAL_CASE]]).toEqual({})\n      })\n    })\n  })\n\n  describe('Mutations', () => {\n    let state: #[PASCAL_CASE]State\n\n    beforeEach(() => {\n      state = initState()\n    })\n\n    describe('Set#[PASCAL_CASE]Loading', () => {\n      it('should set records to undefined and status to loading', () => {\n        mutations[#[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading](state, [828])\n\n        expect(state.records[828].record).toBeUndefined()\n        expect(state.records[828].status).toEqual(#[PASCAL_CASE]Status.LOADING)\n      })\n    })\n  })\n\n  describe('Actions', () => {\n    //\n  })\n})",
  },
}

const StoreTemplates: Templates = {
  ts: {
    [TypeScriptVuexTypes.Module]: moduleTemplate,
  },
  js: {},
}

export default StoreTemplates
