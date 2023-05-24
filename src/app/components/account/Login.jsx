import React, { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Adresse e-mail invalide')
    .required('Adresse e-mail obligatoire'),
  password: Yup
    .string()
    .required('Mot de passe obligatoire'),
});

const Login = () => {
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      const config = {
        Headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios
        .post("http://127.0.0.1:8000/api/v1/users/login", formData, config)
        .then((response) => {
          console.log(response.data, "response promise");
        })
        .catch((error) => {
          console.log(error.response.data, "response error");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  // useEffect(() => {
  //   if (formik.values.email !== "" && emailError !== "") {
  //     formik.setErrors({ ...formik.errors, email: "" });
  //     formik.setTouched({ ...formik.touched, email: false });
  //     setEmailError("");
  //   }
  //   if (formik.values.password !== "" && passwordError !== "") {
  //     formik.setErrors({ ...formik.errors, password: "" });
  //     formik.setTouched({ ...formik.touched, password: false });
  //     setPasswordError("");
  //   }
  // }, [formik.values]);

  return (

      <div className="bg-white rounded py-[30px] px-[50px] mb-[50px] w-[500px] mx-auto mt-20">
        <h1 className="text-black text-2xl text-center">Se connecter</h1>

        <form onSubmit={formik.handleSubmit}>

          <TextField
            fullWidth
            id="email"
            name="email"
            type="text"
            label="Votre email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
            // helperText={
            //   (formik.touched.email && formik.errors.email) ||
            //   (emailError && !isRegistered && emailError)
            // }
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "black" } }}
          />

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

          <div className="text-center mt-[10px]">
            <Button variant="contained" type="submit">
              Connexion
            </Button>
          </div>

        </form>

      </div>
  );
};

export default Login;
