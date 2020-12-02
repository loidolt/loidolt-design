import React from 'react'

const args = [
  "create",
  {
    title: "Contact Us",
    styles: {
      fontFamily: '"Inter UI", sans-serif',
      button: {
        background: "#056584",
      },
      title: {
        background: "#056584",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
    },
    action: "https://formspree.io/f/mzbkaobg",
  },
];

const Formspree = () => {
  <>
    <script src="https://formspree.io/js/formbutton-v1.min.js" defer></script>
    <script>
      window.formbutton=window.formbutton||function()
      {(formbutton.q = formbutton.q || []).push(arguments)}; formbutton({args})
    </script>
  </>;
};

export default Formspree;
