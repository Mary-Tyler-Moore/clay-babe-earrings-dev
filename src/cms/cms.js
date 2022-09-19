import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import SimplePagePreview from "./preview-templates/SimplePagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import FaqPreview from "./preview-templates/FaqPreview";
import TestimonialPreview from "./preview-templates/TestimonialPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);

CMS.registerPreviewTemplate("about", SimplePagePreview);
CMS.registerPreviewTemplate("terms", SimplePagePreview);
CMS.registerPreviewTemplate("privacy", SimplePagePreview);
CMS.registerPreviewTemplate("refund", SimplePagePreview);
CMS.registerPreviewTemplate("simplepage", SimplePagePreview);

CMS.registerPreviewTemplate("blog", BlogPostPreview);

CMS.registerPreviewTemplate("testimonial", TestimonialPreview);

CMS.registerPreviewTemplate("faq", FaqPreview);
