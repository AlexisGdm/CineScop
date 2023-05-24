import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { URL_CAPTCHA, URL_TERMS_OF_SERVICE } from "../../constants/urls/urlFrontEnd";

const validationSchema = yup.object({
  email: yup
    .string("Entrez votre email")
    .email("Entrez un email valide")
    .required("Email requis"),
  username: yup
    .string()
    .min(3, "Le pseudo doit avoir au moins 3 caractères")
    .required("Le pseudo est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit avoir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passes ne sont pas identiques"
    )
    .required("La confirmation du mot de passe est requise"),
  captcha: yup.boolean().oneOf([true], "Vous devez remplir le captcha"),
  acceptTerms: yup
    .boolean()
    .oneOf(
      [true],
      "Vous devez accepter les conditions générales d'utilisation"
    ),
});

const RegisterForm = () => {
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      captcha: false,
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
        .post("http://127.0.0.1:8000/api/v1/users/register", formData, config)
        .then((response) => {
          console.log(response.data);
          setIsRegistered(true);
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.data.errorMail) {
            setEmailError(error.response.data.errorMail);
          } else {
            setEmailError("");
          }
          if (error.response.data.errorUsername) {
            setUsernameError(error.response.data.errorUsername);
          } else {
            setUsernameError("");
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (formik.values.email !== "" && emailError !== "") {
      formik.setErrors({ ...formik.errors, email: "" });
      formik.setTouched({ ...formik.touched, email: false });
      setEmailError("");
    }
    if (formik.values.username !== "" && usernameError !== "") {
      formik.setErrors({ ...formik.errors, username: "" });
      formik.setTouched({ ...formik.touched, username: false });
      setUsernameError("");
    }
  }, [formik.values]);
  
  return (
    <div className="bg-white rounded py-[30px] px-[50px] mb-[50px] w-[500px] mx-auto mt-20">
      <h1 className="text-black text-2xl text-center">S'inscrire</h1>
      <p className="text-center">Tous les champs sont obligatoires.</p>
      <form onSubmit={formik.handleSubmit}>
        {/* EMAIL */}
        <TextField
          fullWidth
          id="email"
          name="email"
          type="text"
          label="Votre email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email && Boolean(formik.errors.email || emailError)
          }
          helperText={
            (formik.touched.email && formik.errors.email) ||
            (emailError && !isRegistered && emailError)
          }
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "black" } }}
        />

        {/* USERNAME */}
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Votre pseudo"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.touched.username &&
            Boolean(formik.errors.username || usernameError)
          }
          helperText={
            (formik.touched.username && formik.errors.username) ||
            (usernameError && !isRegistered && usernameError)
          }
          margin="normal"
          InputLabelProps={{ style: { color: "black" } }}
          variant="outlined"
        />
        {/* PASSWORD */}
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Votre mot de passe"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          InputLabelProps={{ style: { color: "black" } }}
          variant="outlined"
        />
        {/* CONFIRM PASSWORD  */}
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          margin="normal"
          InputLabelProps={{ style: { color: "black" } }}
          variant="outlined"
        />
       
          <ReCAPTCHA
            id="captcha"
            name="captcha"
            sitekey={URL_CAPTCHA}
            onChange={(value) => {
              if (value) formik.setFieldValue("captcha", true);
            }}
          />
          {formik.touched["captcha"]&&<small className="text-red-500">{formik.errors["captcha"]}</small>}

        {/* ACCEPT TERMS */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.acceptTerms}
              onChange={formik.handleChange}
              name="acceptTerms"
              color="primary"
            />
          }
          label={
            <span>
              J'accepte les{" "}
              <a
                href={URL_TERMS_OF_SERVICE}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                conditions générales d'utilisation
              </a>
            </span>
          }
          error={
            formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms)
          }
        />
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className="text-red-500">{formik.errors.acceptTerms}</div>
        )}
        {/* SUBMIT  */}
        <div className="text-center mt-[10px]">
          <Button variant="contained" type="submit">
            Créer un compte
          </Button>
        </div>
        
       
      </form>
      {isRegistered && (
        <div className="text-black text-center mt-[20px]">
          <p>Merci {formik.values.username} vous êtes bien inscrit !</p>
          <p>Vous allez recevoir un mail de confirmation.</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
