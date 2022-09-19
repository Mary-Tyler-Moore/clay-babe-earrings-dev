const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const get = require("lodash/fp/get");

const headers = {
  "Access-Control-Allow-Origin": "*",
};

/**
 * Returns list of skus with product fields expanded.
 */
module.exports.handler = async (event, context) => {
  const { cart, ...requestBody } = JSON.parse(event.body);

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: "STRIPE_SECRET_KEY is not defined" }),
    };
  }

  try {
    const { data: skus } = await stripe.skus.list({
      limit: 100,
      expand: ["data.product"],
    });

    requestBody.line_items = cart.map(({ id, quantity }) => {
      const sku = skus.find((o) => o.id === id) || {};
      return {
        name: get("product.name")(sku),
        amount: sku.price,
        currency: sku.currency,
        ...(get("product.caption")(sku)
          ? { description: get("product.caption")(sku) }
          : {}),
        images: [sku.image || get("product.images[0]")(sku)],
        quantity,
      };
    });

    const data = await stripe.checkout.sessions.create(requestBody);
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        code: "stripe.session.created",
        data: {
          id: get("id")(data),
          apiKey: process.env.STRIPE_PUBLISHABLE_KEY,
        },
      }),
    };
  } catch (err) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
