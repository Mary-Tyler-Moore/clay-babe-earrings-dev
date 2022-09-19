import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash/kebabCase";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Head from "../components/Head";
import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="mt-5">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="flex flex-col flex-grow">
            <h1 className="font-weight-bold">{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="list-inline mt-2">
                  {tags.map((tag) => (
                    <li
                      key={tag + `tag`}
                      className="rounded-full inline-block bg-trendy-brand-400 px-2 py-1 mr-3"
                    >
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  tags: PropTypes.array,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Head
        title={post.frontmatter.title}
        titleTemplate="%s | Blog"
        description={post.frontmatter.description}
      />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
