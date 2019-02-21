import { Catalog } from "@catalog/core";
import React from "react";
import ReactDOM from "react-dom";

const pages = [
  {
    component: require("./pages/Welcome.md"),
    hideFromMenu: true,
    path: "/",
    title: "Welcome"
  },
  {
    component: require("./pages/components/Actions.js"),
    path: "/components/actions",
    title: "Actions"
  }
];

ReactDOM.render(
  <Catalog
    // logoSrc={string}
    pages={pages}
    responsiveSizes={[
      { name: "watch", width: 272, height: 340 },
      { name: "tablet", width: 1024, height: 768 },
      { name: "desktop", width: 1920, height: 1080 }
    ]}
    theme={require("./theme.js")}
    title="Storycopter"
  />,
  document.getElementById("catalog")
);
