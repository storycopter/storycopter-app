/* eslint-disable jsx-a11y/iframe-has-title */
// import is from 'electron-is';
import path from 'path';
import Ansi from 'ansi-to-react';
import React from 'react';
import fs from 'fs';
import process from 'child_process';
import stripAnsi from 'strip-ansi';
import { connect } from 'react-redux';
import { remote } from 'electron';
import { createGlobalStyle } from 'styled-components';
import { update } from './reducers/data';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Toolbar from '@material-ui/core/Toolbar';

import appTheme from '@storycopter/ui/src/themes/appTheme';

import Editor from './components/Editor';
import ErrorBoundary from './components/ErrorBoundary';
import Pages from './components/Pages';

const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();
const foo = remote.require('./foo');
const node = foo.getNode();

const AppBaseline = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: '',
    };

    this.iframeRef = React.createRef();
  }

  // addFile = async (basepath, dest) => {
  //   const { filePaths } = await dialog.showOpenDialog(WIN, { properties: ['openFile'] });
  //   const src = filePaths.pop();

  //   if (src) {
  //     const destPath = path.join(dest, path.basename(src));
  //     fs.copyFileSync(src, path.join(basepath, destPath));

  //     console.log(destPath);
  //     return destPath;
  //   }
  // };

  openProjectDialog = async () => {
    const { filePaths } = await dialog.showOpenDialog(WIN, { properties: ['openDirectory'] });
    const path = filePaths.pop();
    path && this.openProject(path);
  };

  openProject(path) {
    const siteJSON = JSON.parse(fs.readFileSync(`${path}/src/site/site.json`, 'utf8'));
    const contentsJSON = JSON.parse(fs.readFileSync(`${path}/src/essentials/contents.json`, 'utf8'));
    const creditsJSON = JSON.parse(fs.readFileSync(`${path}/src/essentials/credits.json`, 'utf8'));
    const errorJSON = JSON.parse(fs.readFileSync(`${path}/src/essentials/error.json`, 'utf8'));
    const homeJSON = JSON.parse(fs.readFileSync(`${path}/src/essentials/home.json`, 'utf8'));
    const introJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/000-intro.json`, 'utf8'));
    const beginningJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/001-beginning.json`, 'utf8'));
    const middleJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/002-middle.json`, 'utf8'));
    const outroJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/004-outro.json`, 'utf8'));
    const appendixJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/005-appendix.json`, 'utf8'));
    const endJSON = JSON.parse(fs.readFileSync(`${path}/src/pages/003-end.json`, 'utf8'));

    const currentProject = {
      basepath: path,
      site: siteJSON,
      essentials: {
        contents: contentsJSON,
        credits: creditsJSON,
        error: errorJSON,
        home: homeJSON,
      },
      pages: [introJSON, beginningJSON, middleJSON, endJSON, outroJSON, appendixJSON],
    };

    console.log(currentProject);

    this.props.update({ currentProject });
  }

  previewProject(path) {
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
    const { data } = this.props;

    console.group('App.js:');
    console.log('data:', data);
    console.groupEnd();

    return (
      <ThemeProvider theme={appTheme}>
        {data && data.currentProject ? (
          <ErrorBoundary>
            <CssBaseline />
            <AppBaseline />
            <Grid
              alignContent="stretch"
              alignItems="stretch"
              style={{ height: '100vh' }}
              container
              direction="column"
              wrap="nowrap">
              <Grid item>
                <AppBar>
                  <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                      <Grid item>
                        <Box display="flex" justifyContent="flex-start">
                          {!child ? (
                            <Button variant="contained" color="primary" onClick={() => this.openProjectDialog()}>
                              Open Project
                            </Button>
                          ) : null}
                        </Box>
                      </Grid>
                      <Grid item>
                        <Pages />
                      </Grid>
                      <Grid item>
                        <Box display="flex" justifyContent="flex-end">
                          <IconButton>
                            <LaunchIcon />
                          </IconButton>
                          <IconButton>
                            <GetAppIcon />
                          </IconButton>
                          <IconButton>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </AppBar>
                <Toolbar />
              </Grid>
              <Editor />
            </Grid>
          </ErrorBoundary>
        ) : (
          'nothing'
        )}
        {child ? (
          <Button variant="contained" color="secondary" onClick={() => this.kill()}>
            Kill Gatsby
          </Button>
        ) : null}
        {src ? <iframe ref={this.iframeRef} src={src} style={{ width: '100%', height: '75vh' }}></iframe> : null}
        {status ? <h1>{status}</h1> : null}
        <Ansi>{log}</Ansi>
      </ThemeProvider>
    );
  }
}

// export default App;
export default connect(({ data }) => ({ data }), { update })(App);
