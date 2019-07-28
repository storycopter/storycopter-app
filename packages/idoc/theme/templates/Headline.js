import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { bool, func, object, string } from 'prop-types';

import Box from '@material-ui/core/Box';

const Element = styled(({ animate, cover, background, theme, ...props }) => (
  <section {...props} />
))`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ cover }) => {
    if (cover) {
      return `
        min-height: 100vh;
        min-width: 100vw;
      `;
    }
  }};
`;

class Headline extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
    this.enterEditMode = this.enterEditMode.bind(this);
  }

  enterEditMode(node) {
    this.setState({ edit: node });
  }

  render() {
    const {
      align,
      animate,
      background,
      color,
      cover,
      subtitle,
      title,
    } = this.props;

    return (
      <Element animate={animate} cover={cover}>
        <Box p={12}>
          {title ? (
            <h1
              gutterBottom={subtitle ? true : false}
              variant="h1"
              // contentEditable={this.state.edit === 'title'}
              // onClick={updateSelf ? () => this.enterEditMode('title') : null}
            >
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <h2
              variant="h2"
              // contentEditable={this.state.edit === 'subtitle'}
              // onClick={updateSelf ? () => this.enterEditMode('subtitle') : null}
            >
              {subtitle}
            </h2>
          ) : null}
        </Box>
      </Element>
    );
  }
}

export default withTheme(Headline);

Headline.propTypes = {
  align: string,
  animate: bool,
  color: string,
  cover: bool,
  fill: object,
  subtitle: string,
  updateSelf: func,
};
Headline.defaultProps = {
  align: 'left',
  animate: null,
  color: 'primary',
  cover: null,
  fill: null,
  subtitle: null,
  title: null,
  updateSelf: null,
};
