import React, { Component } from 'react';
import { array, bool } from 'prop-types';

import { IdocProvider } from '@storycopter/ui/providers';

import FooBar from './FooBar';
import GlobalStyles from './GlobalStyles';
import TopBar from './TopBar';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasOffset: false,
    };
    // this.watchPageYOffset = this.watchPageYOffset.bind(this);
  }

  // componentDidMount() {
  //   this.watchPageYOffset();
  //   window.addEventListener('scroll', this.watchPageYOffset);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.watchPageYOffset);
  // }

  // watchPageYOffset() {
  //   // this.setState({ hasOffset: window.pageYOffset > 0 });
  // }

  render() {
    const { children, isHome, isCredits } = this.props;

    // console.group('Layout.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <IdocProvider>
        <GlobalStyles />
        <IdocProvider invert>
          <TopBar
            allowNext={!isCredits}
            allowPrev={!isHome && !isCredits}
            isCredits={isCredits}
            isHome={isHome}
            {...this.props}
          />
        </IdocProvider>
        <main>{children}</main>
        <FooBar></FooBar>
      </IdocProvider>
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: array.isRequired,
  isCredits: bool,
  isHome: bool,
};

Layout.defaultProps = {
  isCredits: null,
  isHome: null,
};
