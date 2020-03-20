import _ from 'lodash';

export default function utilFill(component, props, edges) {
  if (!props.fill || props.fill.length === 0) return null;
  return {
    name: props.fill,
    ..._.get(
      _.find(edges, o => o.node.childImageSharp.resize.originalName === `${component.id}-${props.fill}`),
      'node.childImageSharp'
    ),
  };
}
