import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../../components/Header";
import { createCarrierApi } from "../../state/api/carriers/carriers";
import { createNumbersApi } from "../../state/api/carriers/numbers";
import { getRouteTypesApi } from "../../state/api/carriers/routeTypes";
import { getCountriesApi } from "../../state/api/carriers/countries";

import { tokens } from "../../theme";
import { createCliRangesApi } from "../../state/api/carriers/cli_ranges";

const CreateCarrier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [countries, setCountries] = useState([{ id: "", name: "" }]);
  const [routeTypes, setRouteTypes] = useState([{ id: "", name: "" }]);

  useEffect(() => {
    const fetchRouteTypes = async () => {
      try {
        const routeTypes = await getRouteTypesApi();

        setRouteTypes(routeTypes);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchRouteTypes();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountriesApi();

        setCountries(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const newCarrier = await createCarrierApi(values);
    {
      newCarrier
        ? toast.success("Carrier created")
        : toast.error("Carrier creating error");
    }
    let response;
    {
      values.route_type_id ==
      routeTypes.find((routeType) => routeType.name.toLowerCase() === "transit")
        ?.id
        ? (response = await createCliRangesApi(
            newCarrier.id,
            values.prefix,
            values.ranges
          ))
        : (response = await createNumbersApi(newCarrier.id, values.numbers));
    }
    response
      ? toast.success("Numbers created")
      : toast.error("numbers creating error");

    onSubmitProps.resetForm();
  };

  return (
    <Box m="20px">
      <Header title="CREATE CARRIER" subtitle="Create new carrier"></Header>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={carrierSchema}
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
            <Box>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  type="select"
                  label="Route Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.route_type_id}
                  name="route_type_id"
                  error={!!touched.route_type_id && !!errors.route_type_id}
                  helperText={touched.route_type_id && errors.route_type_id}
                  sx={{ gridColumn: "span 2" }}
                >
                  {routeTypes &&
                    routeTypes.map((routeType) => (
                      <MenuItem key={routeType.id} value={routeType.id}>
                        {routeType.name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  type="select"
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country_id}
                  name="country_id"
                  error={!!touched.country_id && !!errors.country_id}
                  helperText={touched.country_id && errors.country_id}
                  sx={{ gridColumn: "span 2" }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Carrier Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                {
                  // check if selected route_type_id is equal to id of route_type with name transit
                  values.route_type_id ==
                    routeTypes.find(
                      (routeType) => routeType.name.toLowerCase() === "transit"
                    )?.id && (
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Prefix"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.prefix}
                      name="prefix"
                      error={!!touched.prefix && !!errors.prefix}
                      helperText={touched.prefix && errors.prefix}
                      sx={{ gridColumn: "span 2" }}
                    />
                  )
                }
              </Box>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
                }}
              >
                {
                  // check if selected route_type_id is equal to id of route_type with name transit
                  values.route_type_id ==
                  routeTypes.find(
                    (routeType) => routeType.name.toLowerCase() === "transit"
                  )?.id ? (
                    <FieldArray name="ranges">
                      {({ insert, remove, push }) => (
                        <Box display="block" justifyContent="end" mt="20px">
                          {values.ranges.length > 0 &&
                            values.ranges.map((range, index) => (
                              <Box display="flex" mb="20px" key={index}>
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label={"Range Start " + (index + 1)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={range.start}
                                  name={`ranges.${index}.start`}
                                  sx={{ gridColumn: "span 3" }}
                                />
                                <Typography
                                  variant="h3"
                                  color={colors.grey[300]}
                                  sx={{ m: "0 20px" }}
                                >
                                  -
                                </Typography>
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label={"Range End " + (index + 1)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={range.end}
                                  name={`ranges.${index}.end`}
                                  sx={{ gridColumn: "span 3" }}
                                />
                                <Box
                                  display="flex"
                                  justifyContent="end"
                                  ml="20px"
                                >
                                  <Button
                                    type="button"
                                    color="error"
                                    variant="outlined"
                                    onClick={() => remove(index)}
                                  >
                                    Удалить
                                  </Button>
                                </Box>
                              </Box>
                            ))}
                          <Button
                            type="button"
                            color="inherit"
                            variant="outlined"
                            onClick={() => push({ start: "", end: "" })}
                          >
                            Add Range
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  ) : (
                    <FieldArray name="numbers">
                      {({ insert, remove, push }) => (
                        <Box
                          display="block"
                          justifyContent="end"
                          mt="20px"
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 4",
                            },
                          }}
                        >
                          {values.numbers.length > 0 &&
                            values.numbers.map((number_info, index) => (
                              <Box display="flex" mb="20px" key={index}>
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="number"
                                  label="Prefix"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={number_info.prefix}
                                  name={`numbers.${index}.prefix`}
                                  // error={
                                  //   !!touched.numbers[index].prefix &&
                                  //   !!errors.numbers[index].prefix
                                  // }
                                  // helperText={
                                  //   touched.numbers[index].prefix &&
                                  //   errors.numbers[index].prefix
                                  // }
                                  sx={{ gridColumn: "span 2", mr: "20px" }}
                                />
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type="text"
                                  label={"Number " + (index + 1)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={number_info.number}
                                  name={`numbers.${index}.number`}
                                  // error={
                                  //   !!touched.numbers[index]?.number &&
                                  //   !!errors.numbers[index]?.number
                                  // }
                                  // helperText={
                                  //   touched.numbers[index]?.number &&
                                  //   errors.numbers[index]?.number
                                  // }
                                  sx={{ gridColumn: "span 2" }}
                                />
                                <Box
                                  display="flex"
                                  justifyContent="end"
                                  ml="20px"
                                >
                                  <Button
                                    type="button"
                                    color="error"
                                    variant="outlined"
                                    onClick={() => remove(index)}
                                  >
                                    Удалить
                                  </Button>
                                </Box>
                              </Box>
                            ))}
                          <Button
                            type="button"
                            color="inherit"
                            variant="outlined"
                            onClick={() => push("")}
                          >
                            Add Number
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  )
                }
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="reset"
                color="secondary"
                variant="outlined"
                // disabled={!Formik.isValid || Formik.isSubmitting}
              >
                reset
              </Button>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                // disabled={!Formik.isValid || Formik.isSubmitting}
              >
                Create New Carrier
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

export default CreateCarrier;

const initialValues = {
  route_type_id: "",
  country_id: "",
  name: "",
  prefix: "",
  numbers: [{ prefix: "", number: "" }],
  ranges: [
    {
      // prefix: this.prefix,
      start: "",
      end: "",
    },
  ],
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const carrierSchema = yup.object().shape({
  route_type_id: yup.string().required("required"),
  country_id: yup.string().required("required"),
  name: yup.string().required("required"),
  prefix: yup.number(),
  numbers: yup.array().of(
    yup.object().shape({
      number: yup.string(),
      // .required("required")
      // .matches(phoneRegExp, "Invalid phone number"),
      prefix: yup.number(),
    })
  ),
  ranges: yup.array().of(
    yup.object().shape({
      start: yup.string(),
      end: yup.number(),
    })
  ),
});
