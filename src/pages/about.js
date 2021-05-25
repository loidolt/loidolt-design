import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Layout from "../components/layout";
import Seo from "../components/seo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  list: {
    backgroundColor: "#424242",
    color: "#c6c6c6",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: "#c6c6c6",
  },
  image: {
    borderRadius: 4,
    marginBottom: -6,
  },
  body: {
    color: "#c9c9c9",
  },
}));

const skills = [
  "Woodworking",
  "CNC Routing and Machining",
  "Laser Cutting",
  "Composites",
  "Metalworking",
  "Industrial Sewing",
  "Electronics Soldering and Assembly",
  "2D/3D CAD",
  "Photogrammetry",
  "Planimetrics",
  "Earthworks Surface Modeling",
  "Raster Graphics",
  "Vector Graphics",
  "Photography",
  "Photo/Video Editing",
  "HTML/CSS/JS/PHP",
  "ReactJS",
  "Python",
  "C++",
];

const qualifications = [
  "FAA Private Pilot",
  "High Performance Endorsement",
  "Complex Endorsement",
  "FAA Commercial Drone Pilot",
  "PADI Rescue Diver",
  "PADI Divemaster",
  "Emergency First Responder",
  "USPA D Skydiving License",
  "USPA Skydiving Coach",
  "USPA Skydiving IAD Instructor",
  "USPA Pro License",
  "USHPA P-2 License",
  "FAA Senior Parachute Rigger (Back and Seat)",
];

export default function About() {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "AboutPagePicture.jpg" }) {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      `}
      render={(data) => (
        <Layout>
          <Seo title="About Loidolt Design" />
          <h1>Who Am I?</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.body}>
                My name is Chris Loidolt.
                <br />
                <br />
                I like learning and creating. I strongly believe the world needs
                more of that.
                <br />
                <br />
                Born and raised in Colorado, I now live in Monument and enjoy
                taking advantage of what this beautiful place has to offer. I
                have been building, drawing, designing, carving, modeling,
                programming, soldering, sewing, capturing, and flying for as
                long as I can remember.
                <br />
                <br />
                My personality can be best defined by my level of creativity and
                quality in work. Speak softly and carry an impressive portfolio.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <GatsbyImage
                  className={classes.image}
                  image={data.placeholderImage.childImageSharp.gatsbyImageData}
                  alt={"Chris Loidolt Profile Picture"}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Skills
              </Typography>
              <div className={classes.list}>
                <List>
                  {skills.map((skill, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Qualifications
              </Typography>
              <div className={classes.list}>
                <List>
                  {qualifications.map((qualification, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={qualification} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </Layout>
      )}
    />
  );
}
