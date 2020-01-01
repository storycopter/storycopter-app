/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { remote } from 'electron';
import is from 'electron-is';
import process from 'child_process';
import Ansi from 'ansi-to-react';
import path from 'path';
import stripAnsi from 'strip-ansi';

import './App.css';

const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();

const foo = remote.require('./foo');
const node = foo.getNode();
console.log(node);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: '',
    };

    this.iframeRef = React.createRef();
  }

  openProjectDialog = async () => {
    const { filePaths } = await dialog.showOpenDialog(WIN, { properties: ['openDirectory'] });
    const path = filePaths.pop();
    path && this.openProject(path);
  };

  openProject(path) {
    const child = process.spawn(node, ['./node_modules/.bin/gatsby', 'develop'], {
      // cwd: '/Users/laurian/Projects/Storycopter/storycopter/packages/idoc',
      cwd: path,
    });

    child.stdin.setEncoding('utf-8');

    this.setState({ child });
    console.log(child);

    child.on('error', err => {
      this.setState({ log: `${this.state.log}\nstderr: <${err}>` });
    });

    child.stdout.on('data', data => {
      this.setState({ log: `${this.state.log}${data}` });
      if (data.indexOf('Y/n') !== -1) child.stdin.write('Y');
      if (data.indexOf('http://localhost:') !== -1) {
        const src = stripAnsi(`${data}`)
          .split(/\s/)
          .find(t => t.indexOf('http://localhost') !== -1)
          .trim();
        src.indexOf('graphql') === -1 && this.setState({ src });
      }
    });

    child.stderr.on('data', data => {
      this.setState({ log: `${this.state.log}\nstderr: <${data}>` });
    });

    child.on('close', code => {
      this.setState({ status: code === 0 ? 'child process complete.' : `child process exited with code ${code}` });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.src && prevState.log !== this.state.log) {
      const lastLog = document.querySelector('code > span:last-child');
      lastLog && lastLog.scrollIntoView();
    } else if (this.state.src) {
      const iframe = document.querySelector('iframe');
      iframe && iframe.scrollIntoView();
    }
  }

  componentWillUnmount() {
    this.kill();
  }

  kill() {
    this.state.child && this.state.child.kill();
    this.setState({ child: null, src: null, log: '' });
  }

  render() {
    const { child, log, status, src } = this.state;

    return (
      <div className="App">
        {!child ? <button onClick={() => this.openProjectDialog()}>Open Project</button> : null}
        {src ? <iframe ref={this.iframeRef} src={src}></iframe> : null}
        {status ? <h1>{status}</h1> : null}
        <Ansi>{log}</Ansi>
        {child ? <button onClick={() => this.kill()}>kill gatsby</button> : null}
      </div>
    );
  }
}

export default App;
