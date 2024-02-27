import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Typography,
  Modal,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Formik, Form } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createBnumberGroupApi,
  deleteBnumberGroupsApi,
  getBnumberGroupNumbersApi,
  getBnumberGroupsApi,
} from "../../state/api/bnumberGroups";

const CreateBnumberGroup = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedFile, setSelectedFile] = useState(null);
  const [bnumberGroups, setBnumberGroups] = useState([]);
  const [bnumbers, setBnumbers] = useState([
    { id: "", group_id: "", bnumber: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    async function fetchBnumberGroups() {
      setLoading(true);
      const bnumberGroups = await getBnumberGroupsApi();

      setBnumberGroups(bnumberGroups);
      setLoading(false);
    }

    fetchBnumberGroups();
  }, []);

  const handleGettingBnumbers = (id) => async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(id);

    const response = await getBnumberGroupNumbersApi(user.token, id);
    if (response) {
      setBnumbers(response.bnumbers);
      setIsOpen(true);
      // toast.success("Bnumber group deleted");
      // setBnumberGroups(bnumberGroups.filter((row) => row.id !== id));
    } else {
      toast.error("Error while getting B numbers");
    }
  };

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
          Create new
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleFormSubmit = async (values) => {
    const token = localStorage.getItem("token");
    console.log(values);
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile);

    formData.append("name", values.name);

    const newBnumberGroup = await createBnumberGroupApi(formData);
    setSelectedFile(null);
    if (newBnumberGroup) {
      toast.success("Bnumber group created");
      setBnumberGroups([...bnumberGroups, newBnumberGroup]);
    } else {
      toast.error("Error while creating");
    }
    values.name = "";
    values.file = "";
  };

  const handleFormChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const getFontColor = (value) => {
    return bnumberGroups.some((e) => e.name == value) ? "red" : "inherit";
  };

  const handleDeleteClick = (id) => async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await deleteBnumberGroupsApi(id, user.token);
    if (response) {
      toast.success("Bnumber group deleted");
      setBnumberGroups(bnumberGroups.filter((row) => row.id !== id));
    } else {
      toast.error("Error while deleting");
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Order ID",
      flex: 1,
    },
    // {
    //   field: "numbers",
    //   headerName: "Numbers",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <Box display="flex">
    //         <Box>
    //           <Button
    //             type="button"
    //             color="info"
    //             variant="contained"
    //             sx={{ mx: "5px" }}
    //             onClick={() => handleGettingBnumbers(params)}
    //           >
    //             Detail
    //           </Button>
    //         </Box>
    //         {/* {params.row.numbers.map(
    //           (number_info) => ` ${number_info.number}`
    //         ) || ""} */}
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      {/* <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <Box mb="30px">
            <Typography
              variant="h4"
              color={colors.primary[400]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              {`Numbers of bnumber group 
                ${
                  bnumberGroups &&
                  bnumberGroups?.find((bnumberGroup) => {
                    return bnumberGroup.id === bnumbers?.group_id;
                  })?.name
                }`}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                {bnumbers &&
                  bnumbers?.map((number_info) => {
                    return (
                      <ListItem>
                        <Typography
                          variant="h6"
                          color={colors.greenAccent[400]}
                        >
                          {number_info.bnumber}
                        </Typography>
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="button"
              color="error"
              variant="outlined"
              sx={{ mx: "5px" }}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal> */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          m="20px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "1px solid #000",
            // boxShadow: 24,
            borderRadius: "5px",
            // boxShadow: "0px 0px 2px 2px #d9dde2",
            p: 4,
          }}
        >
          <Header
            title="CREATE BNUMBER GROUP"
            subtitle="Create new bnumber group"
          ></Header>
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
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 6",
                    },
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
                    error={!!touched.name && !!errors.name}
                    // helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 3" }}
                    InputProps={{ style: { color: getFontColor(values.name) } }}
                  />

                  <Button
                    className="button-upload"
                    type="upload"
                    color="secondary"
                    variant="contained"
                    onClick={handleClick}
                    sx={{ gridColumn: "span 3" }}
                  >
                    Upload a file
                  </Button>
                  <Typography
                    variant="h6"
                    // color={colors.grey[300]}
                    sx={{ m: "15px 0 0px 0px", gridColumn: "span 6" }}
                  >
                    {selectedFile && "File name: " + selectedFile.name}
                  </Typography>
                  <TextField
                    inputRef={hiddenFileInput}
                    fullWidth
                    variant="filled"
                    type="file"
                    inputProps={{
                      accept:
                        ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                    }}
                    onBlur={handleBlur}
                    onChange={handleFormChange}
                    value={values.file}
                    name="file"
                    error={!!touched.file && !!errors.file}
                    sx={{ display: "none" }}
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
                    disabled={selectedFile | (values.name === "")}
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
        </Box>
      </Modal>

      <Box m="20px">
        <Header title="BNUMBER GROUPS" subtitle="All created bnumber groups" />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={bnumberGroups}
            columns={columns}
            editMode="row"
            // rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            // onRowEditStop={handleRowEditStop}
            // processRowUpdate={processRowUpdate}
            slots={{
              toolbar: editToolbar,
            }}
            // slotProps={{
            //   toolbar: { setBnumberGroups },
            // }}
          />
        </Box>
      </Box>
      <ToastContainer />
    </>
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
