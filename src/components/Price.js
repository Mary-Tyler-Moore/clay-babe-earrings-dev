/* global navigator */
import React from "react";
import PropTypes from "prop-types";

function formatPrice({ value, currency }) {
  const lang =
    (typeof navigator === "object" &&
      (navigator.language || navigator.userLanguage)) ||
    "en";

  if (value === undefined || value === null) {
    return null;
  }
  if (!currency) {
    return value;
  }
  const options = {
    style: "currency",
    currency
  };

  if (value === Math.round(value)) {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  }
  try {
    return new Intl.NumberFormat(lang, options).format(value);
  } catch (err) {
    console.error(
      `Error formatting price with value ${value} and currency ${currency} for lang ${lang}`
    );
    return "NaN";
  }
}

function PriceFormatter({ className, value, currency }) {
  if (value === undefined || value === null) {
    return null;
  }
  const priceStr = formatPrice({ value, currency });

  return <span className={className}>{priceStr}</span>;
}

PriceFormatter.formatPrice = formatPrice;

PriceFormatter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  currency: PropTypes.string
};

PriceFormatter.defaultProps = {
  className: null,
  value: null,
  currency: null
};

export default PriceFormatter;
