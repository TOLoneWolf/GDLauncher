import * as ActionTypes from './actionTypes';

export function updateSoundsSetting(sounds) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_SOUNDS,
      sounds
    });
  };
}

export function updateReleaseChannel(releaseChannel) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_RELEASE_CHANNEL,
      releaseChannel
    });
  };
}

export function updateHideWindowOnGameLaunch(hideWindow) {
  return dispatch => {
    dispatch({
      type: ActionTypes.HIDE_WINDOW_ON_GAME_LAUNCH,
      hideWindow
    });
  };
}

export function updateShowNews(value) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_SHOW_NEWS,
      value
    });
  };
}

export function updatePotatoPcMode(value) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_POTATO_PC_MODE,
      value
    });
  };
}

export function updateShowChangelog(show) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_SHOW_CHANGELOG,
      show
    });
  };
}

export function updateJavaPath(path) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_JAVA_PATH,
      path
    });
  };
}

export function updateJavaMemory(memory) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_JAVA_MEMORY,
      memory
    });
  };
}

export function updateJavaArguments(args) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_JAVA_ARGUMENTS,
      args
    });
  };
}

export function updateDiscordRPC(val) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_DISCORD_RPC,
      val
    });
  };
}

export function updateSelectedTheme(val) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_SELECTED_THEME,
      payload: val
    });
  };
}

export function resetTheme() {
  return dispatch => {
    dispatch({
      type: ActionTypes.RESET_THEME
    });
  };
}

/** Pass { name: ThemeName, data: { param1: 'param', param2: 'param' } } */
export function updateTest({ name, data }) {
  return dispatch => {
    dispatch({
      type: ActionTypes.TEST,
      payload: { name, data }
    });
  };
}
