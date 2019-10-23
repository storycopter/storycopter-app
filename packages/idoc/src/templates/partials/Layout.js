import React, { Component } from 'react';
import { array, bool } from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import _ from 'lodash';
import styled from 'styled-components';

import { IdocProvider } from '@storycopter/ui/providers';

import FooBar from './FooBar';
import GlobalStyles from './GlobalStyles';
import Shortcuts from './Shortcuts';
import TopBar from './TopBar';

const Main = styled.main``;

const LayoutQuery = graphql`
  query LayoutQuery {
    chapters: allChaptersJson(sort: { fields: meta___order }) {
      edges {
        node {
          meta {
            cover {
              name
            }
            order
            path
            text
            title
            uid
          }
        }
      }
    }
    essentials: allEssentialsJson {
      edges {
        node {
          id
          meta {
            cover {
              name
            }
            path
            text
            title
            uid
          }
        }
      }
    }
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
    const { children, isHome, isCredits, path } = this.props;

    return (
      <IdocProvider>
        <StaticQuery
          query={LayoutQuery}
          render={data => {
            // fetch all pages’ covers
            const covers = data.covers.edges.map(el => el.node);

            // make up chapters' and essentials' data
            const consolidate = arr =>
              arr
                .map(el => el.node.meta)
                .map(el => ({
                  ...el,
                  cover: {
                    ...el.cover,
                    ..._.find(covers, o => o.relativePath.startsWith(el.uid)),
                  },
                }));

            const chapters = consolidate(data.chapters.edges);
            const essentials = consolidate(data.essentials.edges);

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

            const isCurrentCredits = path === '/credits';
            const isCurrentHome = path === '/';

            // define next/prev pages
            const prevPage = isCurrentFirst ? allPages[allPages.length - 1] : allPages[currentPageI - 1];
            const nextPage = isCurrentLast ? allPages[0] : allPages[currentPageI + 1];

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

            return (
              <>
                <GlobalStyles />
                <IdocProvider invert>
                  <TopBar isCredits={isCurrentCredits} isHome={isCurrentHome} toc={toc} {...this.props} />
                </IdocProvider>
                <Main>{children}</Main>
                {!isCurrentCredits && !isCurrentHome ? (
                  <Shortcuts isCredits={isCurrentCredits} isHome={isCurrentHome} toc={toc} {...this.props}></Shortcuts>
                ) : null}
                <FooBar isCredits={isCurrentCredits} isHome={isCurrentHome} {...this.props}></FooBar>
              </>
            );
          }}
        />
      </IdocProvider>
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: array.isRequired,
  isCredits: bool,
  isHome: bool,
};

Layout.defaultProps = {
  isCredits: null,
  isHome: null,
};
