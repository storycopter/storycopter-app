import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React from 'react';
import { withTheme } from '@material-ui/styles';

const CustomAniLink = ({ theme, ...props }) => {
  return <AniLink bg={theme.palette.background.accent} cover direction="down" duration={2} {...props} />;
};

export default withTheme(CustomAniLink);
