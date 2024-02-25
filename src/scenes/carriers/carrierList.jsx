import {
  Box,
  Button,
  useTheme,
  Modal,
  Grid,
  List,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getCarriersApi } from "../../state/api/carriers";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     cloneElement(element, {
//       key: value,
//     })
//   );
// }

const Carriers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [carriers, setCarriers] = useState([]);
  const [detailId, setDetailId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCarriers() {
      setLoading(true);
      const carriers = await getCarriersApi();

      setCarriers(carriers);
      setLoading(false);
    }

    fetchCarriers();
  }, []);

  const handleDetailClick = function (id) {
    setDetailId(id);
    setIsOpen(true);
  };

  const columns = [
    {
      field: "route",
      headerName: "Route",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.route_type?.name || "",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.country?.name || "",
    },
    {
      field: "name",
      headerName: "Carrier",
      flex: 1,
    },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 1,
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "numbers",
      headerName: "Numbers",
      flex: 1,
      valueGetter: (params) =>
        params.row.numbers.map((number_info) => ` ${number_info.number}`) || "",
      renderCell: (params) => {
        return (
          <Box display="flex">
            <Box>
              <Button
                type="button"
                color="info"
                variant="contained"
                sx={{ mx: "5px" }}
                onClick={() => handleDetailClick(params.row.id)}
              >
                Detail
              </Button>
            </Box>
            {/* {params.row.numbers.map(
              (number_info) => ` ${number_info.number}`
            ) || ""} */}
          </Box>
        );
      },
    },
    // {
    //   field: "numbers_detail",
    //   type: "actions",
    //   headerName: "Numbers Detail",
    //   width: 100,
    //   cellClassName: "actions",
    //   value: "89234...",
    //   getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Detail"
    //         onClick={() => handleDetailClick(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
  ];

  return (
    <>
      <Modal
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
              {`Numbers of carrier 
                ${
                  carriers &&
                  carriers.find((carrier) => {
                    return carrier.id === detailId;
                  })?.name
                }`}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                {carriers &&
                  carriers
                    .find((carrier) => {
                      return carrier.id === detailId;
                    })
                    ?.numbers.map((number_info) => {
                      return (
                        <ListItem>
                          <Typography
                            variant="h6"
                            color={colors.greenAccent[400]}
                          >
                            {number_info.number}
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
      </Modal>
      <Box m="20px">
        <Header title="CARRIERS" subtitle="Create new carrier" />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid rows={carriers} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Carriers;
