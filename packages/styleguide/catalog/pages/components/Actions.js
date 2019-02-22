import { markdown, ReactSpecimen } from "@catalog/core";
import React from "react";

import { Action } from "@storycopter/styleguide";

export default () => markdown`

# Actions

${(
  <ReactSpecimen>
    <Action onClick={() => console.log("onClick")}>Action</Action>
  </ReactSpecimen>
)}

`;
