import React from "react";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import Layout from "../components/layout";
import Seo from "../components/seo";

const styles = () => ({
  paper: {
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: "#424242",
    borderRadius: 4,
  },
  successMessage: {
    padding: 20,
  },
  input: {
    color: "#c9c9c9",
    borderColor: "#c9c9c9",
  },
  inputLabel: {
    color: "#c9c9c9",
    borderColor: "#c9c9c9",
  },
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  submitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  };

  render() {
    const { status } = this.state;
    const { classes } = this.props;

    return (
      <Layout>
        <Seo title="Contact Loidolt Design" />
        <h1>Contact</h1>
        <Paper className={classes.paper}>
          {status === "SUCCESS" ? (
            <div className={classes.successMessage}>
              <p>Thanks! I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form
              onSubmit={this.submitForm}
              action="https://formspree.io/f/mzbkaobg"
              method="POST"
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="name"
                      label="Name"
                      type="text"
                      name="name"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.input,
                          focused: classes.input,
                          notchedOutline: classes.input,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.inputLabel,
                          focused: classes.inputLabel,
                          notchedOutline: classes.inputLabel,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      name="email"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.input,
                          focused: classes.input,
                          notchedOutline: classes.input,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.inputLabel,
                          focused: classes.inputLabel,
                          notchedOutline: classes.inputLabel,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="message"
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.input,
                          focused: classes.input,
                          notchedOutline: classes.input,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.inputLabel,
                          focused: classes.inputLabel,
                          notchedOutline: classes.inputLabel,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    SUBMIT
                  </Button>
                  {status === "ERROR" && <p>Ooops! There was an error.</p>}
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Layout>
    );
  }
}

export default withStyles(styles)(Contact);
