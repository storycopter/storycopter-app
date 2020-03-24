import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Layout from './partials/Layout';
import componentMap from '@storycopter/ui/src/components/componentMap';
import docTheme from '@storycopter/ui/src/themes/docTheme';
import findChildImageSharp from './utils/findChildImageSharp';

export default function HomeTpl({
  data: {
    essential: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext,
  ...pageProps
}) {
  // console.group('HomeTpl.js');
  // console.log('pageMeta', pageMeta);
  // console.log('pageFiles', pageFiles);
  // console.log('pageContext', pageContext);
  // console.groupEnd();

  return (
    <ThemeProvider theme={docTheme}>
      <Layout pageContext={pageContext} location={pageProps.location}>
        {_.sortBy(pageElements, [o => o.order]).map(({ id, type, settings }, i) => {
          const Component = componentMap[type];

          // construct backgImage object
          const backgImage = {
            ...settings.backgImage,
            ...findChildImageSharp(pageFiles, settings.backgImage.name),
          };

          return <Component {...settings} key={id} backgImage={backgImage} fullSize />;
        })}
      </Layout>
    </ThemeProvider>
  );
}

export const pageQuery = graphql`
  query HomeTplQuery($uid: String!) {
    essential: essentialsJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      elements {
        id
        order
        type
        settings {
          align
          backgColor
          backgImageEnabled
          backgImage {
            name
          }
          fullSize
          maskColor
          subtitle
          text
          textColor
          title
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
