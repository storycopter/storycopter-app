import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { array, bool, node, oneOfType, object, shape, string } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

import { withTheme } from '@material-ui/styles';

import Baseline from '@storycopter/ui/src/themes/styles/Baseline';

import FooBar from './FooBar';
import Shortcuts from './Shortcuts';
import TopBar from './TopBar';

const Main = styled(({ fill, theme, ...props }) => <main {...props} />)`
  ${({ theme }) => theme.typography.body2};
  ${({ fill, theme }) => {
    if (fill.color) {
      return `
        background-color: ${fill.color ? fill.color : theme.palette.background.accent};
        `;
    }
    if (fill.image) {
      return `
        background-image: url(${fill.image.fixed.src});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        `;
    }
  }};
`;

const LayoutQuery = graphql`
  query LayoutQuery {
    covers: allFile(filter: { name: { eq: "cover" } }) {
      edges {
        node {
          childImageSharp {
            horizontal: fluid(maxWidth: 600, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            squarishFluidThumb: fluid(maxWidth: 400, maxHeight: 320, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            verticalFluidThumb: fluid(maxWidth: 300, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            horizontalFluidThumb: fluid(maxWidth: 600, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            smallFixedThumb: fixed(width: 160, height: 80, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          relativePath
        }
      }
    }
  }
`;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, contextData, fill, path, theme } = this.props;

    // console.group('Layout.js');
    // console.log({ contextData });
    // console.groupEnd();

    return (
      <StaticQuery
        query={LayoutQuery}
        render={data => {
          // fetch all pages’ covers
          const covers = data.covers.edges.map(el => el.node);

          // make up chapters' and essentials' data
          const consolidate = arr =>
            arr.map(el => ({
              ...el,
              cover: {
                ...el.cover,
                ..._.find(covers, o => o.relativePath.startsWith(el.uid)),
              },
            }));

          const chapters = consolidate(contextData.allChapters);
          const essentials = consolidate(contextData.allEssentials);
          const site = contextData.allSiteData;

          // create allPages array
          let allPages = chapters.map(el => el);
          allPages.unshift(_.find(essentials, o => o.uid === 'home'));
          allPages.push(_.find(essentials, o => o.uid === 'credits'));

          // define current page
          const currentPage = _.find(allPages, o => o.path === path);

          // find more about current page
          const currentPageI = _.findIndex(allPages, o => o.path === path);

          const isCurrentFirst = currentPageI === 0;
          const isCurrentLast = currentPageI === allPages.length - 1;

          const isCurrentContents = path === '/contents';
          const isCurrentCredits = path === '/credits';
          const isCurrentError = path === '/404';
          const isCurrentHome = path === '/';
          const isCurrentEssential = isCurrentContents || isCurrentCredits || isCurrentHome;

          // define next/prev pages
          const prevPage = isCurrentHome ? allPages[allPages.length - 1] : allPages[currentPageI - 1];
          const nextPage = isCurrentCredits ? allPages[0] : allPages[currentPageI + 1];

          // construct Table of Contents object
          const toc = {
            allPages,
            chapters,
            currentPage,
            currentPageI,
            essentials,
            nextPage,
            prevPage,
          };

          // console.group('Layout.js');
          // console.log({ data });
          // console.groupEnd();

          return (
            <>
              <Baseline />
              <TopBar
                {...this.props}
                isContents={isCurrentContents}
                isCredits={isCurrentCredits}
                isEssential={isCurrentEssential}
                isHome={isCurrentHome}
                site={site}
                toc={toc}
              />
              <Main fill={fill} theme={theme}>
                {children}
              </Main>
              {!isCurrentEssential ? (
                <Shortcuts isCredits={isCurrentCredits} isHome={isCurrentHome} toc={toc} {...this.props}></Shortcuts>
              ) : null}
              <FooBar {...this.props} isCredits={isCurrentCredits} isHome={isCurrentHome}></FooBar>
            </>
          );
        }}
      />
    );
  }
}

export default withTheme(Layout);

Layout.propTypes = {
  children: oneOfType([array, node, object, string]).isRequired,
  fill: shape({
    image: object,
    color: string,
  }),
  isCredits: bool,
  isHome: bool,
};

Layout.defaultProps = {
  fill: {
    color: 'transparent',
    image: null,
  },
  isCredits: null,
  isHome: null,
};
