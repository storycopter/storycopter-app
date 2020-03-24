import _ from 'lodash';

export default function findChildImageSharp(edges, name) {
  if (!name) return null;
  return _.find(
    edges.map(e => e.node.childImageSharp),
    o => o.resize.originalName === name
  );
}
