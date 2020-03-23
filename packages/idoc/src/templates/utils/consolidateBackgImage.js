import _ from 'lodash';

export default function utilFill(component, settings, edges) {
  if (!settings.backgImage || settings.backgImage.length === 0) return null;
  return {
    name: settings.backgImage,
    ..._.get(
      _.find(edges, o => o.node.childImageSharp.resize.originalName === `${component.id}-${settings.backgImage}`),
      'node.childImageSharp'
    ),
  };
}
