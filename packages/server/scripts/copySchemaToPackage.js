import fs from 'fs';

import { project } from '../src/config';

const copySchemaToPackage = (schemaFolderSrc, schemaFileDest) => {
  try {
    fs.copyFileSync(schemaFolderSrc, schemaFileDest);
    // eslint-disable-next-line
        console.info(`Schema successfully copied to: ${schemaFileDest}`);
  } catch (error) {
    // eslint-disable-next-line
        console.error(`Error while trying to copy schema to: ${schemaFileDest}`, error);
  }
};

const runScript = () => {
  // web
  copySchemaToPackage(project.GRAPHQL_SCHEMA_FILE, `../schemas/${project.GRAPHQL}/schema.graphql`);
};

(() => {
  runScript();
})();
