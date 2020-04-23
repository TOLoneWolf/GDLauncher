// import watch from "node-watch";
import makeDir from 'make-dir';
import { ipcRenderer } from 'electron';
import { notification } from 'antd';
import * as ActionTypes from '../../../common/reducers/actionTypes';
import getInstances from './getInstances';
import modsFingerprintsScan from './modsFingerprintsScan';
import { startListener } from '../../../common/reducers/actions';
import { _getInstancesPath } from '../../../common/utils/selectors';

const middleware = store => next => action => {
  const currState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  // console.log(`currState ${currState.userData}`);
  // console.log(`nextState ${nextState.userData}`);
  const { dispatch } = store;
  if (!nextState.userData) return result;
  const instancesPath = _getInstancesPath(nextState);

  const userDataChanged = currState.userData !== nextState.userData;

  // If not initialized yet, start listener and do a first-time read
  // console.log(`NextState..started ${nextState.app.instances.started}`);
  // console.log(`userDataChanged ${userDataChanged}`);
  // console.log(
  //   `nextState.app.instances ${JSON.stringify(nextState.app.instances)}`
  // );
  if (!nextState.app.instances.started || userDataChanged) {
    console.log('FIRST_READ');
    const startInstancesListener = async () => {
      await ipcRenderer.invoke('stop-listener');
      await makeDir(instancesPath);

      // if (nextState.app.instances) {
      //   const { test } = nextState.app.instances;
      //   dispatch({
      //     type: ActionTypes.UPDATE_INSTANCES,
      //     test
      //   });
      // }

      const instances = await getInstances(instancesPath);
      dispatch({
        type: ActionTypes.UPDATE_INSTANCES,
        instances
      });
      const instances1 = await modsFingerprintsScan(instancesPath);
      dispatch({
        type: ActionTypes.UPDATE_INSTANCES,
        instances: instances1
      });
      try {
        await makeDir(instancesPath);
        await dispatch(startListener());
      } catch (err) {
        console.error(err);
        // eslint-disable-next-line
        notification.open({
          key: 'nsfwNotWorking',
          message: 'NSFW Error',
          description: 'Node Sentinel File Watcher could not be initialized',
          top: 47,
          duration: 10
        });
      }
    };

    dispatch({
      type: ActionTypes.UPDATE_INSTANCES_STARTED,
      started: true
    });
    startInstancesListener();
  }

  return result;
};

export default middleware;
