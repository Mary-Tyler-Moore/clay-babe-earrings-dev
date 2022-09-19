import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import get from "lodash/fp/get";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import Head from "../components/Head";
import Testimonials from "../components/Testimonials";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  testimonials,
  intro,
}) => {
  return (
    <div>
      <Head />
      <div
        className="flex justify-center items-center mt-0 bg-fixed bg-left-top h-50vh"
        style={{
          backgroundImage: `url(${
            image && image.childImageSharp
              ? image.childImageSharp.fluid.src
              : image
          })`,
        }}
      >
        <div className="flex justify-around flex-col leading-none h-32">
          <h1 className="text-4xl lg:text-6xl text-white bg-trendy-brand leading-none p-1 shadow-xl text-center">
            {title}
          </h1>
          <h3 className="text-2xl lg:text-3xl text-white bg-trendy-brand leading-none p-1 shadow-xl">
            {heading}
          </h3>
        </div>
      </div>
      <section className="mt-5">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="flex flex-col flex-grow">
              <h1>{mainpitch.title}</h1>
              <h3>{mainpitch.description}</h3>
              <h2 className="my-3 text-center">{subheading}</h2>
              <p>{description}</p>
              <Features gridItems={intro.blurbs} />
              <div className="text-center">
                <Link
                  className="w-auto inline-block bg-transparent hover:bg-trendy-brand-500 text-trendy-brand-700 font-semibold hover:text-white py-2 px-4 border border-trendy-brand-500 hover:border-transparent rounded"
                  to="/shop"
                >
                  See our sample store
                </Link>
              </div>

              <div className="flex flex-col flex-grow">
                <h2 className="my-5  text-center">Testimonials</h2>
                <Testimonials testimonials={testimonials} />
              </div>

              <div className="flex flex-col flex-grow">
                <h2 className="my-5 text-center">Latest stories</h2>
                <BlogRoll />
                <div className="text-center mt-5">
                  <Link
                    className="w-auto inline-block bg-transparent hover:bg-trendy-brand-500 text-trendy-brand-700 font-semibold hover:text-white py-2 px-4 border border-trendy-brand-500 hover:border-transparent rounded"
                    to="/blog"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const frontmatter = get("markdownRemark.frontmatter")(data) || {};

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "IndexPage" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            text
          }
          heading
          description
        }
      }
    }
  }
`;
