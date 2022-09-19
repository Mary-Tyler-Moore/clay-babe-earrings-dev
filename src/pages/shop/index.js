import React from "react";

import Layout from "../../components/Layout";
import Head from "../../components/Head";
import Products from "../../components/Products";

const ProductPage = () => {
  return (
    <Layout>
      <Head title="Sample Store" />
      <div className="container">
        <div className="flex content-center items-center justify-center h-64">
          <h1 className="text-white bg-trendy-brand leading-none p-6 shadow-xl text-5xl">
            Our Products
          </h1>
        </div>

        <Products />
      </div>
    </Layout>
  );
};

export default ProductPage;
