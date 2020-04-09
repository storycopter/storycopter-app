import fs from 'fs-extra';
import path from 'path';
import sanitize from 'sanitize-filename';

export default function duplicatePage(basePath, oldUID, title) {
  const newUID = sanitize(title.replace(/\s/g, '-')).toLowerCase();
  const oldPage = fs.readJsonSync(`${basePath}/src/pages/${oldUID}.json`);
  const newPage = { ...oldPage, meta: { ...oldPage.meta, uid: newUID, path: `/${newUID}`, title: title } };

  const newFile = `src/pages/${newUID}.json`;

  fs.outputJsonSync(path.join(basePath, newFile), newPage, function(err) {
    if (err) throw err;
  });
  fs.copySync(path.join(basePath, `src/pages/${oldUID}`), path.join(basePath, `src/pages/${newUID}`));

  return fs.readJsonSync(path.join(basePath, newFile));
}
