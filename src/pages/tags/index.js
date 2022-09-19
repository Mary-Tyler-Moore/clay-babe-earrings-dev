import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";

import Layout from "../../components/Layout";
import Head from "../../components/Head";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Head title={`Tags | ${title}`} />
    <div className="container">
      <div className="flex flex-wrap">
        <div className="flex flex-col flex-grow">
          <h1>Tags</h1>
          <ul className="inline">
            {group.map((tag) => (
              <li key={tag.fieldValue} className="inline px-2">
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
