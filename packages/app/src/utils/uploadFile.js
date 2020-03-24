import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { remote } from 'electron';

const { dialog } = remote;
const mainWindow = remote.getCurrentWindow();

export default function uploadFile(basePath, toPath) {
  const [src] = dialog.showOpenDialogSync(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mp4'] },
    ],
  });
  if (src) {
    const filePath = path.join(toPath, sanitize(path.basename(src)).replace(/ /g, ''));
    fs.copyFileSync(src, path.join(basePath, filePath));
    return {
      name: path.basename(filePath),
      path: filePath,
    };
  }
}
