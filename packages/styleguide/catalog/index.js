import { Catalog } from "@catalog/core";
import React from "react";
import ReactDOM from "react-dom";

const pages = [
  { path: "/", title: "Welcome", component: require("./pages/Welcome.md") },
  {
    component: require("./pages/components/Actions.js"),
    path: "/components/actions",
    title: "Actions"
  }
];

ReactDOM.render(
  <Catalog title="Storycopter" pages={pages} />,
  document.getElementById("catalog")
);
