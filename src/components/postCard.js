import React from "react";
import PropTypes from "prop-types";
import { navigate, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import { toKebabCase } from "../helpers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#424242",
  },
  card: {
    backgroundColor: "#424242",
  },
  cardMedia: {
    height: "100%",
  },
  cardTitle: {
    color: "#c6c6c6",
    fontWeight: 700,
  },
  cardText: {
    color: "#c6c6c6",
  },
  cardDate: {
    color: "#a9a9b3",
    float: "right",
  },
  cardTags: {
    color: "#a9a9b3",
    borderColor: "#a9a9b3",
  },
});

export default function PostCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={props.path}>
        <CardActionArea>
          {props.coverImage && (
            <GatsbyImage
              className={classes.cardMedia}
              image={props.coverImage.childImageSharp.gatsbyImageData}
              alt={props.title + "Featured Image"}
            />
          )}
          <CardContent>
            <Typography
              variant="body2"
              component="p"
              className={classes.cardDate}
            >
              {props.date}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.cardTitle}
            >
              {props.title}
            </Typography>

            <Typography
              variant="body2"
              component="p"
              className={classes.cardText}
            >
              {props.excerpt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Divider light />
      <CardActions>
        {props.tags.map((tag) => (
          <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
            <Chip
              label={"#" + tag}
              variant="outlined"
              className={classes.cardTags}
              onClick={() => navigate(`/tag/${toKebabCase(tag)}/`)}
            />
          </Link>
        ))}
      </CardActions>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  coverImage: PropTypes.object,
  excerpt: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
