// var is = require("electron-is");

// // Mac and Linux have Bash shell scripts (so the following would work)
// //        var child = process.spawn('child', ['-l']);
// //        var child = process.spawn('./test.sh');
// // Win10 with WSL (Windows Subsystem for Linux)  https://docs.microsoft.com/en-us/windows/wsl/install-win10
// //
// // Win10 with Git-Bash (windows Subsystem for Linux) https://git-scm.com/   https://git-for-windows.github.io/
// //

// function appendOutput(msg) {
//   getCommandOutput().value += msg + "\n";
// }
// function setStatus(msg) {
//   getStatus().innerHTML = msg;
// }

// function showOS() {
//   if (is.windows()) appendOutput("Windows Detected.");
//   if (is.macOS()) appendOutput("Apple OS Detected.");
//   if (is.linux()) appendOutput("Linux Detected.");
// }

// var child;

// function killBackgroundProcess() {
//   console.log('kill', child);
//   if (child) child.kill();
// }

// function backgroundProcess() {
//   return;
//   const process = require("child_process"); // The power of Node.JS
//   appendOutput("start?");

//   showOS();

//   // var npm = require("npm");
//   // var npm = require('npm').path.replace('app.asar', 'app.asar.unpacked');
//   // npm.load(function(err) {
//   //   console.log(err);
//   //   npm.run('foo', function(err, data) {
//   //     console.log(err, data);
//   //   })
//   // });

//   // const npm = require('npm-commands');
//   // npm().run('foo');

//   // var npm = require('npm');
//   // npm.load(function(err) {
//   //   // handle errors
//   //   console.log(err);
//   //   // install module ffi
//   //   npm.commands.run({filename: ''}, function(er, data) {
//   //     // log errors or data
//   //     console.log(er, data);
//   //     // appendOutput('stderr: <'+err+'>' );
//   //     // appendOutput(data );
//   //   });
//   // });

//   // var cmd = is.windows() ? "test.bat" : "./test.sh";
//   var cmd = is.windows() ? "test.bat" : "./node_modules/.bin/gatsby";
//   console.log("cmd:", cmd);
//   appendOutput(cmd);

//   child = process.spawn(cmd, ['--no-color', 'develop'], {
//     cwd: '/Users/laurian/Projects/Storycopter/storycopter/packages/idoc'
//   });

//   console.log(child);

//   child.on("error", function(err) {
//     appendOutput("stderr: <" + err + ">");
//   });

//   child.stdout.on("data", function(data) {
//     appendOutput(data);
//   });

//   child.stderr.on("data", function(data) {
//     appendOutput("stderr: <" + data + ">");
//   });

//   child.on("close", function(code) {
//     if (code == 0) setStatus("child process complete.");
//     else setStatus("child process exited with code " + code);

//     getCommandOutput().style.background = "DarkGray";
//   });
// }
