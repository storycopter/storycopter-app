import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { remote } from 'electron';

const { dialog } = remote;
const mainWindow = remote.getCurrentWindow();

export default function uploadFile(basePath, toPath, extensions) {
  const [src] = dialog.showOpenDialogSync(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Assets', extensions: extensions }],
    multiSelections: false,
    openDirectory: false,
  });
  if (src && src !== undefined) {
    const timestamp = Date.now();
    const srcExtension = path.extname(src);
    const srcName = path.basename(src, srcExtension);
    const newName = `${srcName.replace(/\s/g, '-')}-${timestamp}${srcExtension}`.toLowerCase();
    const newPath = path.join(toPath, sanitize(newName));
    fs.copyFileSync(src, path.join(basePath, newPath));
    return {
      name: newName,
      path: newPath,
    };
  }
}
