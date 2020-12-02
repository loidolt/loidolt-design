import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Post from "../components/post";

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: {
      title,
      date,
      path,
      coverImage,
      excerpt,
      tags,
      repolink,
      modellink,
      attributionlink,
    },
    excerpt: autoExcerpt,
    id,
    html,
  } = data.markdownRemark;
  const { next, previous, directory } = pageContext;

  return (
    <Layout>
      <SEO title={title} description={excerpt || autoExcerpt} />
      <Post
        key={id}
        title={title}
        date={date}
        path={path}
        coverImage={coverImage}
        html={html}
        tags={tags}
        repolink={repolink}
        modellink={modellink}
        attributionlink={attributionlink}
        photos={data.allFile.edges}
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
  query($path: String, $directory: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        path
        directory
        excerpt
        tags
        repolink
        modellink
        attributionlink
        coverImage {
          publicURL
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
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
        relativeDirectory: { eq: $directory }
      }
    ) {
      edges {
        node {
          childImageSharp {
            original {
              width
              height
            }
            fluid {
              ...GatsbyImageSharpFluid_withWebp
              originalName
              originalImg
            }
          }
        }
      }
    }
  }
`;
