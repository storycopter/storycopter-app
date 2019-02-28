import { object, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import { favicon } from "@storycopter/styleguide";

const CustomHelmet = props => {
  const { location, title } = props;

  return (
    <Helmet
      encodeSpecialCharacters
      titleTemplate="Storycopter ⋅ %s"
      defaultTitle="Preparing for take off"
    >
      <html lang="en" amp />

      {/* META */}
      <meta name="charset" content="utf-8" />
      <meta name="coverage" content="Worldwide" />
      <meta
        name="description"
        content="A new interactive documentary production suite for the Web"
      />
      <meta name="distribution" content="Global" />
      <meta
        name="keywords"
        content="idoc, documentary, news, storytelling, media, editor, app, desktop, reportage, interactive"
      />
      <meta name="language" content="en" />
      <meta name="owner" content="Storycopter — https://storycopter.com" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="after 3 days" />
      <meta name="robots" content="index, follow" />
      <meta
        name="viewport"
        content="width=device-width, minimum-scale = 1.0, initial-scale = 1.0, maximum-scale = 5.0, user-scalable=yes, shrink-to-fit=no"
      />

      <title>{title}</title>

      {/* TWITTER */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@storycopter" />

      {/* FACEBOOK */}
      <meta
        property="og:description"
        content="A new interactive documentary production suite for the Web."
      />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content="Storycopter" />
      <meta property="og:url" content="https://storycopter.com" />
      <meta property="og:type" content="website" />

      {/* RELS */}
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link
        rel="canonical"
        href={`${"https://storycopter.com"}${location.pathname}`}
      />
    </Helmet>
  );
};

CustomHelmet.propTypes = {
  location: object.isRequired,
  title: string.isRequired
};

export default CustomHelmet;
