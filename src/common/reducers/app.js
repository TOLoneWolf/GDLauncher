import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';
import PromiseQueue from '../../app/desktop/utils/PromiseQueue';

function accounts(state = [], action) {
  const index = state.findIndex(
    account => account && account.selectedProfile.id === action.id
  );
  switch (action.type) {
    case ActionTypes.UPDATE_ACCOUNT:
      return index !== -1
        ? [...state.slice(0, index), action.account, ...state.slice(index + 1)]
        : [...state, action.account];
    case ActionTypes.REMOVE_ACCOUNT:
      return state.filter(
        account => account && account.selectedProfile.id !== action.id
      );
    default:
      return state;
  }
}

// Based on account UUID
function currentAccountId(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_ACCOUNT_ID:
      return action.id;
    default:
      return state;
  }
}

function vanillaManifest(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_VANILLA_MANIFEST:
      return action.data;
    default:
      return state;
  }
}

function fabricManifest(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FABRIC_MANIFEST:
      return action.data;
    default:
      return state;
  }
}

function forgeManifest(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_FORGE_MANIFEST:
      return action.data;
    default:
      return state;
  }
}

function curseforgeCategories(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CURSEFORGE_CATEGORIES_MANIFEST:
      return action.data;
    default:
      return state;
  }
}

function javaManifest(state = {}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_JAVA_MANIFEST:
      return action.data;
    default:
      return state;
  }
}

function clientToken(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CLIENT_TOKEN:
      return action.clientToken;
    default:
      return state;
  }
}

function isNewUser(state = true, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_IS_NEW_USER:
      return action.isNewUser;
    default:
      return state;
  }
}

function showChangelogs(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SHOW_CHANGELOG:
      return action.show;
    default:
      return state;
  }
}

function instances(state = { started: false, list: {} }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_INSTANCES:
      // eslint-disable-next-line
      for (const instance1 in action.instances) {
        const instance = action.instances[instance1];
        // eslint-disable-next-line
        if (!instance) continue;
        if (!instance.name) {
          // eslint-disable-next-line
          instance.name = instance1;
        }
        if (state.list[instance.name]?.queue) {
          // eslint-disable-next-line
          instance.queue = state.list[instance.name].queue;
        } else {
          // eslint-disable-next-line
          instance.queue = new PromiseQueue();
        }
      }
      return { ...state, list: action.instances };
    case ActionTypes.REORDER_INSTANCES:
      if (Array.isArray(action.instances)) {
        const instanceMap = action.instances.reduce((map, i) => {
          // eslint-disable-next-line no-param-reassign
          map[i.name] = i;
          return map;
        }, {});
        return { ...state, list: instanceMap };
      }
      return { ...state, list: action.instances };
    case ActionTypes.UPDATE_INSTANCES_STARTED:
      return { ...state, started: action.started };
    default:
      return state;
  }
}

export default combineReducers({
  accounts,
  currentAccountId,
  vanillaManifest,
  forgeManifest,
  fabricManifest,
  javaManifest,
  curseforgeCategories,
  clientToken,
  isNewUser,
  showChangelogs,
  instances
});
