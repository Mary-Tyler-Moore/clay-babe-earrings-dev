import React from "react";
import { FaRegPaperPlane } from "react-icons/fa";

import Layout from "../../components/Layout";
import Head from "../../components/Head";

const ThanksPage = () => {
  return (
    <Layout>
      <Head title="Thanks for contacting us">
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="flex flex-col justify-center content-center items-center text-2xl pt-4">
        <FaRegPaperPlane color="green" size={80} />
        <h1>Thanks for contacting us!</h1>
        <p>We will come back to you shortly.</p>
      </div>
    </Layout>
  );
};

export default ThanksPage;
