import omit from 'lodash/omit';
import * as ActionTypes from './actionTypes';

function news(state = [], action) {
  switch (action.type) {
    case ActionTypes.UPDATE_NEWS:
      return action.news;
    default:
      return state;
  }
}

function userData(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USERDATA:
      return action.path;
    default:
      return state;
  }
}

function downloadQueue(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_DOWNLOAD_TO_QUEUE:
      return {
        ...state,
        [action.instanceName]: {
          percentage: 0,
          modloader: action.modloader,
          status: null,
          currentPhase: 1,
          totalPhases: action.phases,
          manifest: action.manifest
        }
      };
    case ActionTypes.REMOVE_DOWNLOAD_FROM_QUEUE:
      return omit(state, action.instanceName);
    case ActionTypes.UPDATE_DOWNLOAD_PROGRESS:
      return {
        ...state,
        [action.instanceName]: {
          ...state[action.instanceName],
          percentage: action.percentage
        }
      };
    case ActionTypes.UPDATE_DOWNLOAD_STATUS:
      return {
        ...state,
        [action.instanceName]: {
          ...state[action.instanceName],
          status: action.status
        }
      };
    default:
      return state;
  }
}

function currentDownload(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_DOWNLOAD:
      return action.instanceName;
    default:
      return state;
  }
}

function startedInstances(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_STARTED_INSTANCE:
      return {
        ...state,
        [action.instance.instanceName]: {
          pid: action.instance.pid,
          initialized: false
        }
      };
    case ActionTypes.UPDATE_STARTED_INSTANCE:
      return {
        ...state,
        [action.instance.instanceName]: {
          ...state[action.instance.instanceName],
          initialized: true
        }
      };
    case ActionTypes.REMOVE_STARTED_INSTANCE:
      return omit(state, [action.instanceName]);
    default:
      return state;
  }
}

function selectedInstance(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_INSTANCE:
      return action.instanceName;
    default:
      return state;
  }
}

function updateAvailable(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_UPDATE_AVAILABLE:
      return action.updateAvailable;
    default:
      return state;
  }
}

function latestModManifests(state = {}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_MOD_MANIFESTS:
      return { ...state, ...action.manifests };
    case ActionTypes.CLEAR_MOD_MANIFESTS:
      return {};
    default:
      return state;
  }
}

export default {
  userData,
  news,
  downloadQueue,
  currentDownload,
  startedInstances,
  selectedInstance,
  updateAvailable,
  latestModManifests
};
