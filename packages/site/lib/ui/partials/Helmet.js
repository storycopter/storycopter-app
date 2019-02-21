import { object, string } from "prop-types";
import Helmet from "react-helmet";
import React from "react";

import meta from "config/meta";
import { favicon } from "assets/images";

const CustomHelmet = props => {
  const { description, location, keywords, title } = props;
  return (
    <Helmet
      encodeSpecialCharacters
      meta={[
        { name: "designer", content: meta.designer },
        { name: "author", content: meta.author },
        { name: "owner", content: meta.owner },
        { name: "title", content: title || meta.defaultTitle },
        {
          name: "description",
          content: description || meta.description
        },
        { name: "keywords", content: keywords || meta.keywords },
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
      defaultTitle={title || meta.defaultTitle}
      titleTemplate="%s"
    >
      <html lang="en" />

      <title>{title || meta.defaultTitle}</title>

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:creator" content={`@${meta.twitterHandle}`} /> */}
      {/* <meta name="twitter:image" content={ogcover} /> */}

      {/* Facebook OG */}
      <meta
        property="og:description"
        content={description || meta.description}
      />
      {/* <meta property="og:image:alt" content="Storycopter" /> */}
      {/* <meta property="og:image" content={ogcover} /> */}
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:title" content={meta.defaultTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />

      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="canonical" href={`${meta.url}${location.pathname}`} />
    </Helmet>
  );
};

CustomHelmet.propTypes = {
  description: string,
  location: object.isRequired,
  keywords: string,
  title: string
};

CustomHelmet.defaultProps = {
  description: null,
  keywords: null,
  title: null
};

export default CustomHelmet;
