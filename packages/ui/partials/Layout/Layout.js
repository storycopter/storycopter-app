/** @format */

import React, { Component } from 'react';
import { bool } from 'prop-types';

import { BottomBar, GlobalStyles, TopBar } from '@storycopter/ui/partials';
import { IdocProvider } from '@storycopter/ui/providers';

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
    return (
      <IdocProvider>
        <GlobalStyles />
        <IdocProvider invert>
          <TopBar allowNext={!isCredits} allowPrev={!isHome && !isCredits} isCredits={isCredits} isHome={isHome} />
        </IdocProvider>
        <main>{children}</main>
        <BottomBar></BottomBar>
      </IdocProvider>
    );
  }
}

export default Layout;

Layout.propTypes = {
  isCredits: bool,
  isHome: bool,
};

Layout.defaultProps = {
  isCredits: null,
  isHome: null,
};
