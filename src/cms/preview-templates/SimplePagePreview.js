import React from "react";
import PropTypes from "prop-types";
import { SimplePageTemplate } from "../../templates/SimplePage";

const SimplePagePreview = ({ entry, widgetFor }) => (
  <SimplePageTemplate
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
);

SimplePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default SimplePagePreview;
