import React from "react";
import { bool, oneOfType, array, object, string } from "prop-types";

import Button from "./Button";
import Link from "./Link";
import withObfuscation from "./withObfuscation";

const ObfButton = withObfuscation(Button);
const ObfLink = withObfuscation(Link);

const Action = props => {
  const { obfuscated, isButton } = props;
  if (obfuscated) {
    if (isButton) {
      return <ObfButton {...props} />;
    }
    return <ObfLink {...props} />;
  }
  if (isButton) {
    return <Button {...props} />;
  }
  return <Link {...props} />;
};

Action.propTypes = {
  isButton: bool,
  children: oneOfType([array, object, string]),
  href: string,
  obfuscated: bool
};

Action.defaultProps = {
  isButton: null,
  children: null,
  href: null,
  obfuscated: null
};

export default Action;
