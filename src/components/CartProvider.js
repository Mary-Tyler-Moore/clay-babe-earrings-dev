import React from "react";
import PropTypes from "prop-types";
import omit from "lodash/fp/omit";

import useLocalStorage from "./useLocalStorage";
import { StoreContext } from "./StoreProvider";

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const { skus } = React.useContext(StoreContext);
  const [isCartVisible, setCartVisibility] = React.useState(false);
  const [cartSummary, setCartSummary, resetCart] = useLocalStorage("cart", {});

  React.useEffect(() => setCartSummary(cartSummary), cartSummary);

  const cart =
    cartSummary &&
    Object.entries(cartSummary).map(([id, { quantity }]) => ({
      ...skus[id],
      quantity,
    }));

  const totalItems = cart.reduce((sum, o) => sum + o.quantity, 0);
  const totalAmount = cart.reduce((sum, o) => sum + o.price * o.quantity, 0);

  const addToCart = (id, quantity = 1) => {
    setCartSummary((state) => ({
      ...state,
      [id]: { quantity: quantity + (state[id] ? state[id].quantity : 0) },
    }));
  };

  const removeFromCart = (id) => setCartSummary((state) => omit(id)(state));

  const toggleCart = () => setCartVisibility((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        resetCart,
        toggleCart,
        totalItems,
        totalAmount,
        isCartVisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CartProvider;
