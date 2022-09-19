import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import keyBy from "lodash/fp/keyBy";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import flatten from "lodash/fp/flatten";
import filter from "lodash/fp/filter";
import slugify from "slugify";

export const StoreContext = React.createContext();

const StoreProvider = ({ data, children }) => {
  const products = flow(
    get("allStripeProduct.nodes"),
    map(({ fields, skus, ...product }) => ({
      ...product,
      slug: slugify(product.name, { lower: true }),
      skus: skus.data,
      currency: get("data[0].currency")(skus),
      priceStartingAt: Math.min(skus.data.map((sku) => sku.price)),
    })),
    filter((o) => o.active),
    keyBy("id")
  )(data);
  const skus = flow(
    get("allStripeSku.nodes"),
    map(({ product, ...sku }) => ({
      ...sku,
      product: product.id,
    })),
    filter((o) => o.active),
    keyBy("id")
  )(data);

  const [store, setStore] = React.useState({ products, skus });

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = (await fetch(
        "/.netlify/functions/stripe-products"
      )
        .then((response) => response.json())
        .catch((error) => console.error(error))) || {
        error: "oups, an unknown error occured",
      };
      if (error) {
        console.error(error);
      }

      const products = flow(
        map(({ skus, ...product }) => ({
          ...product,
          localFiles: get(`products.${product.id}.localFiles`)(store),
          slug: slugify(product.name, { lower: true }),
          skus: skus.data,
          currency: get("data[0].currency")(skus),
          priceStartingAt: Math.min(skus.data.map((sku) => sku.price)),
        })),
        filter((o) => o.active),
        filter((o) => !!o.skus.length),
        keyBy("id")
      )(data);

      const skus = flow(
        map(({ skus }) => skus),
        flatten,
        map((sku) => ({
          localFiles: get(`skus.${sku.id}.localFiles`)(store),
          ...sku,
        })),
        filter((o) => o.active),
        keyBy("id")
      )(products);

      setStore({ products, skus });
    };
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

const query = graphql`
  query query($maxWidth: Int = 300, $quality: Int = 92) {
    allStripeProduct {
      nodes {
        id
        name
        description
        active
        caption
        images
        localFiles {
          childImageSharp {
            fluid(maxWidth: $maxWidth, quality: $quality) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        skus {
          data {
            id
            currency
            price
          }
        }
      }
    }
    allStripeSku {
      nodes {
        id
        price
        currency
        active
        localFiles {
          childImageSharp {
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        product {
          id
          name
        }
      }
    }
  }
`;

const StoreProviderWithQuery = ({ children }) => (
  <StaticQuery
    query={query}
    render={(data) => <StoreProvider data={data}>{children}</StoreProvider>}
  />
);

StoreProviderWithQuery.propTypes = {
  children: PropTypes.any.isRequired,
};

export default StoreProviderWithQuery;
