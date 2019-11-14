import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Slider from 'react-slick';

import { setSpace } from '@storycopter/ui/mixins';
import { IdocProvider } from '@storycopter/ui/providers';

import Layout from './partials/Layout';
import Tile from './components/Tile';

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
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
const Tiles = styled.div`
  .horizontal-menu {
    bottom: 0;
    height: 100vh;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
  }
  .menu-wrapper {
  }
  .menu-wrapper--inner {
  }
  .menu-item-wrapper {
    height: 500px;
    background: yellow;
    border: 5px solid transparent;
    &:focus {
      outline: none;
    }
  }
  .menu-item-wrapper.active {
    border-color: orange;
  }
`;

class ContentsTpl extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }
  onSelect = key => {
    this.setState({ selected: key });
  };

  render() {
    const { allChapters } = this.props.pageContext.contextData;
    const { selected } = this.state;

    console.group('ContentsTpl.js');
    console.log(this.props);
    console.groupEnd();

    const settings = {
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: false,
      dots: true,
      focusOnSelect: true,
      infinite: false,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      pauseOnHover: true,
      slidesToScroll: 1,
      slidesToShow: 3,
      swipeToSlide: true,
    };

    return (
      <IdocProvider>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.essential.meta.path}>
          <TileContainer>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {allChapters.map((chapter, i) => {
                return <Tile key={i} title={chapter.title} text={chapter.text} path={chapter.path}></Tile>;
              })}
            </Slider>

            {/* <TilesHd>
              <h1>Contents</h1>
              <p>Some text</p>
            </TilesHd>
            <Tiles>
              {allChapters.map((chapter, i) => {
                return <Tile key={i} title={chapter.title} text={chapter.text} path={chapter.path}></Tile>;
              })}
            </Tiles> */}
          </TileContainer>
        </Layout>
      </IdocProvider>
    );
  }
}

export default ContentsTpl;

export const pageQuery = graphql`
  query ContentsTplQuery($uid: String!) {
    essential: essentialsJson(meta: { uid: { eq: $uid } }) {
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
