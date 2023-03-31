import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const UpdateBookmark = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [listOfGroups, setListOfGroups] = useState([]);
  const [groupValue, setGroupValue] = useState();
  const currentDate = new Date();
  const dateToSend = currentDate.toISOString();
  const { state } = useLocation();

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    url: yup.string().url("invalid url").required("required"),
  });
  const initialValues = {
    title: state.title,
    dropdown: "",
    url: state.url,
  };

  function getBookmarkGroups(userId) {
    fetch(`https://localhost:7235/api/bookmarkgroups/group/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setListOfGroups(data);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  const handleChange123 = (event) => {
    setGroupValue(event.target.value);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData == null) {
      navigate("/login", { replace: true });
    }
    console.log("Coming Here");
    console.log(state);
    setGroupValue(state.bookmarkGroupId);
    getBookmarkGroups(userData.id);
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values);
    console.log(groupValue);
    fetch(`https://localhost:7235/api/bookmarkitems/${state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: state.id,
        title: values.title.trim(),
        description: "",
        url: values.url.trim(),
        bookmarkGroupId: groupValue,
        date: dateToSend,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        response.json();
      })
      .then((data) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <Box m="20px">
      <Header title="CREATE BOOKMARK" subtitle="Create a New BookMark" />

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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="dropdown"
                  value={groupValue}
                  label="Group"
                  onChange={handleChange123}
                >
                  {listOfGroups.map((group) => {
                    return (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                error={!!touched.url && !!errors.url}
                helperText={touched.url && errors.url}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Bookmark
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateBookmark;
