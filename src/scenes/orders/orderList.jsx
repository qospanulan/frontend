import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getOrdersApi } from "../../state/api/orders";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const orders = await getOrdersApi();

      setOrders(orders);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const columns = [
    {
      field: "order_name",
      headerName: "Order Group",
      flex: 1,
      valueGetter: (params) => params.row.order_group?.name || "",
    },
    {
      field: "country_name",
      headerName: "Country",
      flex: 1,
      valueGetter: (params) => params.row.carrier?.country?.name || "",
    },
    {
      field: "carrier_name",
      headerName: "Carrier",
      flex: 1,
      valueGetter: (params) => params.row.carrier?.name || "",
    },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 1,
      valueGetter: (params) => params.row.carrier?.prefix || "",
    },
    {
      field: "percentage_of_calls",
      headerName: "Percentage Of Calls",
      flex: 1,
      valueGetter: (params) => params.row.percentage_of_calls + "%",
    },
    {
      field: "call_type",
      headerName: "Call Type",
      flex: 1,
      valueGetter: (params) => params.row.call_type?.name || "",
    },

    {
      field: "answered_call_duration",
      headerName: "Answered Call Duration",
      flex: 1,
    },
    {
      field: "action_on_fas",
      headerName: "Action On FAS",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="ORDERS" subtitle="All created orders" />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={orders} columns={columns} />
      </Box>
    </Box>
  );
};

export default Orders;
