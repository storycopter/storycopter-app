import fs from 'fs-extra';
import path from 'path';

export default function createPage(basePath, order) {
  const uid = Date.now();
  const newFolder = `src/pages/${uid}`;
  const newFile = `src/pages/${uid}.json`;

  const newPage = {
    meta: {
      coverEnabled: false,
      coverImage: {
        name: '',
      },
      order: order,
      path: `/${uid}`,
      summary: '',
      title: '',
      uid: `${uid}`,
    },
    elements: [],
  };

  fs.ensureDirSync(path.join(basePath, newFolder));
  fs.outputJsonSync(path.join(basePath, newFile), newPage, function (err) {
    if (err) throw err;
  });
  return fs.readJsonSync(path.join(basePath, newFile));
}
