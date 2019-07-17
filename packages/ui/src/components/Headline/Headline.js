import { bool, object, string } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Element = styled(({ animate, cover, ...props }) => <div {...props} />)`
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
  }}
`;

class Headline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { animate, cover, subtitle, title } = this.props;
    return (
      <Element
        bgcolor="cyan"
        color="text.primary"
        //
        cover={cover}
        animate={animate}
      >
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
      </Element>
    );
  }
}

export default Headline;

Headline.propTypes = {
  animate: bool,
  background: object,
  cover: bool,
  subtitle: string,
};
Headline.defaultProps = {
  animate: null,
  background: null,
  cover: null,
  subtitle: null,
  title: null,
};
