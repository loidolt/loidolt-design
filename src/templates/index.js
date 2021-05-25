import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Grid from "@material-ui/core/Grid";

import PostCard from "../components/postCard";
import Seo from "../components/seo";
import Navigation from "../components/navigation";

const IndexPage = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const {
    allMarkdownRemark: { edges: posts },
  } = data;

  return (
    <Layout>
      <Seo title="Loidolt Design Projects" />
      <h1>Projects</h1>
      <Grid container spacing={3} justify="center">
        {posts.map(({ node }) => {
          const {
            id,
            excerpt: autoExcerpt,
            frontmatter: { title, path, date, coverImage, excerpt, tags },
          } = node;

          return (
            <Grid item xs={12} sm={6} key={id}>
              <PostCard
                title={title}
                date={date}
                path={path}
                coverImage={coverImage}
                tags={tags}
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

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
};

export const postsQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
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

export default IndexPage;
