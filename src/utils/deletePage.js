import fs from 'fs-extra';
import path from 'path';

export default function deletePage(basePath, uid) {
  fs.removeSync(path.join(basePath, `src/pages/${uid}`));
  fs.removeSync(path.join(basePath, `src/pages/${uid}.json`));
}
