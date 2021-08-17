import { Templates } from '.'
import { TypescriptVuexModuleTypes } from '../models/config'

const moduleTemplate = {
  implementation: {
    getters:
      "import type { GetterTree } from 'vuex'\nimport { RootState } from '~/store'\nimport { NP_PASCAL_CASEState, NP_PASCAL_CASEStatus } from './state'\n\nexport enum NP_PASCAL_CASEGetterTypes {\n  GetNP_PASCAL_CASE = 'GetNP_PASCAL_CASE',\n}\n\nconst getters: GetterTree<NP_PASCAL_CASEState, RootState> = {\n  [NP_PASCAL_CASEGetterTypes.GetNP_PASCAL_CASE]: (state: NP_PASCAL_CASEState) => state.records,\n}\n\nexport default getters\n",
    state:
      "export enum NP_PASCAL_CASEStatus {\n  LOADING = 'LOADING',\n  SUCCESS = 'SUCCESS',\n  ERROR = 'ERROR',\n}\n\nexport interface NP_PASCAL_CASEState {\n  records: {\n    [key: string]: Record<string | number, unknown>\n  }\n}\n\nconst state = (): NP_PASCAL_CASEState => ({ records: {} })\n\nexport default state\n",
    mutations:
      "import type { MutationTree } from 'vuex'\nimport { NP_PASCAL_CASEState, NP_PASCAL_CASEStatus } from './state'\n\nexport enum NP_PASCAL_CASEMutationTypes {\n  SetNP_PASCAL_CASELoading = 'SetNP_PASCAL_CASELoading',\n}\n\nconst mutations: MutationTree<NP_PASCAL_CASEState> = {\n  [NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading]: (state: NP_PASCAL_CASEState, payload) => {\n    const updates = Object.fromEntries(\n      payload.ids.map((id: number) => [\n        id,\n        { status: NP_PASCAL_CASEStatus.LOADING, record: undefined },\n      ])\n    )\n\n    state.records = {\n      ...state.records,\n      ...updates,\n    }\n  },\n}\n\nexport default mutations\n",
    actions:
      "import type { ActionTree } from 'vuex'\nimport { NP_PASCAL_CASEState, NP_PASCAL_CASEStatus } from './state'\n\nexport enum NP_PASCAL_CASEActionTypes {\n  GetNP_PASCAL_CASE = 'GetNP_PASCAL_CASE',\n}\n\nconst actions: ActionTree<NP_PASCAL_CASEState, RootState> = {\n  [NP_PASCAL_CASEActionTypes.GetNP_PASCAL_CASE]({ commit }, id: number) {\n    commit({\n      type: NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading,\n      ids: [id],\n    })\n\n    // Make a request or something to get the data and commit it\n    // as a SetNP_PASCAL_CASESuccess or something\n  },\n}\n",
  },
  spec: {
    'NP_KEBAB_CASE-state':
      "import initState from './state'\n\ndescribe('NP_SENTENCE_CASE State', () => {\n  it('should have an empty records map', () => {\n    const state = initState()\n\n    expect(state).toEqual({ records: {} })\n  })\n})\n",
    'NP_KEBAB_CASE-getters':
      "import { RootState } from '~/store'\nimport initState, { NP_PASCAL_CASEState } from './state'\nimport getters, { NP_PASCAL_CASEGettersTypes } from './getters'\n\ndescribe('NP_SENTENCE_CASE Getters', () => {\n  let state: NP_PASCAL_CASEState\n  let rootState: RootState\n\n  beforeEach(() => {\n    state = initState()\n    rootState = {} as RootState\n  })\n\n  describe('GetNP_PASCAL_CASE', () => {\n    it('should return undefined if the record does not exist', () => {\n      const result = getters.GetNP_PASCAL_CASE(state, getters, rootState, {})\n\n      expect(result).toBeUndefined()\n    })\n  })\n})\n",
    'NP_KEBAB_CASE-mutations':
      "import initState, { NP_PASCAL_CASEState } from './state'\nimport mutations from './mutations'\n\ndescribe('NP_SENTENCE_CASE Mutations', () => {\n  let state: HydratedFeedsState\n\n  beforeEach(() => {\n    state = initState()\n  })\n\n  describe('SetNP_PASCAL_CASELoading', () => {\n    it('should set the status to LOADING and the record to undefined', () => {\n      mutations.SetNP_PASCAL_CASELoading(state, { ids: [828] })\n\n      expect(state.records[828].status).toEqual(NP_PASCAL_CASEStatus.LOADING)\n    })\n  })\n})\n",
    'NP_KEBAB_CASE-actions':
      "import { RootState } from '~/store'\nimport initState, { NP_PASCAL_CASEState, NP_PASCAL_CASEStatus } from './state'\nimport actions from './actions'\nimport { NP_PASCAL_CASEMutationTypes } from './mutations'\n\ntype MockActionContext = { commit: jest.Mock; dispatch: jest.Mock }\n\ndescribe('NP_SENTENCE_CASE Actions', () => {\n  let context: MockActionContext\n\n  beforeEach(() => {\n    context = getMockActionContext(initState)\n  })\n\n  describe('GetNP_PASCAL_CASE', () => {\n    describe('Early Exits', () => {\n      it('should SetNP_PASCAL_CASELoading if an existing record has status error', async () => {\n        context.state.records[828] = {}\n        context.state.records[828].status = NP_PASCAL_CASEsStatus.ERROR\n\n        actions.GetNP_PASCAL_CASE.call(store, context, feed)\n\n        expect(context.commit).toHaveBeenCalledWith(\n          NP_PASCAL_CASEMutationTypes.SetNP_PASCAL_CASELoading,\n          828\n        )\n      })\n    })\n  })\n\n  function getMockActionContext(): MockActionContext {\n    return {\n      dispatch: jest.fn(),\n      commit: jest.fn(),\n      state: initState(),\n      rootState: {} as RootState,\n      getters: {},\n      rootGetters: {},\n    }\n  }\n})\n",
  },
}

const StoreModulesTemplate: Templates = {
  ts: {
    [TypescriptVuexModuleTypes.Module]: moduleTemplate,
  },
  js: {},
}

export default StoreModulesTemplate
