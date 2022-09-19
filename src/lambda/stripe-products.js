const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const headers = {
  "Access-Control-Allow-Origin": "*",
};

/**
 * Returns list of skus with product fields expanded.
 */
module.exports.handler = async () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({ error: "STRIPE_SECRET_KEY is not defined" }),
    };
  }

  try {
    const result = await stripe.products.list({
      limit: 100,
      expand: ["data.skus"],
    });

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        data: result.data,
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
