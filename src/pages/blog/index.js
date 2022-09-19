import React from "react";

import Layout from "../../components/Layout";
import Head from "../../components/Head";
import BlogRoll from "../../components/BlogRoll";
import backgroundImage from "./blog-index.jpg";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Head title="Blog" />

        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-white bg-trendy-brand leading-none p-6 shadow-xl text-5xl">
            Latest Stories
          </h1>
        </div>
        <section className="mt-5">
          <div className="container">
            <BlogRoll />
          </div>
        </section>
      </Layout>
    );
  }
}
