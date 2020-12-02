import React from "react";
const classNames = require("classnames");

import style from "../styles/contact.module.css";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  render() {
    const { status } = this.state;
    return (
      <div className="infoBanner">
        <span className={style.title}>Contact</span>
        <br />
        <form
          onSubmit={this.submitForm}
          action="https://formspree.io/f/mzbkaobg"
          method="POST"
        >
          <label className={style.label}>Name</label>
          <input type="text" name="name" className={style.input} />
          <label className={style.label}>Email</label>
          <input type="email" name="email" className={style.input} />
          <label className={style.label}>Message</label>
          <textarea type="text" name="message" rows="5" className={style.input} />
          <input type="text" name="_gotcha" className={style.hp} />
          <div className={classNames(style.buttonArea, style.group)}>
            {status === "SUCCESS" ? (
              <p>Thanks!</p>
            ) : (
              <button className={style.button}>Submit</button>
            )}
            {status === "ERROR" && <p>Ooops! There was an error.</p>}
          </div>
        </form>
      </div>
    );
  }

  submitForm(ev) {
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
  }
}
