import 'rc-texty/assets/index.css';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { breakpoint, color } from '../../settings';
import { setType, setSpace } from '../../mixins';

const useStyles = align =>
  makeStyles(theme => ({
    headlineRoot: {},
  }));

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
    if (fill && fill.color) {
      return `
        background-color: ${fill.color ? fill.color : theme.palette.background.accent};
        `;
    }
    if (fill && (fill.image || fill.raw)) {
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

export default function Headline({
  align = 'left',
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
    <Element align={align} cover={cover} fill={fill} id={id} mask={mask} theme={theme}>
      <Parent>
        <Child>
          {title ? (
            <Title>
              <h1 className="TitleText">{title}</h1>
            </Title>
          ) : null}
          {subtitle ? (
            <Subtitle>
              <h2 className="SubtitleText">{subtitle}</h2>
            </Subtitle>
          ) : null}
          {text ? (
            <Text>
              <h2 className="TextText">{text}</h2>
            </Text>
          ) : null}
          {children}
        </Child>
      </Parent>
    </Element>
  );
}

Headline.propTypes = {
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
