import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  pagintationArea: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  paginationButton: {
    width: "100%",
    color: "#a9a9b3",
    borderColor: "#a9a9b3",
  },
});

export default function Navigation(props) {
  const classes = useStyles();

  if (props.previousPath || props.nextPath) {
    return (
      <Grid
        container
        spacing={2}
        className={classes.pagintationArea}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          {props.previousPath && (
            <Link to={props.previousPath}>
              <Button
                variant="outlined"
                className={classes.paginationButton}
                startIcon={<NavigateBeforeIcon />}
              >
                {props.previousLabel}
              </Button>
            </Link>
          )}
        </Grid>
        <Grid item xs={6}>
          {props.nextPath && (
            <Link to={props.nextPath}>
              <Button
                variant="outlined"
                className={classes.paginationButton}
                endIcon={<NavigateNextIcon />}
              >
                {props.nextLabel}
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}

Navigation.propTypes = {
  nextPath: PropTypes.string,
  previousPath: PropTypes.string,
  nextLabel: PropTypes.string,
  previousLabel: PropTypes.string,
};
