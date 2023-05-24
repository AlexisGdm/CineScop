import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const validationSchema = yup.object({
  email: yup
    .string("Entrez votre email")
    .email("Entrez un email valide")
    .required("Email requis"),
  subject: yup.string("Entrez votre objet").required("Objet requis"),
  message: yup.string("Entrez votre message").required("Message requis"),
});

const ContactForm = () => {
  const [messageSent, setMessageSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios
        .post("http://127.0.0.1:8000/api/v1/users/mail", formData, config)
        .then((response) => {
          console.log(response.data);
          setMessageSent(true);
        })
        .catch((error) => {})
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="bg-white rounded py-[30px] px-[50px] mb-[50px] w-[800px] mx-auto mt-20">
      <h1 className="text-black text-2xl text-center">
        Vous voulez contacter l'équipe ?
      </h1>
      <p className="text-center">
        Remplissez ce formulaire et nous reviendrons vers vous.
      </p>
      <form onSubmit={formik.handleSubmit}>
        {/* USERNAME */}
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Votre pseudo"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
          InputLabelProps={{ style: { color: "black" } }}
          variant="outlined"
        />
        {/* EMAIL */}
        <TextField
          fullWidth
          id="email"
          name="email"
          type="text"
          label="Votre email*"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "black" } }}
        />
        {/* SUJET */}
        <TextField
          fullWidth
          id="subject"
          name="subject"
          label="Le sujet du message*"
          type="text"
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          margin="normal"
          InputLabelProps={{ style: { color: "black" } }}
          variant="outlined"
        />
        {/* MESSAGE  */}
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Votre message*"
          type="text"
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          margin="normal"
          multiline
          minRows={5}
          variant="outlined"
          InputLabelProps={{ style: { color: "black" } }}
        />
        <div>*Champs obligatoires</div>
        {/* SUBMIT  */}
        <div className="text-center mt-[20px]">
          <Button variant="contained" type="submit">
            Envoyer le message
          </Button>
        </div>
      </form>
      <div className="text-black text-center mt-[20px]">
        {/* DISPLAY CONFIRMATION MESSAGE */}
        {messageSent && <p>Message envoyé avec succès !</p>}
      </div>
    </div>
  );
};

export default ContactForm;
