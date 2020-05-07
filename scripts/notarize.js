require('dotenv').config();
const { notarize } = require('electron-notarize');
const APPLESECRETS = require('../.apple/secrets.json');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: APPLESECRETS.appleBundleId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: APPLESECRETS.appleId,
    appleIdPassword: APPLESECRETS.appleIdPass,
  });
};
