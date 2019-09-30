import 'rc-texty/assets/index.css';
import React, { Component } from 'react';
import Texty from 'rc-texty';
import styled from 'styled-components';
import { bool, func, object, string } from 'prop-types';
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
const Element = styled(({ align, animate, image, cover, mask, theme, ...props }) => <section {...props} />)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  background-color: ${({ theme }) => theme.palette.background.accent};
  color: ${({ theme }) => theme.palette.text.primary};

  ${breakpoint.phone} {
    ${setSpace('pal')};
  }
  ${breakpoint.tablet} {
    ${setSpace('pah')};
  }
  ${breakpoint.desktopUp} {
    ${setSpace('pak')};
    ${Child} {
      flex: 0 0 ${(100 / 3) * 2}%;
    }
  }
  ${breakpoint.hdesktopUp} {
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

  ${({ image }) => {
    if (image) {
      return `
        background: url(${image.fixed.src});
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
    this.state = { edit: null };
    this.enterEditMode = this.enterEditMode.bind(this);
    // this.titleRef = createRef();
    // this.subtitleRef = createRef();
    // this.textRef = createRef();
  }

  enterEditMode(node) {
    this.setState({ edit: node });
  }

  render() {
    const { align, anchor, animate, cover, image, mask, subtitle, text, theme, title, updateSelf } = this.props;

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
      <Element align={align} animate={animate} cover={cover} image={image} id={anchor} mask={mask} theme={theme}>
        <Parent>
          <Child>
            {title ? (
              <Title
                contentEditable={this.state.edit === 'title'}
                onClick={updateSelf ? () => this.enterEditMode('title') : null}
                // ref={this.titleRef}
              >
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
              <Subtitle
                contentEditable={this.state.edit === 'subtitle'}
                onClick={updateSelf ? () => this.enterEditMode('subtitle') : null}
                onChange={e => console.log(e)}
                // ref={this.subtitleRef}
              >
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
              <Text
                contentEditable={this.state.edit === 'text'}
                onClick={updateSelf ? () => this.enterEditMode('text') : null}
                // ref={this.textRef}
              >
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
          </Child>
        </Parent>
      </Element>
    );
  }
}

export default withTheme(Headline);

Headline.propTypes = {
  align: string,
  anchor: string,
  animate: bool,
  cover: bool,
  image: object,
  mask: string,
  subtitle: string,
  text: string,
  theme: object,
  updateSelf: func,
};
Headline.defaultProps = {
  align: 'left',
  anchor: null,
  animate: null,
  cover: null,
  image: null,
  mask: null,
  subtitle: null,
  text: null,
  theme: null,
  title: null,
  updateSelf: null,
};
