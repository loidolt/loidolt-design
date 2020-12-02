import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";

import ContactForm from "../helpers/contactform";

const Contact = () => {

  return (
    <>
      <SEO />
      <Layout>
        <ContactForm />
      </Layout>
    </>
  );
};

Contact.propTypes = {};

export default Contact;
