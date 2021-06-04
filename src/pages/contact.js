import React from "react";
import axios from "axios";
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
  errorMessage: {
    marginTop: 20,
    color: "#c9c9c9",
  },
  successMessage: {
    padding: 20,
    color: "#c9c9c9",
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
      success: "",
      name: "",
      email: "",
      message: "",
      _gotcha: "",
      submitting: false,
    };
  }

  handleOnChange = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    axios({
      method: "POST",
      url: "https://formspree.io/f/mzbkaobg",
      data: {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
        _gotcha: this.state._gotcha,
      },
    })
      .then((r) => {
        this.setState({
          submitting: false,
          status: "SUCCESS",
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((r) => {
        this.setState({ submitting: false, status: "ERROR" });
        console.log(r.body);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Seo title="Contact Loidolt Design" />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
        <h1>Contact</h1>
        <Paper className={classes.paper}>
          {this.state.status === "SUCCESS" ? (
            <div className={classes.successMessage}>
              <p>Thanks! I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      id="name"
                      label="Name"
                      type="text"
                      name="name"
                      variant="outlined"
                      onChange={this.handleOnChange}
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
                      onChange={this.handleOnChange}
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
                      onChange={this.handleOnChange}
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
                <input
                  type="text"
                  id="_gotcha"
                  name="_gotcha"
                  onChange={this.handleOnChange}
                  style={{ display: "none" }}
                />
                <div
                  className="g-recaptcha"
                  data-sitekey="6Lcj_vgaAAAAAATJtEeC65LGzZzebquBs99UDEh0"
                ></div>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleOnSubmit}
                    disabled={this.state.submitting}
                  >
                    SUBMIT
                  </Button>
                  {this.state.status === "ERROR" && (
                    <div className={classes.errorMessage}>
                      <p>Ooops! There was an error. Please try again.</p>
                    </div>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Layout>
    );
  }
}

export default withStyles(styles)(Contact);
