import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { docTheme } from '@storycopter/ui/src/themes';
import { setSpace } from '@storycopter/ui/src/mixins';

import Layout from './partials/Layout';
import Tile from './components/Tile';

const TileContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flexwrap: wrap;
  justifycontent: space-around;
  overflow: hidden;
  .slick-slide {
    ${setSpace('phk')};
  }
`;

const TileWrapper = styled(GridListTile)`
  & > * {
    ${setSpace('phl')};
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TilesHd = styled.div`
  ${setSpace('phk')};
  ${setSpace('pbh')};
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  flex: 0 0 30%;
  justify-content: space-between;
  width: 100%;
`;

const Tiles = styled.div``;

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class ContentsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTile: 0 };
  }

  render() {
    const { classes, path } = this.props;
    const { contextData } = this.props.pageContext;

    // LAYOUT LOGIC ENTERS HERE:

    const allCovers = this.props.data.allCovers.edges.map(el => el.node);

    // make up chapters' and essentials' data
    const consolidate = arr =>
      arr.map(el => ({
        ...el,
        cover: el.cover
          ? {
              ...el.cover,
              ..._.find(allCovers, o => o.relativePath.startsWith(el.uid)),
            }
          : null,
      }));

    const allChapters = consolidate(contextData.allChapters);
    const allEssentials = consolidate(contextData.allEssentials);
    const allSiteData = contextData.allSiteData;

    // create allPages array
    let allPages = allChapters.map(el => el);
    allPages.unshift(_.find(allEssentials, o => o.uid === 'home'));
    allPages.push(_.find(allEssentials, o => o.uid === 'credits'));

    // define current page
    const currentPage = _.find(allPages, o => o.path === path);

    // find out more about current page
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
      allChapters,
      allEssentials,
      allPages,
      allSiteData,
      currentPage,
      currentPageI,
      nextPage,
      prevPage,
    };

    // LAYOUT LOGIC ENDS HERE ^

    console.group('ContentsTpl.js');
    console.log(this.props);
    console.log({ contextData });
    console.log({ allCovers });
    console.log({ allEssentials });
    console.log({ allPages });
    console.log({ toc });
    console.groupEnd();

    return (
      <ThemeProvider theme={docTheme}>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.pageData.meta.path}>
          <TileContainer>
            <GridList cols={allChapters.length} spacing={1} cellHeight="auto" className={classes.gridList}>
              {allChapters.map(chapter => {
                const { cover, order, path, text, title } = chapter;
                return (
                  <TileWrapper
                    className={classes.gridListTile}
                    key={order}
                    rows={1}
                    cols={2.3}
                    onClick={() => this.setState({ selectedTile: order })}>
                    <Tile
                      cover={cover}
                      isActive={this.state.selectedTile === order}
                      path={path}
                      text={text}
                      title={title}></Tile>
                  </TileWrapper>
                );
              })}
            </GridList>
          </TileContainer>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(ContentsTpl);

export const pageQuery = graphql`
  query ContentsTplQuery($uid: String!) {
    pageData: essentialsJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          id
          invert
          order
          type
          props {
            align
            animate
            cover
            fill {
              image
              color
            }
            mask
            subtitle
            text
            title
          }
        }
      }
    }
    allCovers: allFile(filter: { name: { eq: "cover" } }) {
      edges {
        node {
          childImageSharp {
            tileSize: fluid(maxWidth: 300, maxHeight: 400, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`;
