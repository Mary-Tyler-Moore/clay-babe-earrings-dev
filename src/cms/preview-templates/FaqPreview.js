import React from "react";
import PropTypes from "prop-types";
import { FaqTemplate } from "../../components/Faq";

const FaqPagePreview = ({ entry, widgetFor }) => (
  <FaqTemplate
    answer={entry.getIn(["data", "answer"])}
    question={widgetFor("body")}
    open
  />
);

FaqPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default FaqPagePreview;
