import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { GatsbyImage } from "gatsby-plugin-image";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = {
  root: {
    marginTop: 60,
    flexGrow: 1,
  },
  paper: {
    padding: 0,
    textAlign: "center",
  },
  thumbnail: {
    borderRadius: 4,
    marginBottom: -6,
  },
  modal: {
    position: "absolute",
    maxWidth: 800,
    maxHeight: 800,
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    borderRadius: 4,
  },
  lightboxImage: {
    borderRadius: 4,
  },
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  fileNumber = (file) =>
    Number(file.node.childImageSharp.fluid.originalName.replace(/[a-z]/gi, ""));

  sortImages = (imageArray) => {
    return [...imageArray].sort(
      (a, b) => this.fileNumber(b) - this.fileNumber(a)
    );
  };

  handleOpen = (image, name, index) => {
    this.setState({
      open: true,
      modalImage: image,
      modalName: name,
      modalIndex: index,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      image: "",
      modalName: "",
      modalIndex: "",
    });
  };

  render() {
    const { classes } = this.props;

    const images = this.sortImages(this.props.photos);

    if (this.props.photos.length > 1) {
      return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            {images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper
                  className={classes.paper}
                  onClick={() =>
                    this.handleOpen(
                      image.node.childImageSharp.gatsbyImageData,
                      this.props.postName,
                      index
                    )
                  }
                >
                  <GatsbyImage
                    className={classes.thumbnail}
                    image={image.node.childImageSharp.gatsbyImageData}
                    alt={this.props.postName + " " + index}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="image-lightbox"
            aria-describedby="image-lightbox"
          >
            <div style={getModalStyle()} className={classes.modal}>
              <GatsbyImage
                className={classes.lightboxImage}
                image={this.state.modalImage}
                alt={this.state.modalName + " " + this.state.modalIndex}
                onClick={this.handleClose}
              />
            </div>
          </Modal>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(Gallery);
