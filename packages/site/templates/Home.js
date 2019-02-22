import {} from "prop-types";
import React from "react";

import { Helmet, Layout } from "ofTemplates";

import { SignupForm } from "./ofHome";

const HomeTpl = props => {
  return (
    <>
      <Helmet {...props} title="Storycopter ⋅ Preparing for take off." />
      <Layout {...props}>
        <h1>Storycopter. Preparing for take off.</h1>
        <SignupForm />
      </Layout>
    </>
  );
};

HomeTpl.propTypes = {};

export default HomeTpl;
