import {} from "prop-types";
import React from "react";

import { Helmet, Layout } from "ui/partials";

const HomeTpl = props => {
  return (
    <>
      <Helmet {...props} title="Roger!" />
      <Layout {...props}>
        <h1>Storycopter. Preparing for take off.</h1>
      </Layout>
    </>
  );
};

HomeTpl.propTypes = {};

export default HomeTpl;
