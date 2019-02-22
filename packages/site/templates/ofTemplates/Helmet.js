import { object, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import { favicon } from "@storycopter/styleguide/src/assets";

const CustomHelmet = props => {
  const { location, title } = props;

  return (
    <Helmet
      encodeSpecialCharacters
      meta={[
        { name: "owner", content: "Storycopter — https://storycopter.com" },
        { name: "title", content: title || "Storycopter" },
        {
          name: "description",
          content: "A new interactive documentary production suite for the Web."
        },
        {
          name: "keywords",
          content:
            "idoc, documentary, news, storytelling, media, editor, app, desktop, reportage, interactive"
        },
        { name: "charset", content: "utf-8" },
        { name: "coverage", content: "Worldwide" },
        { name: "distribution", content: "Global" },
        { name: "language", content: "en" },
        { name: "rating", content: "General" },
        { name: "revist-after", content: "after 3 days" },
        { name: "robots", content: "index, follow" },
        {
          name: "viewport",
          content:
            "width=device-width, minimum-scale = 1.0, initial-scale = 1.0, maximum-scale = 5.0, user-scalable=yes, shrink-to-fit=no"
        }
      ]}
      defaultTitle={title || "Storycopter"}
      titleTemplate="%s"
    >
      <html lang="en" />

      <title>{title || "Storycopter"}</title>

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:creator" content={`@${meta.twitterHandle}`} /> */}
      {/* <meta name="twitter:image" content={ogcover} /> */}

      {/* Facebook OG */}
      <meta
        property="og:description"
        content="A new interactive documentary production suite for the Web."
      />
      {/* <meta property="og:image:alt" content="Storycopter" /> */}
      {/* <meta property="og:image" content={ogcover} /> */}
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content="Storycopter" />
      <meta property="og:title" content="Storycopter" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://storycopter.com" />

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
  title: string
};

CustomHelmet.defaultProps = {
  title: null
};

export default CustomHelmet;
