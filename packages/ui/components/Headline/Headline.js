import 'rc-texty/assets/index.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import Texty from 'rc-texty';
import styled from 'styled-components';
import { bool, func, object, string, shape } from 'prop-types';

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
  ${setSpace('mtl')};
  .SubtitleText {
    ${setType('h')};
    ${'' /* font-family: ${({ theme }) => theme.typography.stack.secondary}; */}
  }
`;
const Text = styled.div`
  ${setSpace('mtl')};
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
    if (fill.image.name) {
      return `
        background-image: url(${fill.image.fixed.src});
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

    // console.group('Headline.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <Element align={align} animate={animate} cover={cover} id={id} fill={fill} mask={mask} theme={theme}>
        {fill.image.name ? (
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
                    <Texty split={getSplit} type="top" mode="smooth" duration={500} component="span">
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
                      split={t => [t]}
                      type="top"
                      mode="smooth"
                      duration={500}
                      delay={300}
                      exclusive={true}
                      component="span">
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
                      split={t => [t]}
                      type="top"
                      mode="smooth"
                      duration={500}
                      delay={600}
                      exclusive={true}
                      component="span">
                      {text}
                    </Texty>
                  ) : (
                    text
                  )}
                </h2>
              </Text>
            ) : null}
            {children && animate ? (
              <Texty
                split={t => [t]}
                type="top"
                mode="smooth"
                duration={500}
                delay={600}
                exclusive={true}
                component="span">
                {children}
              </Texty>
            ) : (
              children
            )}
          </Child>
        </Parent>
      </Element>
    );
  }
}

export default withTheme(Headline);

Headline.propTypes = {
  align: string.isRequired,
  animate: bool.isRequired,
  cover: bool.isRequired,
  fill: shape({
    image: object.isRequired,
    color: string,
  }),
  mask: string,
  subtitle: string.isRequired,
  text: string.isRequired,
  theme: object.isRequired,
};

Headline.defaultProps = {
  fill: {
    color: 'transparent',
    image: null,
  },
  mask: null,
};
