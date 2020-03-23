import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { docTheme } from '@storycopter/ui/src/themes';
import { Action, ActionBar, Headline } from '@storycopter/ui/src/components';
import { track } from '@storycopter/ui/src/settings';
import { setSpace, setType } from '@storycopter/ui/src/mixins';

import Layout from './partials/Layout';
import consolidateBackgImage from './utils/consolidateBackgImage';

const StartButton = styled(Link)`
  border-color: white;
`;
const IndexButton = styled(Link)`
  border-color: transparent;
`;
const OpeningActions = styled.div`
  ${setSpace('mtl')};
  align-items: center;
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  & > * {
    ${setSpace('mas')}
    ${setSpace('phm')};
    ${setSpace('pvs')};
    ${setType('s')};
    border-style: solid;
    border-width: 2px;
    color: white;
    letter-spacing: ${track.m};
    text-transform: uppercase;
    &:hover {
      background-color: white;
      border-color: white;
      color: black;
    }
  }
`;
const OpeningTitles = styled(Headline)``;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: {
        essential: {
          tree: { components },
        },
        files: { edges },
      },
    } = this.props;

    const titlesProps = this.props.data.essential.tree.components[0].settings;
    const initialPath = this.props.data.pages.edges[0].node.meta.path;

    return (
      <ThemeProvider theme={docTheme}>
        <Layout
          contextData={this.props.pageContext.contextData}
          location={this.props.location}
          path={this.props.data.essential.meta.path}>
          {_.sortBy(components, [o => o.order]).map(component => {
            const { settings } = component;

            // consolidate settings.backgImage w/ graphql-ed image data
            const backgImage = consolidateBackgImage(component, settings, edges);

            // console.group('Home.js');
            // console.log(this.props);
            // console.groupEnd();

            return (
              <OpeningTitles {...titlesProps} cover backgImage={backgImage} id={component.id} key={component.id}>
                <ActionBar>
                  <StartButton to={initialPath}>
                    <Action as="span" primary>
                      Start exploring
                    </Action>
                  </StartButton>
                  <IndexButton to="/contents">
                    <Action as="span">Discover contents</Action>
                  </IndexButton>
                </ActionBar>
              </OpeningTitles>
            );
          })}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default Home;

export const pageQuery = graphql`
  query HomeTplQuery($uid: String!) {
    essential: essentialsJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      tree {
        components {
          id
          order
          type
          settings {
            align
            backgColor
            backgImage
            cover
            maskColor
            subtitle
            text
            textColor
            title
          }
        }
      }
    }
    pages: allPagesJson(sort: { fields: meta___order }) {
      edges {
        node {
          meta {
            order
            path
            title
          }
        }
      }
    }
    files: allFile(filter: { relativeDirectory: { eq: $uid } }) {
      edges {
        node {
          childImageSharp {
            resize(quality: 95, width: 1400) {
              originalName
              src
            }
            fluid(maxWidth: 2000, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1400, height: 900, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
