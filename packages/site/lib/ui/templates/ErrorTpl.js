import {} from "prop-types";
import React from "react";

import { Helmet, Layout } from "ui/partials";

const ErrorTpl = props => {
  return (
    <>
      <Helmet {...props} title="Error!" />
      <Layout {...props}>
        <h1>Whoops.</h1>
      </Layout>
    </>
  );
};

ErrorTpl.propTypes = {};

export default ErrorTpl;
