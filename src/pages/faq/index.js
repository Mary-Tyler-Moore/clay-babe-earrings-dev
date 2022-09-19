import React from "react";

import Layout from "../../components/Layout";
import Head from "../../components/Head";
import Faq from "../../components/Faq";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Head title="Blog" />

        <div className="flex content-center items-center justify-center h-64">
          <h1 className="text-white bg-trendy-brand leading-none p-6 shadow-xl text-5xl">
            FAQ
          </h1>
        </div>

        <section className="mt-5">
          <div className="container">
            <div className="content">
              <Faq />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
