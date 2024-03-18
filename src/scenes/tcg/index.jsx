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
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as yup from "yup";
import SyncIcon from "@mui/icons-material/Sync";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState, useRef } from "react";
import { getOrdersApi } from "../../state/api/orders/orders";
import { getReceivedCallsApi } from "../../state/api/tcg/receivedCalls";
import { useAuthContext } from "../../hooks/useAuthContext";
import InputDatetimeRange from "../../components/filters/InputDatetimeRange";

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
  const [pressedBtn, setPressedBtn] = useState(false);

  const authContext = useAuthContext();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const [filterModel, setFilterModel] = useState({
    items: [
      // {
      //   id: 1,
      //   field: "received_timestamp",
      //   value: [null, dayjs().toISOString()],
      //   operator: "between",
      // },
    ],
  });
  // const [filterModel, setFilterModel] = useState(null);

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
      setIsLoading(true);
      const { user } = authContext;
      const response = await getReceivedCallsApi({
        token: user.token,
        // filterModel: filterModel,
        paginationModel: paginationModel,
        report: { is_xlsx: false, email: null },
      });

      setReceivedCalls(response.data);
      setRowCountState(response.total);
      setIsLoading(false);
    }

    fetchReceivedCalls();
  }, [paginationModel, filterModel]);

  const timestampOnlyOperators = [
    {
      label: "is",
      value: "is",
      getApplyFilterFn: (filterItem) => {
        // if (!Array.isArray(filterItem.value[0]) || filterItem.value.length !== 2) {
        // return null;
        // }
        // if (filterItem.value[0] == null || filterItem.value[1] == null) {
        // return null;
        // }

        console.log("filterItem", filterItem);
        return ({ value }) => {
          return value !== null && filterItem.value <= value;
        };
      },
      InputComponent: InputDatetimeRange,
    },
  ];

  const handleFilterModelChange = (newModel) => {
    // Update the filter model state
    const existingIndex = filterModel.items.findIndex(
      (item) => item.field === newModel.field
    );

    if (existingIndex !== -1) {
      setFilterModel((prevModel) => {
        const updatedItems = [...prevModel.items];
        updatedItems[existingIndex] = newModel;
        return { ...prevModel, items: updatedItems };
      });
    } else {
      setFilterModel((prevModel) => ({
        // ...prevModel,
        items: [...prevModel.items, newModel],
      }));
    }
  };

  const handleFormSubmit = async (values) => {
    if (pressedBtn === "downloadBtn") {
      setReport({
        is_xlsx: true,
        email: null,
      });
    } else {
      setReport({
        is_xlsx: true,
        email: values.email,
      });
    }

    setIsLoading(true);
    const { user } = authContext;

    const response = await getReceivedCallsApi({
      token: user.token,
      // filterModel: filterModel,
      paginationModel: paginationModel,
      report: {
        is_xlsx: true,
        email: pressedBtn === "downloadBtn" ? null : values.email,
      },
      // perPage,
    });

    // setReceivedCalls(response.data);
    // setRowCountState(response.total);
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
      headerName: "Received CLI",
      flex: 1,
    },
    {
      field: "dest_number",
      headerName: "CLD",
      flex: 1,
    },
    {
      field: "cli",
      headerName: "CLI",
      flex: 1,
      filterable: false,
    },
    {
      field: "received_timestamp",
      headerName: "Detected Time",
      flex: 1,
      type: "dateTime",
      valueFormatter: (params) => new Date(params?.value).toISOString(),
      filterable: false,
      // filterOperators: timestampOnlyOperators,
      // filterOperators: getGridBooleanOperators().filter(
      //   (operator) => operator.value === "equals"
      // ),
    },
    {
      field: "timestamp",
      headerName: "Call Start Time",
      flex: 1,
      type: "dateTime",
      valueFormatter: (params) => new Date(params?.value).toISOString(),
      filterable: false,
      // value: (params) => new Date(params?.value),
      // filterOperators: timestampOnlyOperators,
    },
    // {
    //   field: "duration",
    //   headerName: "Duration",
    //   flex: 1,
    // },
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
              <Form
                onSubmit={(...props) => {
                  // console.log("event", props[0].nativeEvent.submitter.name);
                  setPressedBtn(props[0].nativeEvent.submitter.name);
                  handleSubmit(...props);
                }}
              >
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
          // filterMode="server"
          rowCount={rowCountState}
          rows={receivedCalls}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          // filterModel={filterModel}
          // onFilterModelChange={(newModel) => handleFilterModelChange(newModel)}
          slots={{
            toolbar: editToolbar,
          }}
          pagintaion
          filter
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
  email: yup.string().email(),
});
