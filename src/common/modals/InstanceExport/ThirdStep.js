import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import path from 'path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import fse from 'fs-extra';
import { add as add7z } from 'node-7z';
import styles from './ExportPackModal.module.css';
import { get7zPath } from '../../../app/desktop/utils';

/**
 *
 * @param {String} archiveName Name of archive without file extension.
 * @param {String} zipDestPath Destination path (cwd of 7z).
 * @param {Array} filesArray Array of files to include. Relative to current working directory unless full path is passed for each file.
 */
const createZip = async (archiveName, zipDestPath, filesArray) => {
  const sevenZipPath = await get7zPath();
  const zipCreation = add7z(`${archiveName}.zip`, filesArray, {
    $bin: sevenZipPath,
    $raw: ['-tzip'],
    $spawnOptions: { cwd: zipDestPath }
  });
  await new Promise((resolve, reject) => {
    zipCreation.on('end', () => {
      resolve();
    });
    zipCreation.on('error', err => {
      reject(err.stderr);
    });
  });
};

export default function ThirdStep({
  instanceName,
  instancesPath,
  instanceConfig,
  filePath, // Destionation path for zip
  packVersion,
  tempPath,
  packAuthor,
  selectedFiles,
  closeModal,
  packZipName
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { modloader, mods } = instanceConfig;
  const mcVersion = modloader[1];
  const forgeVersion = modloader[2].slice(mcVersion.length + 1);
  const dispatch = useDispatch();
  const tempExport = path.join(tempPath, instanceName);

  // Construct manifest contents
  const createManifest = async () => {
    return {
      minecraft: {
        version: modloader[1],
        modLoaders: [
          {
            id: `forge-${forgeVersion}`,
            primary: true
          }
        ]
      },
      manifestType: 'minecraftModpack',
      overrides: 'overrides',
      manifestVersion: 1,
      version: packVersion,
      author: packAuthor,
      projectID: modloader.length > 3 ? parseInt(modloader[3], 10) : undefined,
      name: packZipName,
      files: mods.map(mod => ({
        projectID: mod.projectID,
        fileID: mod.fileID,
        required: true
      }))
    };
  };

  useEffect(() => {
    const workOnFiles = async () => {
      const filteredFiles = selectedFiles.filter(
        file =>
          !mods.find(
            installedMod => installedMod.fileName === path.basename(file)
          )
      );

      // Process files from selection
      await fse.mkdirp(path.join(tempExport, 'overrides'));

      await Promise.all(
        filteredFiles.map(async file => {
          const stats = await fse.stat(file);
          if (stats.isFile()) {
            const slicedFile = file.slice(
              path.join(instancesPath, instanceName).length + 1
            );
            await fse.copy(
              file,
              path.join(tempExport, 'overrides', slicedFile)
            );
          }
        }),
        { concurrency: 30 }
      );

      // Create manifest file
      const manifestPath = path.join(path.join(tempExport, 'manifest.json'));
      const manifestString = await createManifest();
      await fse.outputJson(manifestPath, manifestString);

      // Create zipped export file
      const filesToZip = [
        path.join(tempExport, 'overrides'),
        path.join(tempExport, 'manifest.json')
      ];

      await fse.remove(
        path.join(filePath, `${packZipName}-${packVersion}.zip`)
      );
      await createZip(`${packZipName}-${packVersion}`, filePath, filesToZip);

      // Clean up temp folder
      await fse.remove(tempExport);

      setIsCompleted(true);
    };

    workOnFiles();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.centeredDiv}>
        {isCompleted ? (
          <div>
            <h2>
              All Done!{' '}
              <FontAwesomeIcon icon={faCheck} style={{ color: '#27ae60' }} />
            </h2>
            <Button type="primary" onClick={() => dispatch(closeModal())}>
              Go Back To Instances
            </Button>
          </div>
        ) : (
          <h2>We&apos;re doing some magical stuff</h2>
        )}
      </div>
    </div>
  );
}
