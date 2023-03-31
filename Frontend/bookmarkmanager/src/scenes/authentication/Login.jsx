import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    fetch(`https://localhost:7235/api/users/auth/${values.email.trim()}/${values.password.trim()}`, {
      method: "GET",
    })
      .then((response) =>{ 
        console.log("Ahiya");
        if(!response.ok){
          toast.warn("Invalid Credentials"); //TODO: It's Not working (Ask to Preet)
          throw new Error("USER NOT FOUND!");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };
  return (
    <Box m="250px" mt="50px">
      <Header
        title="WELCOME TO BOOKMARK MANAGER"
        subtitle="Login with your Credentials..."
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                LOGIN
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const passwordRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .matches(passwordRegExp, "Invalid Password")
    .required("required"),
});
const initialValues = {
  email: "",
  password: "",
};
