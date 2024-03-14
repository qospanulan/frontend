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
import { getCarriersApi } from "../../state/api/carriers/carriers";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Carriers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [carriers, setCarriers] = useState([]);
  const [detailId, setDetailId] = useState();
  const [choosenCarrier, setChoosenCarrier] = useState({
    name: "",
    cli: [],
    cli_ranges: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCarriers() {
      const user = JSON.parse(localStorage.getItem("user"));

      setLoading(true);
      const carriers = await getCarriersApi(user.token);

      setCarriers(carriers);
      setLoading(false);
    }

    fetchCarriers();
  }, []);

  const handleDetailClick = function (id) {
    setDetailId(id);
    setChoosenCarrier(
      carriers &&
        carriers.find((carrier) => {
          return carrier.id === id;
        })
    );
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
      field: "numbers",
      headerName: "Numbers",
      flex: 1,
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
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Detail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Prefixes and Numbers of carrier 
        ${
          carriers &&
          carriers.find((carrier) => {
            return carrier.id === detailId;
          })?.name
        }`}
        prefixes={
          choosenCarrier?.route_type?.name === "gsm"
            ? choosenCarrier?.cli.map((number_info) => number_info.prefix)
            : choosenCarrier?.cli_ranges.map((number_info) => (
                <span>
                  <br />
                  {number_info.prefix}
                </span>
              ))
        }
        numbers={
          choosenCarrier?.route_type?.name === "gsm"
            ? choosenCarrier?.cli.map((number_info) => number_info.number)
            : choosenCarrier?.cli_ranges.map((number_info) => (
                <span>
                  start: {number_info.start}
                  <br />
                  end: {number_info.end}
                </span>
              ))
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
