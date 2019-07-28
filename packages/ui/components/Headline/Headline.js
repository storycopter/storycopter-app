import 'rc-texty/assets/index.css';
import React, { Component } from 'react';
import Texty from 'rc-texty';
import styled, { withTheme } from 'styled-components';
import { bool, func, object, string } from 'prop-types';

import { setType, setSpace } from '@storycopter/ui/mixins';
import { breakpoint } from '@storycopter/ui/settings';

const Title = styled.div`
  .TitleText {
    ${setType('k')};
    font-family: ${({ theme }) => theme.typography.stack.primary};
  }
`;
const Subtitle = styled.div`
  .SubtitleText {
    ${setType('h')};
    font-family: ${({ theme }) => theme.typography.stack.secondary};
  }
`;
const Child = styled.div`
  flex: 0 0 ${(100 / 3) * 2}%;
`;
const Parent = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
`;
const Element = styled(
  ({ align, animate, background, cover, theme, ...props }) => (
    <section {...props} />
  )
)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${breakpoint.phone} {
    ${setSpace('pam')};
  }
  ${breakpoint.tablet} {
    ${setSpace('pal')};
  }
  ${breakpoint.desktop} {
    ${setSpace('pah')};
  }
  ${breakpoint.hdesktop} {
    ${setSpace('pak')};
  }

  ${({ align }) => {
    if (align === 'center') {
      return `
        ${Parent} {
          justify-content: center;
          text-align: center;
        }
        `;
    } else if (align === 'right')
      return `
        ${Parent} {
          justify-content: flex-end;
        }
      `;
  }};

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
      cover,
      subtitle,
      theme,
      title,
      updateSelf,
    } = this.props;

    const getSplit = e => {
      const t = e.split(' ');
      const c = [];
      t.forEach((str, i) => {
        c.push(<span key={`${str}-${i}`}>{str}</span>);
        if (i < t.length - 1) {
          c.push(<span key={` -${i}`}> </span>);
        }
      });
      return c;
    };

    // console.group('Headline.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <Element
        align={align}
        animate={animate}
        background={background}
        cover={cover}
        theme={theme}
      >
        <Parent>
          <Child>
            {title ? (
              <Title
                contentEditable={this.state.edit === 'title'}
                onClick={updateSelf ? () => this.enterEditMode('title') : null}
              >
                <h1 className="TitleText">
                  {animate ? (
                    <Texty
                      split={getSplit}
                      type="top"
                      mode="smooth"
                      duration={450}
                      component="span"
                    >
                      {title}
                    </Texty>
                  ) : (
                    title
                  )}
                </h1>
              </Title>
            ) : null}
            {subtitle ? (
              <Subtitle
                contentEditable={this.state.edit === 'subtitle'}
                onClick={
                  updateSelf ? () => this.enterEditMode('subtitle') : null
                }
              >
                <p className="SubtitleText">
                  {animate ? (
                    <Texty
                      split={getSplit}
                      type="top"
                      mode="smooth"
                      duration={450}
                      delay={600}
                      exclusive={true}
                      component="span"
                    >
                      {subtitle}
                    </Texty>
                  ) : (
                    subtitle
                  )}
                </p>
              </Subtitle>
            ) : null}
          </Child>
        </Parent>
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
