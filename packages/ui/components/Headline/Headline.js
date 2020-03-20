import 'rc-texty/assets/index.css';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import Texty from 'rc-texty';
import styled from 'styled-components';

import { useTheme } from '@material-ui/core/styles';

import { breakpoint, color } from '../../settings';
import { setType, setSpace } from '../../mixins';

const Title = styled.div`
  .TitleText {
    ${setType('k')};
    font-family: ${({ theme }) => theme.typography.stack.primary};
  }
`;
const Subtitle = styled.div`
  ${setSpace('mtl')};
  .SubtitleText {
    ${setType('h')};
    font-family: ${({ theme }) => theme.typography.stack.secondary};
  }
`;
const Text = styled.div`
  ${setSpace('mtl')};
  .TextText {
    ${setType('l')};
    font-family: ${({ theme }) => theme.typography.stack.secondary};
  }
`;
const Child = styled.div`
  position: relative;
  z-index: 2;
`;
const Parent = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
`;
const Element = styled(
  ({ align, animate, fill, cover, mask, theme, ...props }) => (
    <section {...props} />
  )
)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

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

  ${({ fill, theme }) => {
    if (fill && fill.color) {
      return `
        background-color: ${
          fill.color ? fill.color : theme.palette.background.accent
        };
        `;
    }
    if (fill && (fill.image || fill.raw)) {
      return `
        background-image: url(${fill.raw ? fill.raw : fill.image.fixed.src});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-shadow: 0 2px 2px ${color.shadow300};
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

export default function Headline({
  align = 'left',
  animate = false,
  children = null,
  cover = false,
  fill = null,
  id,
  mask = null,
  subtitle,
  text = null,
  title,
  ...props
}) {
  const theme = useTheme();

  const splitString = e => {
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
  // console.log({ props });
  // console.groupEnd();

  return (
    <Element
      align={align}
      animate={animate}
      cover={cover}
      fill={fill}
      id={id}
      mask={mask}
      theme={theme}
    >
      {fill && fill.image && fill.image.name ? (
        <Img
          fixed={fill.image.fixed}
          style={{
            height: '1px',
            width: '1px',
            overflow: 'hidden',
            visibility: 'hidden',
          }}
        />
      ) : null}
      <Parent>
        <Child>
          {title ? (
            <Title>
              <h1 className="TitleText">
                {animate ? (
                  <Texty
                    component="span"
                    duration={500}
                    mode="smooth"
                    split={splitString}
                    type="top"
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
                    type="top"
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
                    type="top"
                  >
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

Headline.propTypes = {
  align: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  animate: PropTypes.bool,
  cover: PropTypes.bool,
  fill: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    color: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  mask: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string,
};
