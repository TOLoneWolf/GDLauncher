import React, { useState } from 'react';
import fse from 'fs-extra';
import path from 'path';
import { Input, Button } from 'antd';
import { useInterval } from 'rooks';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import lockfile from 'lockfile';
import makeDir from 'make-dir';
import * as ActionTypes from '../reducers/actionTypes';
import { _getInstancesPath, _getInstances } from '../utils/selectors';
import Modal from '../components/Modal';
import { closeModal } from '../reducers/modals/actions';

const DuplicateInstance = ({ instanceName }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const instancesPath = useSelector(_getInstancesPath);
  const instances = useSelector(_getInstances);
  const [newName, setNewName] = useState(`${instanceName} Copy`);

  const { start, stop } = useInterval(() => {
    if (instances.find(instance => instance.name === instanceName)) {
      // Unlock instance folder
      unlockInstance();
      stop();
      dispatch(closeModal());
    }
  }, 200);

  async function unlockInstance() {
    const lockFilePath = path.join(
      instancesPath,
      instanceName,
      'installing.lock'
    );
    const isLocked = await new Promise((resolve, reject) => {
      lockfile.check(lockFilePath, (err, locked) => {
        if (err) reject(err);
        resolve(locked);
      });
    });
    if (isLocked) {
      lockfile.unlock(lockFilePath, err => {
        if (err) console.log(err);
      });
    }
  }

  // TODO - Check to see if name is already in use or invalid.

  const dupInstance = async () => {
    setLoading(true);
    start();

    // Stop listener from watching instance folder during copy.
    await makeDir(path.join(instancesPath, newName));
    lockfile.lock(path.join(instancesPath, newName, 'installing.lock'), err => {
      if (err) console.error(err);
    });
    // TODO - duplicate here.
    await fse.copy(
      path.join(instancesPath, instanceName),
      path.join(instancesPath, newName)
    );
    // const instance = _getInstance(state)(instanceName) || {};
    const state = getState();
    const instance = {};
    dispatch({
      type: ActionTypes.UPDATE_INSTANCES,
      instances: {
        ...state.instances.list,
        [newName]: updateFunction(instance)
      }
    });
  };
  const closeModalWindow = () => dispatch(closeModal());

  // TODO - new code here. Remove me when done.

  return (
    <Modal
      css={`
        height: 40%;
        width: 50%;
        max-width: 550px;
        max-height: 260px;
        overflow-x: hidden;
      `}
      title="Duplicate Instance"
    >
      <div
        css={`
          font-size: large;
          text-align: center;
        `}
      >
        Creating a duplicate of instance:&nbsp;
        <h4
          css={`
            font-weight: 700;
            font-size: large;
            text-align: center;
          `}
        >
          {instanceName}
        </h4>
        <div>
          <Input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div
          css={`
            margin-top: 50px;
            display: flex;
            width: 100%;
            justify-content: space-between;
          `}
        >
          <Button
            onClick={closeModalWindow}
            color="primary"
            disabled={loading}
            type="primary"
          >
            No, Abort
          </Button>
          <Button
            onClick={dupInstance}
            color="primary"
            loading={loading}
            type="primary"
          >
            Yes&nbsp;
            <FontAwesomeIcon icon={faClone} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateInstance;
