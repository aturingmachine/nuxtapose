import { Templates } from '.'
import { TypescriptVuexModuleTypes } from '../models/config'

const moduleTemplate = {
  implementation: {
    getters:
      "import type { GetterTree } from 'vuex'\nimport { RootState } from '~/store'\nimport { #[PASCAL_CASE]State, #[PASCAL_CASE]Status } from './state'\n\nexport enum #[PASCAL_CASE]GetterTypes {\n  Get#[PASCAL_CASE] = 'Get#[PASCAL_CASE]',\n}\n\nconst getters: GetterTree<#[PASCAL_CASE]State, RootState> = {\n  [#[PASCAL_CASE]GetterTypes.Get#[PASCAL_CASE]]: (state: #[PASCAL_CASE]State) => state.records,\n}\n\nexport default getters\n",
    state:
      "export enum #[PASCAL_CASE]Status {\n  LOADING = 'LOADING',\n  SUCCESS = 'SUCCESS',\n  ERROR = 'ERROR',\n}\n\nexport interface #[PASCAL_CASE]State {\n  records: {\n    [key: string]: Record<string | number, unknown>\n  }\n}\n\nconst state = (): #[PASCAL_CASE]State => ({ records: {} })\n\nexport default state\n",
    mutations:
      "import type { MutationTree } from 'vuex'\nimport { #[PASCAL_CASE]State, #[PASCAL_CASE]Status } from './state'\n\nexport enum #[PASCAL_CASE]MutationTypes {\n  Set#[PASCAL_CASE]Loading = 'Set#[PASCAL_CASE]Loading',\n}\n\nconst mutations: MutationTree<#[PASCAL_CASE]State> = {\n  [#[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading]: (state: #[PASCAL_CASE]State, payload) => {\n    const updates = Object.fromEntries(\n      payload.ids.map((id: number) => [\n        id,\n        { status: #[PASCAL_CASE]Status.LOADING, record: undefined },\n      ])\n    )\n\n    state.records = {\n      ...state.records,\n      ...updates,\n    }\n  },\n}\n\nexport default mutations\n",
    actions:
      "import type { ActionTree } from 'vuex'\nimport { #[PASCAL_CASE]State, #[PASCAL_CASE]Status } from './state'\n\nexport enum #[PASCAL_CASE]ActionTypes {\n  Get#[PASCAL_CASE] = 'Get#[PASCAL_CASE]',\n}\n\nconst actions: ActionTree<#[PASCAL_CASE]State, RootState> = {\n  [#[PASCAL_CASE]ActionTypes.Get#[PASCAL_CASE]]({ commit }, id: number) {\n    commit({\n      type: #[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading,\n      ids: [id],\n    })\n\n    // Make a request or something to get the data and commit it\n    // as a Set#[PASCAL_CASE]Success or something\n  },\n}\n",
  },
  spec: {
    'NP_KEBAB_CASE-state':
      "import initState from './state'\n\ndescribe('#[SENTENCE_CASE] State', () => {\n  it('should have an empty records map', () => {\n    const state = initState()\n\n    expect(state).toEqual({ records: {} })\n  })\n})\n",
    'NP_KEBAB_CASE-getters':
      "import { RootState } from '~/store'\nimport initState, { #[PASCAL_CASE]State } from './state'\nimport getters, { #[PASCAL_CASE]GettersTypes } from './getters'\n\ndescribe('#[SENTENCE_CASE] Getters', () => {\n  let state: #[PASCAL_CASE]State\n  let rootState: RootState\n\n  beforeEach(() => {\n    state = initState()\n    rootState = {} as RootState\n  })\n\n  describe('Get#[PASCAL_CASE]', () => {\n    it('should return undefined if the record does not exist', () => {\n      const result = getters.Get#[PASCAL_CASE](state, getters, rootState, {})\n\n      expect(result).toBeUndefined()\n    })\n  })\n})\n",
    'NP_KEBAB_CASE-mutations':
      "import initState, { #[PASCAL_CASE]State } from './state'\nimport mutations from './mutations'\n\ndescribe('#[SENTENCE_CASE] Mutations', () => {\n  let state: HydratedFeedsState\n\n  beforeEach(() => {\n    state = initState()\n  })\n\n  describe('Set#[PASCAL_CASE]Loading', () => {\n    it('should set the status to LOADING and the record to undefined', () => {\n      mutations.Set#[PASCAL_CASE]Loading(state, { ids: [828] })\n\n      expect(state.records[828].status).toEqual(#[PASCAL_CASE]Status.LOADING)\n    })\n  })\n})\n",
    'NP_KEBAB_CASE-actions':
      "import { RootState } from '~/store'\nimport initState, { #[PASCAL_CASE]State, #[PASCAL_CASE]Status } from './state'\nimport actions from './actions'\nimport { #[PASCAL_CASE]MutationTypes } from './mutations'\n\ntype MockActionContext = { commit: jest.Mock; dispatch: jest.Mock }\n\ndescribe('#[SENTENCE_CASE] Actions', () => {\n  let context: MockActionContext\n\n  beforeEach(() => {\n    context = getMockActionContext(initState)\n  })\n\n  describe('Get#[PASCAL_CASE]', () => {\n    describe('Early Exits', () => {\n      it('should Set#[PASCAL_CASE]Loading if an existing record has status error', async () => {\n        context.state.records[828] = {}\n        context.state.records[828].status = #[PASCAL_CASE]sStatus.ERROR\n\n        actions.Get#[PASCAL_CASE].call(store, context, feed)\n\n        expect(context.commit).toHaveBeenCalledWith(\n          #[PASCAL_CASE]MutationTypes.Set#[PASCAL_CASE]Loading,\n          828\n        )\n      })\n    })\n  })\n\n  function getMockActionContext(): MockActionContext {\n    return {\n      dispatch: jest.fn(),\n      commit: jest.fn(),\n      state: initState(),\n      rootState: {} as RootState,\n      getters: {},\n      rootGetters: {},\n    }\n  }\n})\n",
  },
}

const StoreModulesTemplate: Templates = {
  ts: {
    [TypescriptVuexModuleTypes.Module]: moduleTemplate,
  },
  js: {},
}

export default StoreModulesTemplate
