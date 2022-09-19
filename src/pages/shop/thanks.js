import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { CartContext } from "../../components/CartProvider";

import Layout from "../../components/Layout";
import Head from "../../components/Head";

const ResetCart = () => {
  const { resetCart } = React.useContext(CartContext);
  React.useEffect(resetCart);
  return null;
};

const ThanksPage = () => {
  return (
    <Layout>
      <Head title="Thanks for your purchase">
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ResetCart />
      <div className="flex flex-col justify-center content-center items-center text-2xl pt-4">
        <FiCheckCircle color="green" size={80} />
        <h1>Thanks for your order!</h1>
        <p>We've sent you an email with the recap of your purchase.</p>
      </div>
    </Layout>
  );
};

export default ThanksPage;
