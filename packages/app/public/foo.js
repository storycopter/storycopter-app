const shelljs = require('shelljs');

console.log(shelljs.which('node'));

exports.getNode = () => {
  // return '/var/folders/69/qt07ghk57hx43nwfvkh_xbwh0000gp/T/yarn--1574550647116-0.48012860400745505/node';
  return shelljs.which('node').toString();
};
