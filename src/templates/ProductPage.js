import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";
import ProductDetail from "../components/ProductDetail";

const ItemTemplate = ({ pageContext: { id } }) => {
  return (
    <Layout>
      <ProductDetail productId={id} />
    </Layout>
  );
};

ItemTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ItemTemplate;
