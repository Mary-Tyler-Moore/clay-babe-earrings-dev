import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { HTMLContent } from "../components/Content";

export function TestimonialTemplate({ avatar, author, role, company, html }) {
  return (
    <blockquote className="flex shadow-lg my-4 p-3">
      <div className="flex-shrink-0">
        <PreviewCompatibleImage
          className="h-16 w-16 rounded-full"
          imageInfo={{
            image: avatar,
            alt: author,
          }}
        />
      </div>
      <div className="flex flex-col ml-4">
        <span className="text-lg leading-6 font-medium text-gray-900">
          {author}
        </span>
        <span className="text-lg leading-6 text-gray-600">
          {[role, company].filter((o) => o).join(", ")}
        </span>
        <HTMLContent
          className="mt-2 leading-6 text-gray-500 markdown italic"
          content={html}
        />
      </div>
    </blockquote>
  );
}

function Testimonials({ data }) {
  const { edges: testimonials } = data.allMarkdownRemark;

  return (
    <div>
      <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
        {testimonials &&
          testimonials.map(({ node: testimonial }) => (
            <li key={testimonial.id}>
              <TestimonialTemplate
                avatar={testimonial.frontmatter.avatar}
                author={testimonial.frontmatter.author}
                role={testimonial.frontmatter.role}
                company={testimonial.frontmatter.company}
                html={testimonial.html}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
};

Testimonials.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const TestimonialsWithQuery = () => (
  <StaticQuery
    query={graphql`
      query TestimonialsQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___position] }
          filter: { frontmatter: { type: { eq: "testimonial" } } }
        ) {
          edges {
            node {
              html
              id
              frontmatter {
                author
                position
                role
                company
                avatar {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Testimonials data={data} count={count} />}
  />
);

export default TestimonialsWithQuery;
