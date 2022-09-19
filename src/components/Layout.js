import React from "react";
import PropTypes from "prop-types";

import StoreProvider from "./StoreProvider";
import CartProvider from "./CartProvider";
import Footer from "./Footer";
import Navbar from "./NavBar";

import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <StoreProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </StoreProvider>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
