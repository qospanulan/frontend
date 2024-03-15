import {
  Box,
  Button,
  useTheme,
  Modal,
  Typography,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import {
  DataGrid,
  useGridRootProps,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState, useRef } from "react";
import { getOrdersApi } from "../../state/api/orders/orders";
import { getReceivedCallsApi } from "../../state/api/tcg/receivedCalls";
import { useAuthContext } from "../../hooks/useAuthContext";

const TCG = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [receivedCalls, setReceivedCalls] = useState([]);
  const [rowCountState, setRowCountState] = useState(10);

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [report, setReport] = useState({ is_xlsx: false, email: null });
  const [open, setOpen] = useState(false);

  const authContext = useAuthContext();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        id: 1,
        field: "received_timestamp",
        value: [null, dayjs().toISOString()],
        operator: "between",
      },
    ],
  });

  const editToolbar = function () {
    return (
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "end", m: "5px" }}
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Export
        </Button>
      </GridToolbarContainer>
    );
  };

  useEffect(() => {
    async function fetchReceivedCalls() {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      setIsLoading(true);
      const { user } = authContext;
      const response = await getReceivedCallsApi({
        token: user.token,
        filterModel: filterModel,
        paginationModel: paginationModel,
        report: { is_xlsx: false, email: null },
      });

      setReceivedCalls(response.data);
      setRowCountState(response.total);
      setIsLoading(false);
    }

    fetchReceivedCalls();
  }, [
    paginationModel,
    setPaginationModel,
    filterModel,
    setFilterModel,
    // report,
    // setReport,
  ]);

  function InputNumberInterval(props) {
    const rootProps = useGridRootProps();
    const { item, applyValue, focusElementRef = null } = props;

    const filterTimeout = useRef();
    const [filterValueState, setFilterValueState] = useState(item.value ?? "");

    useEffect(() => {
      return () => {
        clearTimeout(filterTimeout.current);
      };
    }, []);

    useEffect(() => {
      const itemValue = item.value ?? [undefined, undefined];
      setFilterValueState(itemValue);
    }, [item.value]);

    const updateFilterValue = (lowerBound, upperBound) => {
      clearTimeout(filterTimeout.current);
      setFilterValueState([lowerBound, upperBound]);
      setFilterModel({
        items: [
          {
            id: 1,
            field: "received_timestamp",
            value: [
              dayjs(lowerBound).toISOString(),
              dayjs(upperBound).toISOString(),
              // filterItem.value[1],
            ],
            operator: "between",
          },
        ],
      });
    };

    const handleUpperFilterChange = (value) => {
      // console.log("value", value);
      const newUpperBound = value;
      updateFilterValue(filterValueState[0], newUpperBound);
    };
    const handleLowerFilterChange = (value) => {
      const newLowerBound = value;
      updateFilterValue(newLowerBound, filterValueState[1]);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "end",
            height: 60,
            width: "500px",
            pl: "20px",
          }}
        >
          <DateTimePicker
            label="From"
            value={dayjs(filterValueState[0])}
            onChange={handleLowerFilterChange}
            sx={{ mr: 2, width: "200px" }}
          />
          <DateTimePicker
            label="To"
            value={dayjs(filterValueState[1])}
            onChange={handleUpperFilterChange}
            sx={{ width: "200px" }}
          />
        </Box>
      </LocalizationProvider>
    );
  }

  const quantityOnlyOperators = [
    {
      label: "Between",
      value: "between",
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
          return null;
        }
        if (filterItem.value[0] == null || filterItem.value[1] == null) {
          return null;
        }

        // setFilterModel = {
        //   items: [
        //     {
        //       id: 1,
        //       field: "received_timestamp",
        //       value: [
        //         // filterItem.value[0].toISOString(),
        //         // filterItem.value[0],
        //         // filterItem.value[1],
        //       ],
        //       operator: "between",
        //     },
        //   ],
        // };

        return ({ value }) => {
          return (
            value !== null &&
            filterItem.value[0] <= value &&
            value <= filterItem.value[1]
          );
        };
      },
      InputComponent: InputNumberInterval,
    },
  ];

  const handleFormSubmit = async (values) => {
    setReport({
      is_xlsx: true,
      email: values.email,
    });

    setIsLoading(true);
    const { user } = authContext;

    const response = await getReceivedCallsApi({
      token: user.token,
      filterModel: filterModel,
      paginationModel: paginationModel,
      report: {
        is_xlsx: true,
        email: values.email,
      },
      // perPage,
    });

    setReceivedCalls(response.data);
    setRowCountState(response.total);
    setIsLoading(false);

    values.email = "";
    setOpen(false);
    setReport({
      is_xlsx: false,
      email: null,
    });
  };

  const columns = [
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "carrier",
      headerName: "Carrier",
      flex: 1,
    },
    {
      field: "from_number",
      headerName: "CLI",
      flex: 1,
    },
    {
      field: "dest_number",
      headerName: "CLD",
      flex: 1,
    },
    {
      field: "cli",
      headerName: "Received CLI",
      flex: 1,
    },
    {
      field: "received_timestamp",
      headerName: "Detected Time",
      flex: 1,
      type: "dateTime",
      valueFormatter: (params) => new Date(params?.value).toISOString(),
      filterOperators: quantityOnlyOperators,
    },
    {
      field: "timestamp",
      headerName: "Call Start Time",
      flex: 1,
      type: "dateTime",
      valueFormatter: (params) => new Date(params?.value).toISOString(),
      filterOperators: quantityOnlyOperators,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
    },
    {
      field: "fraud_type",
      headerName: "Fraud Type",
      flex: 1,
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
              <Form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                  // sx={{
                  //   "& > div": {
                  //     gridColumn: isNonMobile ? undefined : "span 6",
                  //   },
                  // }}
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
                    // helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 3" }}
                    // InputProps={{ style: { color: getFontColor(values.name) } }}
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
                  >
                    Create
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          {/* <Box display="flex" justifyContent="end" mt="20px">
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
              type="button"
              color="success"
              variant="contained"
              sx={{ mx: "5px" }}
              onClick={() => {
                // onConfirm();
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </Box> */}
        </Box>
      </Modal>
      <Header title="TCG" subtitle="All received calls" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          paginationMode="server"
          rowCount={rowCountState}
          rows={receivedCalls}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          filterModel={filterModel}
          // onFilterModelChange={(model) => setFilterModel(model)}
          onFilterModelChange={setFilterModel}
          slots={{
            toolbar: editToolbar,
          }}
          pagintaion
          // filter
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
  email: yup.string().email().required("required"),
});
