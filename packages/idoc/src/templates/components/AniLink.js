import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React from 'react';
import { withTheme } from '@material-ui/styles';

const CustomAniLink = props => {
  return <AniLink bg={props.theme.palette.background.accent} cover direction="down" duration={0} {...props} />;
};

export default withTheme(CustomAniLink);
