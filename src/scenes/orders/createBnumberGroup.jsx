import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { createOrderApi } from "../../state/api/orders";

import { getCarriersApi } from "../../state/api/carriers";
import { getCountriesApi } from "../../state/api/countries";
import { getCallTypesApi } from "../../state/api/callTypes";
import {
  createBnumberGroupApi,
  getBnumberGroupsApi,
} from "../../state/api/bnumberGroups";

// import { useContext } from "react";
// import { UserContext } from "../../user";

const CreateBnumberGroup = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [selectedFile, setSelectedFile] = useState(null);

  // const { token, setToken } = useContext(UserContext);
  const token = "d";

  // console.log("in Bnumber", token);

  const handleFormSubmit = async (values) => {
    console.log(values);
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", values.name);

    await createBnumberGroupApi(formData, token);
  };

  const handleFormChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title="CREATE ORDER" subtitle="Create new order"></Header>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={orderSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
              mt="20px"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Bnumber Group Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                //   error={!!touched.order_group_name && !!errors.order_group_name}
                //   helperText={touched.order_group_name && errors.order_group_name}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Bnumber Group Name"
                onBlur={handleBlur}
                onChange={handleFormChange}
                // value={values.file}
                name="file"
                sx={{ gridColumn: "span 0" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create All
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateBnumberGroup;

const initialValues = {
  //   file: null,
  name: "",
};

const orderSchema = yup.object().shape({
  name: yup.string().required("required"),
  //   file: yup.mixed(),
});

// const routeTypesList
