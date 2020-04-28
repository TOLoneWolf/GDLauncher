import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';
import {
  DEFAULT_JAVA_ARGS,
  DEFAULT_MEMORY
} from '../../../app/desktop/utils/constants';
import defaultTheme from '../../../ui/theme';

function sounds(state = true, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SOUNDS:
      return action.sounds;
    default:
      return state;
  }
}

// 0 is stable, 1 is beta
function releaseChannel(state = 0, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_RELEASE_CHANNEL:
      return action.releaseChannel;
    default:
      return state;
  }
}

// 0 is stable, 1 is beta
function concurrentDownloads(state = 3, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_CONCURRENT_DOWNLOADS:
      return action.concurrentDownloads;
    default:
      return state;
  }
}

function discordRPC(state = true, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_DISCORD_RPC:
      return action.val;
    default:
      return state;
  }
}

function hideWindowOnGameLaunch(state = false, action) {
  switch (action.type) {
    case ActionTypes.HIDE_WINDOW_ON_GAME_LAUNCH:
      return action.hideWindow;
    default:
      return state;
  }
}

function potatoPcMode(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_POTATO_PC_MODE:
      return action.value;
    default:
      return state;
  }
}

function showNews(state = true, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SHOW_NEWS:
      return action.value;
    default:
      return state;
  }
}

function java(
  state = {
    path: null,
    memory: DEFAULT_MEMORY,
    args: DEFAULT_JAVA_ARGS
  },
  action
) {
  switch (action.type) {
    case ActionTypes.UPDATE_JAVA_ARGUMENTS:
      return { ...state, args: action.args };
    case ActionTypes.UPDATE_JAVA_MEMORY:
      return { ...state, memory: action.memory };
    case ActionTypes.UPDATE_JAVA_PATH:
      return { ...state, path: action.path };
    default:
      return state;
  }
}

function theme(
  state = {
    active: 'Default',
    themes: { Default: defaultTheme }
  },
  action
) {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_THEME:
      return {
        ...state,
        active: action.payload
      };
    case ActionTypes.RESET_THEME:
      return {
        ...state,
        active: 'Default',
        themes: {
          Default: defaultTheme
        }
      };
    case ActionTypes.TEST:
      return {
        ...state,
        themes: { ...state.themes, [action.payload.name]: action.payload.data }
      };
    default:
      return state;
  }
}

export default combineReducers({
  sounds,
  releaseChannel,
  concurrentDownloads,
  discordRPC,
  hideWindowOnGameLaunch,
  potatoPcMode,
  showNews,
  java,
  theme
});
