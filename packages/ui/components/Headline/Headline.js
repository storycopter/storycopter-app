import 'rc-texty/assets/index.css';
import React, { Component } from 'react';
import Texty from 'rc-texty';
import styled, { withTheme } from 'styled-components';
import { bool, func, object, string } from 'prop-types';

import { setType, setSpace } from '@storycopter/ui/mixins';
import { breakpoint, color } from '@storycopter/ui/settings';

const Title = styled.div`
  .TitleText {
    ${setType('k')};
    font-family: ${({ theme }) => theme.typography.stack.primary};
  }
`;
const Subtitle = styled.div`
  ${setSpace('mtm')};
  .SubtitleText {
    ${setType('h')};
    font-family: ${({ theme }) => theme.typography.stack.secondary};
  }
`;
const Text = styled.div`
  ${setSpace('mtm')};
  .TextText {
    ${setType('l')};
    font-family: ${({ theme }) => theme.typography.stack.secondary};
  }
`;
const Child = styled.div``;
const Parent = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
`;
const Element = styled(({ align, animate, fill, cover, theme, ...props }) => (
  <section {...props} />
))`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.palette.accent};
  color: ${({ theme }) => theme.colors.palette.text};

  ${breakpoint.phone} {
    ${setSpace('pal')};
  }
  ${breakpoint.tablet} {
    ${setSpace('pah')};
  }
  ${breakpoint.desktopUp} {
    ${setSpace('pak')};
    ${Child} {
      flex: 0 0 ${(100 / 4) * 3}%;
    }
  }
  ${breakpoint.hdesktopUp} {
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

  ${({ fill }) => {
    if (fill) {
      return `
        background: ${fill};
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-shadow: 0 2px 2px ${color.shadow500};
        `;
    }
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
      fill,
      cover,
      subtitle,
      theme,
      text,
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

    console.group('Headline.js');
    console.log(this.props);
    console.groupEnd();

    return (
      <Element
        align={align}
        animate={animate}
        cover={cover}
        fill={fill}
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
                      duration={500}
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
                <h2 className="SubtitleText">
                  {animate ? (
                    <Texty
                      split={t => [t]}
                      type="top"
                      mode="smooth"
                      duration={500}
                      delay={700}
                      exclusive={true}
                      component="span"
                    >
                      {subtitle}
                    </Texty>
                  ) : (
                    subtitle
                  )}
                </h2>
              </Subtitle>
            ) : null}
            {text ? (
              <Text
                contentEditable={this.state.edit === 'text'}
                onClick={updateSelf ? () => this.enterEditMode('text') : null}
              >
                <h2 className="TextText">
                  {animate ? (
                    <Texty
                      split={t => [t]}
                      type="top"
                      mode="smooth"
                      duration={500}
                      delay={800}
                      exclusive={true}
                      component="span"
                    >
                      {text}
                    </Texty>
                  ) : (
                    text
                  )}
                </h2>
              </Text>
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
  fill: string,
  subtitle: string,
  text: string,
  theme: object,
  updateSelf: func,
};
Headline.defaultProps = {
  align: 'left',
  animate: null,
  color: 'primary',
  cover: null,
  fill: null,
  subtitle: null,
  text: null,
  title: null,
  theme: null,
  updateSelf: null,
};
