import React from "react";
import PropTypes from "prop-types";

import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";

const Share = ({ title, className, url, image }) => {
  if (!url || !title) {
    return null;
  }

  if (url.startsWith("/")) {
    url = `${window.location.origin}${url}`;
  }

  return (
    <div className={className}>
      <FacebookShareButton url={url} quote={title} className="ml-0 m-2 flex">
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} className="m-2 flex">
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <PinterestShareButton
        media={image}
        url={url}
        title={title}
        className="m-2 flex"
      >
        <PinterestIcon size={40} round />
      </PinterestShareButton>
    </div>
  );
};

Share.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};

Share.defaultProps = {
  title: null,
  url: null,
};

export default Share;
