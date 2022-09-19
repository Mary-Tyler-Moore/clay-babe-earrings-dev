import React, { useContext } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import get from "lodash/fp/get";
import truncate from "lodash/fp/truncate";

import { StoreContext } from "./StoreProvider";
import { CartContext } from "./CartProvider";
import Share from "./Share";

import Price from "./Price";
import Head from "./Head";

const ProductPage = ({ productId }) => {
  const { products, skus } = useContext(StoreContext);
  const { addToCart, toggleCart } = useContext(CartContext);
  const product = products[productId];
  const firstSku = Object.values(skus).find((o) => o.product === productId);
  const firstImage = get("localFiles[0].childImageSharp.fluid")(product);
  const [coverImage, setCoverImage] = React.useState(firstImage);

  return (
    <div className="container">
      <Head
        title={product.name}
        description={
          product.description
            ? truncate({
                length: 150,
              })(product.description)
            : null
        }
        image={firstImage ? firstImage.src : null}
      />
      <div className="flex flex-col sm:flex-row">
        <div className="sm:hidden px-4 py-2 m-2">
          <h1 className="text-4xl">{product.name}</h1>
          <h2 className="text-3xl">{product.caption}</h2>
        </div>
        <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2 lg:max-w-lg">
          <>
            {product.localFiles && (
              <div className="p-2">
                <Img
                  fluid={{ ...coverImage, aspectRatio: 1 }}
                  alt={product.name}
                  className="border border-gray-400 "
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </div>
            )}

            <div className="flex">
              {product.localFiles.map((image) => (
                <div
                  key={image.childImageSharp.fluid.src}
                  className="p-2 cursor-pointer"
                  onClick={() => setCoverImage(image.childImageSharp.fluid)}
                >
                  <Img
                    fluid={image.childImageSharp.fluid}
                    alt={product.name}
                    className={`h-20 w-20 border ${
                      image.childImageSharp.fluid === coverImage
                        ? "shadow-md border-gray-500"
                        : "border-gray-400"
                    }`}
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </div>
              ))}
            </div>
          </>
        </div>
        <div className="flex flex-col flex-1 text-gray-700 text-left px-4 py-2 m-2">
          <h1 className="hidden sm:block text-4xl">{product.name}</h1>
          <h2 className="hidden sm:block text-3xl">{product.caption}</h2>
          <>
            <div>
              <Price
                className="flex-1 price text-4xl my-5"
                value={product.priceStartingAt / 100}
                currency={product.currency}
              />
            </div>

            {firstSku && (
              <button
                className="cartButton my-5 lg:max-w-xs"
                onClick={() => {
                  addToCart(firstSku.id);
                  toggleCart(true);
                }}
              >
                Add To Cart
              </button>
            )}
          </>

          <div className="text-justify mt-5">{product.description}</div>
          <div className="flex flex-col mt-10">
            <span className="text-gray-500">Share your love.</span>
            {typeof window !== "undefined" && (
              <Share
                className="flex"
                title={product.name}
                image={firstImage ? firstImage.src : null}
                url={window.location.pathname}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductPage;
