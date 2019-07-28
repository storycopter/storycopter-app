import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { bool, func, object, string } from 'prop-types';

import { setType, setSpace } from '@storycopter/ui/mixins';
import { breakpoint } from '@storycopter/ui/settings';

const Title = styled.h1`
  ${setType('k')};
  font-family: ${({ theme }) => theme.typography.stack.primary};
`;
const Subtitle = styled.h2`
  ${setType('h')};
  font-family: ${({ theme }) => theme.typography.stack.secondary};
`;

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

  ${breakpoint.phone} {
    ${setSpace('pam')};
  }
  ${breakpoint.tablet} {
    ${setSpace('pal')};
  }
  ${breakpoint.desktop} {
    ${setSpace('pah')};
  }

  ${Title} {
  }
  ${Subtitle} {
  }
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
      theme,
      title,
      updateSelf,
    } = this.props;

    console.group('Headline.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Element animate={animate} cover={cover}>
        {title ? (
          <Title
            contentEditable={this.state.edit === 'title'}
            onClick={updateSelf ? () => this.enterEditMode('title') : null}
          >
            {title}
          </Title>
        ) : null}
        {subtitle ? (
          <Subtitle
            contentEditable={this.state.edit === 'subtitle'}
            onClick={updateSelf ? () => this.enterEditMode('subtitle') : null}
          >
            {subtitle}
          </Subtitle>
        ) : null}
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
