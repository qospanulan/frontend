import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getCarriersApi } from "../../state/api/carriers";

const Carriers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [carriers, setCarriers] = useState([]);

  useEffect(() => {
    async function fetchCarriers() {
      setLoading(true);
      const carriers = await getCarriersApi();

      setCarriers(carriers);
      setLoading(false);
    }

    fetchCarriers();
  }, []);

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
  ];

  return (
    <Box m="20px">
      <Header title="CARRIERS" subtitle="Create new carrier" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={carriers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Carriers;
