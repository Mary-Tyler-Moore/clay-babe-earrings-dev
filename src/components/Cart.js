import React, { useContext } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import get from "lodash/fp/get";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { FaRegTrashAlt } from "react-icons/fa";

import { CartContext } from "./CartProvider";
import { StoreContext } from "./StoreProvider";

const CartItem = ({ sku, quantity }) => {
  const { removeFromCart } = useContext(CartContext);
  const { products } = useContext(StoreContext);
  const image = get("localFiles[0].childImageSharp.fixed")(sku);
  const product = products && products[sku.product];

  return (
    <div key={sku.id} className="flex justify-between my-1">
      {image && (
        <Img
          fixed={image}
          alt={product && product.name}
          className="flex-initial border border-gray-400 mr-2 p-2"
        />
      )}
      <div className="flex-initial flex-grow">
        <div className="font-bold">{product && product.name}</div>
        <div>
          ${sku.price / 100} &times; {quantity}
        </div>
        <div>
          <strong>${(sku.price / 100) * quantity}</strong>
        </div>
      </div>
      <FaRegTrashAlt
        size={20}
        className="flex-initial cursor-pointer text-gray-500 hover:text-gray-600"
        onClick={() => removeFromCart(sku.id)}
      />
    </div>
  );
};
CartItem.propTypes = {
  sku: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

const Cart = () => {
  const {
    cart,
    totalItems,
    totalAmount,
    isCartVisible,
    toggleCart,
  } = useContext(CartContext);
  const redirectToCheckout = async () => {
    const data = {
      payment_method_types: ["card"],
      cart: cart.map((o) => ({ id: o.id, quantity: o.quantity })),
      success_url: `${window.location.origin}/shop/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}${window.location.pathname}?cancelled=true`,
    };

    try {
      const response = (await fetch(
        "/.netlify/functions/stripe-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .catch((error) => console.error(error))) || {
        error: "oups, an unknown error occured",
      };

      const sessionId = get("data.id")(response);
      const apiKey = get("data.apiKey")(response);

      const stripe = await loadStripe(apiKey);
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative inline-flex justify-center content-center items-center"
      >
        <span className="text-3xl lg:hidden">
          My Cart
          {totalItems > 0 && (
            <span className="rounded-full bg-trendy-brand px-3 mx-2 text-1xl">
              {totalItems}
            </span>
          )}
        </span>
        <div className="hidden lg:block">
          <MdShoppingBasket size={38} />
          <div
            className="absolute text-white font-bold text-center m-0 bg-black text-base"
            style={{
              top: "18px",
              right: "6px",
              height: "10px",
              lineHeight: "10px",
              width: "24px",
            }}
          >
            {totalItems > 0 && totalItems}
          </div>
        </div>
      </button>

      {isCartVisible && (
        <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
          <div className="absolute w-full h-full opacity-75  bg-white z-0 right-0 top-0"></div>

          <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold uppercase">
                  Your shopping cart
                </p>
                <div
                  className="modal-close cursor-pointer z-50"
                  onClick={toggleCart}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              <div className="my-5">
                {totalItems === 0 && <span>No items in your cart.</span>}
                {cart.map((item) => (
                  <CartItem key={item.id} sku={item} quantity={item.quantity} />
                ))}
              </div>
              <div
                className={`flex pt-2 ${
                  totalAmount > 0 ? "justify-between" : "justify-end"
                }`}
              >
                <button
                  className="bg-transparent hover:bg-trendy-brand-300 text-trendy-brand font-semibold hover:text-white py-2 px-4 border border-trendy-brand hover:border-transparent rounded mr-2"
                  onClick={toggleCart}
                >
                  Close
                </button>
                {totalAmount > 0 && (
                  <button
                    onClick={redirectToCheckout}
                    className="bg-trendy-brand hover:bg-trendy-brand-400 text-white font-semibold py-2 px-4 border border-trendy-brand rounded"
                  >
                    Checkout for ${totalAmount / 100}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
