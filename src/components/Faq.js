import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

import { HTMLContent } from "../components/Content";

export const FaqTemplate = ({ onClick, open, question, answer }) => (
  <div className="mb-4" onClick={onClick}>
    <div className="flex items-center justify-between bg-gray-200 pl-3 pr-2 py-3 w-full rounded text-gray-600 font-bold cursor-pointer hover:bg-gray-300">
      {question}
      <span className="h-6 w-6 flex items-center justify-center text-teal-500">
        {open ? (
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 -192 469.33333 469"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 469.33333 469.33333"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
          </svg>
        )}
      </span>
    </div>
    {open && <HTMLContent className="p-3 markdown" content={answer} />}
  </div>
);

function Faq({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const [selectedQuestion, setSelectedQuestion] = React.useState(0);

  return (
    <div className="container">
      <div className="bg-white mx-auto p-6">
        {posts &&
          posts.map(({ node: post }, idx) => (
            <FaqTemplate
              key={post.id}
              question={post.frontmatter.question}
              answer={post.html}
              onClick={() => setSelectedQuestion(idx)}
              open={selectedQuestion === idx}
            />
          ))}
      </div>
    </div>
  );
}

Faq.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const FaqWithQuery = () => (
  <StaticQuery
    query={graphql`
      query FaqQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___position] }
          filter: { frontmatter: { type: { eq: "faq" } } }
        ) {
          edges {
            node {
              html
              id
              fields {
                slug
              }
              frontmatter {
                question
                position
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Faq data={data} count={count} />}
  />
);

export default FaqWithQuery;
