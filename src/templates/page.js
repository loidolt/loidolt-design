import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Post from "../components/post";

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, path, coverImage, excerpt, tags },
    excerpt: autoExcerpt,
    id,
    html,
  } = data.markdownRemark;
  const { next, previous } = pageContext;

  return (
    <Layout>
      <SEO title={title} description={excerpt || autoExcerpt} />
      <Post
        key={id}
        title={title}
        path={path}
        coverImage={coverImage}
        html={html}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
};

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        path
        excerpt
        tags
        coverImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      html
      excerpt
    }
  }
`;