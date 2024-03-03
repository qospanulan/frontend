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
import Detail from "../../components/Detail";
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
      <Detail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Numbers of carrier 
        ${
          carriers &&
          carriers.find((carrier) => {
            return carrier.id === detailId;
          })?.name
        }`}
        data={
          carriers &&
          carriers.find((carrier) => {
            return carrier.id === detailId;
          })?.numbers
        }
      />
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
