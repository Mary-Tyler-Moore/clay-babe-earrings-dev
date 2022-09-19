import React from "react";

import Layout from "../../components/Layout";
import Head from "../../components/Head";
import Testimonials from "../../components/Testimonials";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Head title="Testimonials" />

        <div className="flex content-center items-center justify-center h-64">
          <h1 className="text-white bg-trendy-brand leading-none p-6 shadow-xl text-5xl">
            Testimonials
          </h1>
        </div>

        <section className="mt-5">
          <div className="container">
            <div className="content">
              <Testimonials />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
