import _ from 'lodash';

const utilFill = (component, props, edges) => {
  return props.fill
    ? {
        color: props.fill.color ? props.fill.color : null,
        image: {
          name: props.fill.image,
          ..._.get(
            _.find(edges, o => o.node.childImageSharp.resize.originalName === `${component.id}-${props.fill.image}`),
            'node.childImageSharp'
          ),
        },
      }
    : null;
};

export default utilFill;
