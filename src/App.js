/* eslint-disable jsx-a11y/iframe-has-title */
import is from 'electron-is';
// import path from 'path';
import Ansi from 'ansi-to-react';
import React from 'react';
import fs from 'fs';
import request from 'request';
import admZip from 'adm-zip';
import process from 'child_process';
import stripAnsi from 'strip-ansi';
import { connect } from 'react-redux';
import { remote, shell } from 'electron';
import NewWindow from 'react-new-window';

import Button from '@material-ui/core/Button';

import { update } from './reducers/data';
import ErrorBoundary from './ErrorBoundary';
import Interface from './components/Interface';

import './App.css';

const dialog = remote.dialog;
const WIN = remote.getCurrentWindow();
const node = 'node'; // remote.getGlobal('node');
// console.log({ node });

const WINDOWS = is.windows();
const D = WINDOWS ? '\\' : '/';

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

  onAppClose = () => {
    console.log('should quit app');
  };

  openProjectDialog = async () => {
    const { filePaths } = await dialog.showOpenDialog(WIN, { properties: ['openDirectory'] });
    const path = filePaths.pop();
    path && this.openProject(path);
  };

  openProject = path => {
    // these file names should be always the same. we could rely on them to detect if the app is opening a Storycopter project and—if not—feed back to the user.
    const contentsJSON = JSON.parse(fs.readFileSync(`${path}${D}src${D}essentials${D}contents.json`, 'utf8'));
    const creditsJSON = JSON.parse(fs.readFileSync(`${path}${D}src${D}essentials${D}credits.json`, 'utf8'));
    const errorJSON = JSON.parse(fs.readFileSync(`${path}${D}src${D}essentials${D}error.json`, 'utf8'));
    const homeJSON = JSON.parse(fs.readFileSync(`${path}${D}src${D}essentials${D}home.json`, 'utf8'));
    const siteJSON = JSON.parse(fs.readFileSync(`${path}${D}src${D}site${D}site.json`, 'utf8'));

    // these file names depend on page title that is user-generated, if page title changes after the page has been created, the id will not, hence the file name should not change after being created.
    const pages = fs
      .readdirSync(`${path}${D}src${D}pages`)
      .filter(name => name.match(/^(.*).json/i) && name !== `schema.json`) // skip gatsby dummy page
      .map(name => JSON.parse(fs.readFileSync(`${path}${D}src${D}pages${D}${name}`, 'utf8')));

    const currentProject = {
      basepath: path,
      site: siteJSON,
      essentials: {
        contents: contentsJSON,
        credits: creditsJSON,
        error: errorJSON,
        home: homeJSON,
      },
      pages,
    };

    console.log(currentProject);

    this.props.update({ currentProject });
  };

  saveProject = () => {
    const {
      data: {
        currentProject: { basepath, site, essentials, pages },
      },
    } = this.props;

    fs.writeFileSync(`${basepath}${D}src${D}site${D}site.json`, JSON.stringify(site, null, 2));
    ['contents', 'credits', 'error', 'home'].forEach(essential =>
      fs.writeFileSync(
        `${basepath}${D}src${D}essentials${D}${essential}.json`,
        JSON.stringify(essentials[essential], null, 2)
      )
    );
    pages.forEach(page =>
      fs.writeFileSync(`${basepath}${D}src${D}pages${D}${page.meta.uid}.json`, JSON.stringify(page, null, 2))
    );
  };

  previewProject = () => {
    const path = this.props.data.currentProject.basepath;
    const child = process.spawn(WINDOWS ? `scripts${D}preview.bat` : './scripts/preview.sh', { cwd: path });

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
  };

  buildProject = () => {
    const path = this.props.data.currentProject.basepath;
    const child = process.spawn(WINDOWS ? `scripts${D}build.bat` : './scripts/build.sh', { cwd: path });

    child.stdin.setEncoding('utf-8');

    this.setState({ child });
    console.log(child);

    child.on('error', err => {
      this.setState({ log: `${this.state.log}\nstderr: <${err}>` });
    });

    child.stdout.on('data', data => {
      this.setState({ log: `${this.state.log}${data}` });
      if (data.indexOf('Y/n') !== -1) child.stdin.write('Y');
    });

    child.stderr.on('data', data => {
      this.setState({ log: `${this.state.log}\nstderr: <${data}>` });
    });

    child.on('close', code => {
      this.setState({ status: code === 0 ? 'child process complete.' : `child process exited with code ${code}` });
      // this.setState({ child: null, src: null, log: '' });
      shell.openItem(path);
    });
  };

  createProject = async () => {
    const { filePaths } = await dialog.showOpenDialog(WIN, { properties: ['openDirectory'] });
    const path = filePaths.pop();
    if (path) {
      const now = Date.now();
      const req = request({
        method: 'GET',
        uri: 'https://github.com/storycopter/storycopter-idoc/archive/next.zip',
      });

      fs.mkdirSync(`${path}${D}idoc-temp-${now}`);

      const out = fs.createWriteStream(`${path}${D}idoc-temp-${now}${D}next.zip`);
      req.pipe(out);

      req.on('end', () => {
        const zip = new admZip(`${path}${D}idoc-temp-${now}${D}next.zip`);
        zip.extractAllTo(`${path}${D}idoc-temp-${now}`, true);

        fs.renameSync(`${path}${D}idoc-temp-${now}${D}storycopter-idoc-next`, `${path}${D}storycopter-idoc-${now}`);
        fs.chmodSync(`${path}${D}storycopter-idoc-${now}`, 0o777);
        fs.chmodSync(`${path}${D}storycopter-idoc-${now}${D}scripts${D}preview.sh`, 0o755);
        fs.chmodSync(`${path}${D}storycopter-idoc-${now}${D}scripts${D}build.sh`, 0o755);
        fs.unlinkSync(`${path}${D}idoc-temp-${now}${D}next.zip`);
        fs.rmdirSync(`${path}${D}idoc-temp-${now}`);

        this.openProject(`${path}${D}storycopter-idoc-${now}`);

        // const child = process.spawn('./setup.sh', { cwd: `${path}/storycopter-idoc-${now}` });
        // child.stdin.setEncoding('utf-8');
        // this.setState({ child });

        // child.on('error', err => {
        //   this.setState({ log: `${this.state.log}\nstderr: <${err}>` });
        // });

        // child.stdout.on('data', data => {
        //   this.setState({ log: `${this.state.log}${data}` });
        //   if (data.indexOf('Y/n') !== -1) child.stdin.write('Y');
        // });

        // child.stderr.on('data', data => {
        //   this.setState({ log: `${this.state.log}\nstderr: <${data}>` });
        // });

        // child.on('close', code => {
        //   this.setState({ status: code === 0 ? 'child process complete.' : `child process exited with code ${code}` });
        //   this.setState({ child: null, src: null, log: '' });
        // });
      });
    }
  };

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

    // console.group('App.js:');
    // console.log('data:', data);
    // console.groupEnd();

    return (
      <>
        <ErrorBoundary>
          <Interface
            hasProject={data?.currentProject}
            onAppClose={this.onAppClose}
            onProjectBuild={this.buildProject}
            onProjectOpen={this.openProjectDialog}
            onProjectPreview={this.previewProject}
            onSaveChanges={this.saveProject}
            onProjectCreate={this.createProject}
          />
        </ErrorBoundary>

        {child ? (
          <NewWindow>
            {src ? <iframe ref={this.iframeRef} src={src} style={{ width: '100%', height: '75vh' }}></iframe> : null}
            {status ? <h1>{status}</h1> : null}
            <pre>
              <Ansi>{log}</Ansi>
            </pre>

            <Button variant="contained" color="secondary" onClick={() => this.kill()}>
              Kill Gatsby
            </Button>
          </NewWindow>
        ) : null}
      </>
    );
  }
}

export default connect(({ data }) => ({ data }), { update })(App);
