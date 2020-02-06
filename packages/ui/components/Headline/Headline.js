import 'rc-texty/assets/index.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import Texty from 'rc-texty';
import styled from 'styled-components';
import { bool, object, oneOfType, string, shape } from 'prop-types';

import { withTheme } from '@material-ui/styles';

import { breakpoint, color } from '@storycopter/ui/settings';
import { setType, setSpace } from '@storycopter/ui/mixins';

const Title = styled.div`
  .TitleText {
    ${setType('k')};
    ${'' /* font-family: ${({ theme }) => theme.typography.stack.primary}; */}
  }
`;
const Subtitle = styled.div`
  ${setSpace('mtm')};
  .SubtitleText {
    ${setType('h')};
    ${'' /* font-family: ${({ theme }) => theme.typography.stack.secondary}; */}
  }
`;
const Text = styled.div`
  ${setSpace('mtm')};
  .TextText {
    ${setType('l')};
    ${'' /* font-family: ${({ theme }) => theme.typography.stack.secondary}; */}
  }
`;
const Child = styled.div`
  position: relative;
  z-index: 2;
`;
const Parent = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1600px;
  width: 100%;
`;
const Append = styled.div`
  ${setSpace('mtl')};
`;
const Element = styled(({ align, animate, cover, fill, mask, theme, ...props }) => <section {...props} />)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  color: ${({ theme }) => theme.palette.text.primary};

  ${breakpoint.phone} {
    ${setSpace('pal')};
  }
  ${breakpoint.tablet} {
    ${setSpace('pah')};
  }
  ${breakpoint.desktopPlus} {
    ${setSpace('pak')};
    ${Child} {
      flex: 0 0 ${(100 / 3) * 2}%;
    }
  }
  ${breakpoint.hdesktopPlus} {
    ${setSpace('pak')};
    ${Child} {
      flex: 0 0 ${100 / 2}%;
    }
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

  ${({ fill, theme }) => {
    if (fill.color) {
      return `
        background-color: ${fill.color ? fill.color : theme.palette.background.accent};
        `;
    }
    if (fill.image || fill.raw) {
      console.log('HERE', fill);
      return `
        background-image: url(${fill.raw ? fill.raw : fill.image.fixed.src});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        `;
    }
  }};

  ${({ mask }) => {
    if (mask) {
      return `
      &:before {
        background: ${mask === 'dark' ? color.shadow500 : color.flare500};
        bottom: 0;
        content: " ";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
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
    this.state = {};
  }

  render() {
    const { align, animate, children, cover, fill, id, mask, subtitle, text, theme, title } = this.props;

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
      <Element align={align} animate={animate} cover={cover} fill={fill} id={id} mask={mask} theme={theme}>
        {fill.image && fill.image.name ? (
          <Img
            fixed={fill.image.fixed}
            style={{ height: '1px', width: '1px', overflow: 'hidden', visibility: 'hidden' }}
          />
        ) : null}
        <Parent>
          <Child>
            {title ? (
              <Title>
                <h1 className="TitleText">
                  {animate ? (
                    <Texty component="span" duration={500} mode="smooth" split={getSplit} type="top">
                      {title}
                    </Texty>
                  ) : (
                    title
                  )}
                </h1>
              </Title>
            ) : null}
            {subtitle ? (
              <Subtitle>
                <h2 className="SubtitleText">
                  {animate ? (
                    <Texty
                      component="span"
                      delay={300}
                      duration={500}
                      exclusive={true}
                      mode="smooth"
                      split={t => [t]}
                      type="top">
                      {subtitle}
                    </Texty>
                  ) : (
                    subtitle
                  )}
                </h2>
              </Subtitle>
            ) : null}
            {text ? (
              <Text>
                <h2 className="TextText">
                  {animate ? (
                    <Texty
                      component="span"
                      delay={600}
                      duration={500}
                      exclusive={true}
                      mode="smooth"
                      split={t => [t]}
                      type="top">
                      {text}
                    </Texty>
                  ) : (
                    text
                  )}
                </h2>
              </Text>
            ) : null}
            {children && animate ? <Append>{children}</Append> : children}
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
  cover: bool,
  fill: shape({
    image: oneOfType([object, string]),
    color: string,
  }),
  mask: string,
  subtitle: string.isRequired,
  text: string,
  theme: object.isRequired,
};

Headline.defaultProps = {
  align: 'left',
  animate: false,
  cover: false,
  fill: {
    color: 'transparent',
    image: null,
  },
  mask: null,
  text: null,
};
