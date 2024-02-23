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
import { getBnumberGroupsApi } from "../../state/api/bnumberGroups";
// import { useContext } from "react";
// import { UserContext } from "../../user";
const CreateOrders = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Carriers fetching
  const [carriers, setCarriers] = useState([{ id: "", country: "", name: "" }]);
  // const { token, setToken } = useContext(UserContext);
  const token = "d";

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const carriers = await getCarriersApi();

        setCarriers(carriers);
      } catch (error) {
        console.error("Error fetching carriers:", error);
      }
    };

    fetchCarriers();
  }, []);

  // Countries fetching
  const [countries, setCountries] = useState([{ id: "", name: "" }]);
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

  // Call types fetching
  const [callTypes, setCallTypes] = useState([{ id: "", name: "" }]);
  useEffect(() => {
    const fetchCallTypes = async () => {
      try {
        const callTypes = await getCallTypesApi();

        setCallTypes(callTypes);
      } catch (error) {
        console.error("Error fetching call types:", error);
      }
    };

    fetchCallTypes();
  }, []);

  // Bnumber groups fetching
  const [bnumberGroups, setBnumberGroups] = useState([{ id: "", name: "" }]);
  useEffect(() => {
    const fetchBnumberGroups = async () => {
      try {
        const bnumberGroups = await getBnumberGroupsApi(token);

        setBnumberGroups(bnumberGroups);
      } catch (error) {
        console.error("Error fetching bnumber groups:", error);
      }
    };

    fetchBnumberGroups();
  }, []);

  const handleFormSubmit = async (values) => {
    console.log(values);
    await createOrderApi(values);
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
            {/* Order Group */}
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
                label="Order Group Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_group_name}
                name="order_group_name"
                error={!!touched.order_group_name && !!errors.order_group_name}
                helperText={touched.order_group_name && errors.order_group_name}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>

            {/* Orders */}
            <FieldArray name="orders">
              {({ insert, remove, push }) => (
                <Box display="block" justifyContent="end" mt="20px">
                  {values.orders && values.orders.length > 0
                    ? values.orders.map((order, index) => (
                        <Box
                          display="grid"
                          mb="20px"
                          gap="30px"
                          key={index}
                          gridTemplateColumns="repeat(18, 1fr)"
                          sx={{
                            "& > div": {
                              gridColumn: isNonMobile ? undefined : "span 18",
                            },
                          }}
                        >
                          {/* Country */}
                          <TextField
                            select
                            fullWidth
                            variant="filled"
                            type="select"
                            label="Country"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.country_id}
                            name={`orders.${index}.country_id`}
                            // error={
                            //   touched.orders &&
                            //   !!touched.orders[index].country_id &&
                            //   !!errors.orders[index].country_id
                            // }
                            // helperText={
                            //   touched.orders &&
                            //   touched.orders[index].country_id &&
                            //   errors.orders[index].country_id
                            // }
                            sx={{ gridColumn: "span 2" }}
                          >
                            {countries.map((country) => (
                              <MenuItem key={country.id} value={country.id}>
                                {country.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          {/* Carrier */}
                          <TextField
                            select
                            fullWidth
                            variant="filled"
                            type="select"
                            label="Carrier"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.carrier_id}
                            name={`orders.${index}.carrier_id`}
                            sx={{ gridColumn: "span 2" }}
                          >
                            {carriers
                              .filter(
                                (carrier) =>
                                  carrier.country.id == order.country_id
                              )
                              .map((carrier) => (
                                <MenuItem key={carrier.id} value={carrier.id}>
                                  {carrier.name}
                                </MenuItem>
                              ))}
                          </TextField>

                          {/* Call type */}
                          <TextField
                            select
                            fullWidth
                            variant="filled"
                            type="select"
                            label="Call Type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.call_type_id}
                            name={`orders.${index}.call_type_id`}
                            sx={{ gridColumn: "span 2" }}
                          >
                            {callTypes.map((callType) => (
                              <MenuItem key={callType.id} value={callType.id}>
                                {callType.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          {/* Percentage of Calls */}
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Percentage of Calls"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.percentage_of_calls}
                            name={`orders.${index}.percentage_of_calls`}
                            sx={{ gridColumn: "span 2" }}
                          />

                          {/* Call duration */}
                          <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Answered Call Duration"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.answered_call_duration}
                            name={`orders.${index}.answered_call_duration`}
                            sx={{ gridColumn: "span 2" }}
                          />

                          {/* Action on FAS */}
                          <TextField
                            select
                            fullWidth
                            variant="filled"
                            type="select"
                            label="Action on FAS"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.action_on_fas}
                            name={`orders.${index}.action_on_fas`}
                            sx={{ gridColumn: "span 2" }}
                          >
                            {/* {callTypes.map((callType) => ( */}
                            <MenuItem value="block_the_route">
                              block_the_route
                            </MenuItem>
                            {/* ))} */}
                          </TextField>

                          {/* Bnumber Group */}
                          <TextField
                            select
                            fullWidth
                            variant="filled"
                            type="select"
                            label="Bnumber Group"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={order.bnumber_group_id}
                            name={`orders.${index}.bnumber_group_id`}
                            sx={{ gridColumn: "span 2" }}
                          >
                            {bnumberGroups.map((bnumberGroup) => (
                              <MenuItem
                                key={bnumberGroup.id}
                                value={bnumberGroup.id}
                              >
                                {bnumberGroup.name}
                              </MenuItem>
                            ))}
                          </TextField>

                          <Box display="flex" justifyContent="end">
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
                      ))
                    : null}
                  <Button
                    type="button"
                    color="inherit"
                    variant="outlined"
                    onClick={() =>
                      push({
                        country_id: "",
                        carrier_id: "",
                        call_type_id: "",
                        percentage_of_calls: 0,
                        answered_call_duration: 0,
                        action_on_fas: "",
                        // answer_audio_type: "",
                        bnumber_group: "",
                      })
                    }
                  >
                    Add Order
                  </Button>
                </Box>
              )}
            </FieldArray>

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

export default CreateOrders;

const initialValues = {
  order_group_name: "",
  orders: [
    {
      country_id: "",
      carrier_id: "",
      call_type_id: "",
      percentage_of_calls: "",
      answered_call_duration: "",
      action_on_fas: "",
      bnumber_group_id: "",
    },
  ],
};

const orderSchema = yup.object().shape({
  order_group_name: yup.string().required("required"),
  orders: yup.array().of(
    yup.object().shape({
      country_id: yup.string().required("required"),
      carrier_id: yup.string().required("required"),
      call_type_id: yup.string().required("required"),
      percentage_of_calls: yup.number().required("required"),
      answered_call_duration: yup.number().required("required"),
      action_on_fas: yup.string().required("required"),
      // answer_audio_type: "",
      bnumber_group_id: yup.string().required("required"),
    })
  ),
});

// const routeTypesList
