import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getOrdersApi } from "../../state/api/orders/orders";
import { getReceivedCallsApi } from "../../state/api/tcg/receivedCalls";

const TCG = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [receivedCalls, setReceivedCalls] = useState([]);
  const [rowCountState, setRowCountState] = useState(10);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  useEffect(() => {
    async function fetchReceivedCalls() {
      setIsLoading(true);
      const response = await getReceivedCallsApi({
        startDate,
        endDate,
        paginationModel,
        // perPage,
      });

      setReceivedCalls(response.data);
      setRowCountState(response.total);
      setIsLoading(false);
    }

    fetchReceivedCalls();
  }, [paginationModel, setPaginationModel]);

  const columns = [
    {
      field: "order_id",
      headerName: "Order ID",
      flex: 1,
    },
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
      headerName: "From Number",
      flex: 1,
    },
    {
      field: "dest_number",
      headerName: "Dest. Number",
      flex: 1,
    },
    {
      field: "context",
      headerName: "Context",
      flex: 1,
    },
    {
      field: "cli",
      headerName: "CLI",
      flex: 1,
    },
    {
      field: "received_timestamp",
      headerName: "Received Timestamp",
      flex: 1,
      type: "dateTime",
    },
    {
      field: "exten_timestamp",
      headerName: "Exten Timestamp",
      flex: 1,
      type: "dateTime",
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      type: "dateTime",
    },
    {
      field: "fraud_type",
      headerName: "Fraud Type",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
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
          pagintaion
        />
      </Box>
    </Box>
  );
};

export default TCG;
