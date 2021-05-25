import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "@material-ui/core/Grid";

import PostCard from "../components/postCard";
import Seo from "../components/seo";
import Navigation from "../components/navigation";

const TagsPage = ({
  data,
  pageContext: { nextPagePath, previousPagePath, tag },
}) => {
  const {
    allMarkdownRemark: { edges: posts },
  } = data;

  return (
    <Layout>
      <Seo title={tag + "Posts Loidolt Design"} />
      <h1>#{tag}</h1>
      <Grid container spacing={3} justify="center">
        {posts.map(({ node }) => {
          const {
            id,
            excerpt: autoExcerpt,
            frontmatter: { title, path, coverImage, excerpt, tags },
          } = node;

          return (
            <Grid item xs={12} sm={6} key={id}>
              <PostCard
                title={title}
                path={path}
                tags={tags}
                coverImage={coverImage}
                excerpt={excerpt || autoExcerpt}
              />
            </Grid>
          );
        })}
      </Grid>
      <Navigation
        previousPath={previousPagePath}
        previousLabel="Newer"
        nextPath={nextPagePath}
        nextLabel="Older"
      />
    </Layout>
  );
};

TagsPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
};

export const postsQuery = graphql`
  query ($limit: Int!, $skip: Int!, $tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            path
            excerpt
            tags
            coverImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

export default TagsPage;
