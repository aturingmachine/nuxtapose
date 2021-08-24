import { Templates } from '.'
import { TypeScriptVuexTypes } from '../models/config'

const moduleTemplate = {
  implementation: {
    NP_KEBAB_CASE:
      "import { namespace as createModuleDecorator } from 'nuxt-property-decorator'\nimport type { GetterTree, MutationTree, ActionTree } from 'vuex'\n\nexport const namespace = 'NP_KEBAB_CASE'\n\nexport const NP_PASCAL_CASEStore = createModuleDecorator(namespace)\n\nexport enum NP_PASCAL_CASEStatus {\n  LOADING = 'LOADING',\n  SUCCESS = 'SUCCESS',\n  ERROR = 'ERROR',\n}\n\nexport enum NP_PASCAL_CASEGetterTypes {\n  GetNP_PASCAL_CASE = 'GetNP_PASCAL_CASE',\n}\n\nexport enum NP_PASCAL_CASEMutationTypes {\n  SetNP_PASCAL_CASELoading = 'SetNP_PASCAL_CASELoading',\n}\n\nexport enum NP_PASCAL_CASEActionTypes {\n  GetNP_PASCAL_CASE = 'GetNP_PASCAL_CASE',\n}\n\nexport interface NP_PASCAL_CASEState {\n  records: {\n    [key: number]: {\n      status: undefined;\n      record: Record<string, unknown>; // This should be the actual model you are using\n    }\n  }\n}\n\nexport const state = (): NP_PASCAL_CASEState => ({\n  records: {}\n})\n\nexport const getters: GetterTree<NP_PASCAL_CASEState, RootState> = {\n  [NP_PASCAL_CASEGetterTypes.GetNP_PASCAL_CASE]: (state: NP_PASCAL_CASEState) => state.records,\n}\n\nexport const mutations: MutationTree<NP_PASCAL_CASEState> = {\n  [NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading]: (state: NP_PASCAL_CASEState, payload) => {\n    const updates = Object.fromEntries(\n      payload.ids.map((id:number) =>\n        [id, { status: NP_PASCAL_CASEStatus.LOADING, record: undefined }]\n      )\n    )\n    state.records = {\n      ...state.records,\n      ...updates\n    }\n  }\n}\n\nexport const actions: ActionTree<NP_PASCAL_CASEState, RootState> = {\n  [NP_PASCAL_CASEActionTypes.GetNP_PASCAL_CASE] ({ commit }, id: number) {\n    commit({\n      type: NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading,\n      ids: [id]\n    })\n    // Make a request or something to get the data and commit it\n    // as a SetNP_PASCAL_CASESuccess or something\n  }\n}\n",
  },
  spec: {
    NP_KEBAB_CASE:
      "import {\n  actions,\n  NP_PASCAL_CASEActionTypes,\n  NP_PASCAL_CASEGettersTypes,\n  NP_PASCAL_CASEMutationTypes,\n  NP_PASCAL_CASEState,\n  NP_PASCAL_CASEStatus,\n  getters,\n  mutations,\n  state as initState,\n} from '~/store/NP_RAW_NAME'\n\ndescribe('NP_SENTENCE_CASE', () => {\n  describe('State', () => {\n    it('should have an initial state', () => {\n      const intialState = initState()\n\n      expect(initialState.records).toEqual({})\n    })\n  })\n\n  describe('Getters', () => {\n    let state: NP_PASCAL_CASEState\n\n    beforeEach(() => {\n      state = initState()\n    })\n\n    describe('GetNP_PASCAL_CASE', () => {\n      beforeEach(() => {\n        // Create record\n      })\n\n      it('should return the state', () => {\n        expect(getters[NP_PASCAL_CASEGettersTypes.GetNP_PASCAL_CASE]).toEqual({})\n      })\n    })\n  })\n\n  describe('Mutations', () => {\n    let state: NP_PASCAL_CASEState\n\n    beforeEach(() => {\n      state = initState()\n    })\n\n    describe('SetNP_PASCAL_CASELoading', () => {\n      it('should set records to undefined and status to loading', () => {\n        mutations[NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading](state, [828])\n\n        expect(state.records[828].record).toBeUndefined()\n        expect(state.records[828].status).toEqual(NP_PASCAL_CASEStatus.LOADING)\n      })\n    })\n  })\n\n  describe('Actions', () => {\n    //\n  })\n})",
  },
}

const StoreTemplates: Templates = {
  ts: {
    [TypeScriptVuexTypes.Module]: moduleTemplate,
  },
  js: {},
}

export default StoreTemplates
