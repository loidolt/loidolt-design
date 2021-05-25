import React from "react";
import PropTypes from "prop-types";
import { graphql, navigate, Link } from "gatsby";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { GatsbyImage } from "gatsby-plugin-image";
import Chip from "@material-ui/core/Chip";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Navigation from "../components/navigation";
import Gallery from "../components/gallery";
import { toKebabCase } from "../helpers";

const useStyles = makeStyles((theme) => ({
  featuredImagePaper: {
    marginBottom: 40,
  },
  featuredImage: {
    borderRadius: 4,
    backgroundColor: "#212121",
    marginBottom: -6,
  },
  date: {
    color: "#a9a9b3",
    float: "right",
  },
  buttonArea: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#333333",
  },
  button: {
    backgroundColor: "#046584",
    color: "#ffffff",
    width: "100%",
  },
  paginationButton: {
    width: "100%",
    color: "#a9a9b3",
    borderColor: "#a9a9b3",
  },
  tagArea: {
    paddingBottom: 10,
  },
  tags: {
    marginRight: 8,
    color: "#a9a9b3",
    borderColor: "#a9a9b3",
  },
}));

export default function BlogPostTemplate({ data, pageContext }) {
  const classes = useStyles();

  const {
    frontmatter: {
      title,
      date,
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
  const { next, previous } = pageContext;
  const previousPath = previous && previous.frontmatter.path;
  const previousLabel = previous && previous.frontmatter.title;
  const nextPath = next && next.frontmatter.path;
  const nextLabel = next && next.frontmatter.title;
  const photos = data.allFile.edges;

  return (
    <Layout key={id}>
      <Seo title={title} description={excerpt || autoExcerpt} />
      <Typography variant="body2" component="p" className={classes.date}>
        {date}
      </Typography>
      <h1>{title}</h1>
      <div className={classes.tagArea}>
        {tags.map((tag) => (
          <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
            <Chip
              label={"#" + tag}
              variant="outlined"
              className={classes.tags}
              onClick={() => navigate(`/tag/${toKebabCase(tag)}/`)}
            />
          </Link>
        ))}
      </div>
      {coverImage && (
        <Paper className={classes.featuredImagePaper}>
          <GatsbyImage
            className={classes.featuredImage}
            image={coverImage.childImageSharp.gatsbyImageData}
            alt={title + "Featured Image"}
          />
        </Paper>
      )}
      {(repolink || modellink || attributionlink) && (
        <Paper className={classes.buttonArea}>
          <Grid container spacing={2} justify="center" alignItems="center">
            {repolink && (
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  className={classes.button}
                  href={repolink}
                  target="_blank"
                >
                  Repository
                </Button>
              </Grid>
            )}
            {modellink && (
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  className={classes.button}
                  href={modellink}
                  target="_blank"
                >
                  3D Model
                </Button>
              </Grid>
            )}
            {attributionlink && (
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  className={classes.button}
                  href={attributionlink}
                  target="_blank"
                >
                  Attribution
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}

      <div dangerouslySetInnerHTML={{ __html: html }} />

      {photos && (
        <Gallery
          columns={(width) => {
            if (width < 700) {
              return 2;
            } else if (width < 1000) {
              return 3;
            } else {
              return 6;
            }
          }}
          postName={title}
          photos={photos}
        />
      )}

      <Navigation
        previousPath={previousPath}
        previousLabel={previousLabel}
        nextPath={nextPath}
        nextLabel={nextLabel}
      />
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
};

export const pageQuery = graphql`
  query ($path: String, $directory: String) {
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
            gatsbyImageData(layout: CONSTRAINED)
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
            gatsbyImageData(layout: CONSTRAINED)
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
