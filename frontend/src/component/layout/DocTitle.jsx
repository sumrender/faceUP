import React from "react";
import Helmet from "react-helmet";

const DocTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default DocTitle;
