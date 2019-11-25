import React from 'react';
import is from 'electron-is';
import process from 'child_process';
import Ansi from 'ansi-to-react';
import path from 'path';
import { remote } from 'electron';

import './App.css';

// const { BrowserWindow } = remote;

const foo = remote.require('./foo');
const node = foo.getNode();
console.log(node);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: '',
      child: null,
      status: null,
    };
  }

  componentDidMount() {
    const child = process.spawn(node, ['./node_modules/.bin/gatsby', 'develop'], {
      cwd: '/Users/laurian/Projects/Storycopter/storycopter/packages/idoc',
    });
    // const child = process.spawn("./node_modules/.bin/gatsby", ['develop'], {
    //   cwd: '/Users/laurian/Projects/Storycopter/storycopter/packages/idoc'
    // });

    console.log(child);
    this.setState({ child });

    child.on('error', err => {
      this.setState({ log: this.state.log + '\n' + 'stderr: <' + err + '>' });
    });

    child.stdout.on('data', data => {
      this.setState({ log: this.state.log + data });
    });

    child.stderr.on('data', data => {
      this.setState({ log: this.state.log + '\n' + 'stderr: <' + data + '>' });
    });

    child.on('close', code => {
      this.setState({ status: code === 0 ? 'child process complete.' : 'child process exited with code ' + code });
    });
  }

  kill() {
    if (this.state.child) this.state.child.kill();
  }

  render() {
    return (
      <div className="App">
        <iframe ref={ref => (this.iframe = ref)} src="http://localhost:8000/"></iframe>
        <button onClick={() => (this.iframe.src = `http://localhost:8000/?${Math.random()}`)}>reload iframe</button>
        <h1>{this.state.status}</h1>
        <Ansi>{this.state.log}</Ansi>
        <button onClick={() => this.kill()}>kill</button>
      </div>
    );
  }
}

export default App;
