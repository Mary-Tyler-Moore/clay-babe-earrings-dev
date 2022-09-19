import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const PreviewCompatibleImage = ({ imageInfo, className }) => {
  const { alt = "", childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        className={className}
        fluid={image.childImageSharp.fluid}
        alt={alt}
      />
    );
  }

  if (childImageSharp) {
    return (
      <Img className={className} fluid={childImageSharp.fluid} alt={alt} />
    );
  }

  if (!!image && typeof image === "string")
    return <img className={className} src={image} alt={alt} />;

  return null;
};

PreviewCompatibleImage.propTypes = {
  className: PropTypes.string,
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
