import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Head from "../components/Head";

import Content, { HTMLContent } from "../components/Content";

export const SimplePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="flex flex-col flex-grow">
          <div className="flex content-center items-center justify-center h-64">
            <h1 className="text-white bg-trendy-brand leading-none p-6 shadow-xl text-5xl">
              {title}
            </h1>
          </div>

          <PageContent content={content} />
        </div>
      </div>
    </div>
  );
};

SimplePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const SimplePage = ({ data }) => {
  const { markdownRemark: post } = data;
  const title = post.frontmatter.title;

  return (
    <Layout>
      <Head title={title} />
      <SimplePageTemplate
        contentComponent={HTMLContent}
        title={title}
        content={post.html}
      />
    </Layout>
  );
};

SimplePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SimplePage;

export const SimplePageQuery = graphql`
  query SimplePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
