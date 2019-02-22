import { markdown, ReactSpecimen } from "@catalog/core";
import React from "react";

import { Button } from "@storycopter/styleguide";

export default () => markdown`

# Actions

${(
  <ReactSpecimen>
    <Button onClick={() => console.log("onClick")}>Button</Button>
  </ReactSpecimen>
)}

`;
