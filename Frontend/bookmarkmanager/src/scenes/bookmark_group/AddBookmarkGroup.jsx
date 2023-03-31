import {
    Box,
    Button,
    TextField,
  } from "@mui/material";
  import { useState, useEffect } from 'react';
  import { Formik } from "formik";
  import { useNavigate } from "react-router-dom";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Header from "../../components/Header";
  
  const AddBookmarkGroup = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const currentDate = new Date();
    const dateToSend = currentDate.toISOString();
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData == null) {
        navigate("/login", { replace: true });
      }
      setUserId(userData.id);
    }, []);
  
    const handleFormSubmit = (values) => {
      fetch("https://localhost:7235/api/bookmarkgroups", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.title.trim(),
        description: values.description.trim(),
        date: dateToSend,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    };
  
    return (
      <Box m="20px">
        <Header title="CREATE BOOKMARK GROUP" subtitle="Create a New BookMark Group" />
  
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
                  label="Group Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create Bookmark GROUP
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    description: yup.string().required("required"),
  });
  const initialValues = {
    title: "",
    description: ""
  };
  
  export default AddBookmarkGroup;
  