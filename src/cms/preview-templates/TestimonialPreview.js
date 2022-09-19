import React from "react";
import PropTypes from "prop-types";

import { TestimonialTemplate } from "../../components/Testimonials";

const TestimonialPagePreview = ({ entry, widgetFor }) => (
  <TestimonialTemplate
    avatar={entry.getIn(["data", "avatar"])}
    author={entry.getIn(["data", "author"])}
    role={entry.getIn(["data", "role"])}
    company={entry.getIn(["data", "company"])}
    html={widgetFor("body")}
  />
);

TestimonialPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default TestimonialPagePreview;
