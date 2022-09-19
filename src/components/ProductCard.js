import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import Price from "./Price";

const ProductCard = ({ product }) => {
  const fluidImage = product.localFiles[0].childImageSharp.fluid;
  return (
    <Link to={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {product.localFiles && (
          <Img
            fluid={fluidImage}
            alt={product.name}
            objectFit="cover"
            style={{ height: "250px" }}
            objectPosition="50% 50%"
          />
        )}

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 h-2 text-base">{product.caption}</p>
        </div>
        <div className="px-6 py-4">
          <Price
            className="price"
            value={product.priceStartingAt / 100}
            currency={product.currency}
          />
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
