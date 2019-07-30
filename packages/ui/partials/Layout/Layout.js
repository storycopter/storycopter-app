import React, { Component } from 'react';

import { IdocProvider } from '@storycopter/ui/providers';
import { GlobalStyles, Topbar } from '@storycopter/ui/partials';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasOffset: false,
    };
    // this.watchPageYOffset = this.watchPageYOffset.bind(this);
  }

  componentDidMount() {
    // this.watchPageYOffset();
    // window.addEventListener('scroll', this.watchPageYOffset);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.watchPageYOffset);
  }

  watchPageYOffset() {
    // this.setState({ hasOffset: window.pageYOffset > 0 });
  }

  render() {
    const { children, isHome, isCredits } = this.props;
    return (
      <IdocProvider>
        <GlobalStyles />
        <IdocProvider invert>
          <Topbar
            allowNext={!isCredits}
            allowPrev={!isHome && !isCredits}
            isCredits={isCredits}
            isHome={isHome}
          />
        </IdocProvider>
        <main>{children}</main>
      </IdocProvider>
    );
  }
}

export default Layout;
