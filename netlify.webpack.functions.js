const Dotenv = require("dotenv-webpack");

console.info(`Webpack process env ${process.env.NODE_ENV}`);

module.exports = {
  plugins: [
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,
    }),
  ],
};
