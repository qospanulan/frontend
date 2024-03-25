import { Box, Button, useTheme, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState, useRef } from "react";
import { getReceivedCallsApi } from "../../state/api/tcg/receivedCalls";
import { useAuthContext } from "../../hooks/useAuthContext";
import SimpleTable from "../../components/CustomTable";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCountriesApi } from "../../state/api/carriers/countries";
import { getCarriersApi } from "../../state/api/carriers/carriers";

const TCG = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);

  const [countries, setCountries] = useState([{ id: "", name: "" }]);
  const [carriers, setCarriers] = useState([]);

  const [receivedCalls, setReceivedCalls] = useState([]);
  const [rowCountState, setRowCountState] = useState(10);

  const [startDate, setStartDate] = useState(
    dayjs().subtract(1, "day").toDate().toISOString()
  );
  const [endDate, setEndDate] = useState(new Date().toISOString());

  const [open, setOpen] = useState(false);
  const [pressedBtn, setPressedBtn] = useState(false);

  const authContext = useAuthContext();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 18,
    page: 0,
    count: 10,
  });

  const [filters, setFilters] = useState({});

  async function fetchReceivedCalls(is_xlsx = false, email = null) {
    setIsLoading(true);
    const { user } = authContext;
    const response = await getReceivedCallsApi({
      token: user.token,

      start_date: startDate,
      endDate: endDate,
      // pagination
      page: paginationModel.page,
      per_page: paginationModel.pageSize,
      // report
      is_xlsx: is_xlsx,
      email: email,
      // filters
      ...filters,
    });

    if (response) {
      setReceivedCalls(response.data);
      setRowCountState(response.total);
    }

    setIsLoading(false);
  }

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

  useEffect(() => {
    async function fetchCarriers() {
      const user = JSON.parse(localStorage.getItem("user"));

      const carriers = await getCarriersApi(user.token);

      setCarriers(carriers);
    }

    fetchCarriers();
  }, []);

  useEffect(() => {
    fetchReceivedCalls();
  }, [paginationModel, filters]);

  const handleFilterModelChange = (newFilters) => {
    setFilters((filters) => ({
      ...filters,
      ...newFilters,
    }));
  };

  const handleDateTimeChange = () => {
    setFilters((filters) => ({
      ...filters,
      start_date: startDate,
      end_date: endDate,
    }));
  };

  const handleFormSubmit = async (values) => {
    fetchReceivedCalls(
      true,
      pressedBtn === "downloadBtn" ? null : values.email
    );

    values.email = "";
    setOpen(false);
  };

  const columns = [
    {
      field: "country",
      headerName: "Country",
      filterType: "multipleSelect",
      filterOptions: countries?.map((country_info) => {
        return { label: country_info.name, value: country_info.name };
      }),
    },
    {
      field: "carrier",
      headerName: "Carrier",
      filterType: "multipleSelect",
      filterOptions: carriers?.map((carrier_info) => {
        return { label: carrier_info.name, value: carrier_info.name };
      }),
    },
    {
      field: "from_number",
      headerName: "Received CLI",
    },
    {
      field: "dest_number",
      headerName: "CLD",
    },
    {
      field: "cli",
      headerName: "CLI",
    },
    {
      field: "received_timestamp",
      headerName: "Detected Time",
      type: "dateTime",
      filterable: false,
    },
    {
      field: "timestamp",
      headerName: "Call Start Time",
      type: "dateTime",
      filterable: false,
    },
    {
      field: "fraud_type",
      headerName: "Fraud Type",
      filterType: "multipleSelect",
      filterOptions: [
        { label: "sameCLI", value: "sameCLI" },
        { label: "noncompletion", value: "noncompletion" },
        { label: "ONNET", value: "ONNET" },
        { label: "INTERNATIONAL", value: "INTERNATIONAL" },
        { label: "OFFNET", value: "OFFNET" },
        { label: "CLIMATCH", value: "CLIMATCH" },
      ],
    },
  ];

  return (
    <Box m="20px">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          m="20px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "1px solid #000",
            borderRadius: "5px",
            p: 4,
          }}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={emailSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <Form
                onSubmit={(...props) => {
                  setPressedBtn(props[0].nativeEvent.submitter.name);
                  handleSubmit(...props);
                }}
              >
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                  mt="20px"
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
                    sx={{ gridColumn: "span 3" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="button"
                    color="error"
                    variant="outlined"
                    sx={{ mx: "5px" }}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={values.email === ""}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    name="emailBtn"
                  >
                    Send to email
                  </Button>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    name="downloadBtn"
                    sx={{ ml: "5px" }}
                  >
                    Download
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Header title="TCG" subtitle="All received calls" />
      <Box sx={{ display: "flex", m: "5px" }}>
        <Box sx={{ flex: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dayjs(startDate) || filters.start_date}
              onChange={(newValue) => {
                setStartDate(newValue.toISOString());
              }}
            />
            <Typography
              variant="h4"
              color={colors.grey[700]}
              sx={{ m: "0 20px", display: "inline-flex" }}
            >
              -
            </Typography>
            <DateTimePicker
              value={dayjs(endDate) || filters.end_date}
              onChange={(newValue) => {
                setEndDate(newValue.toISOString());
              }}
            />
          </LocalizationProvider>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleDateTimeChange}
            sx={{ marginLeft: "15px" }}
          >
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            justifyContent: "end",
            display: "flex",
            alignItems: "flex-end",
            m: "5px",
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Export
          </Button>
        </Box>
      </Box>
      {/* <Box m="40px 0 0 0" height="60vh"> */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          margin: "40px 0 0 0",
        }}
      >
        <SimpleTable
          data={receivedCalls}
          columns={columns}
          // filter
          filters={filters}
          onFilterChange={(newFilters) => handleFilterModelChange(newFilters)}
          // pagination
          pagination={paginationModel}
          setPagination={setPaginationModel}
          rowCount={rowCountState}
        />
      </Box>
    </Box>
  );
};

export default TCG;

const initialValues = {
  email: "",
};

const emailSchema = yup.object().shape({
  email: yup.string().email(),
});
