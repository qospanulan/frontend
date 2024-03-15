import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getOrdersApi } from "../../state/api/orders/orders";
import Detail from "../../components/Detail";
import { getBnumberGroupNumbersApi } from "../../state/api/orders/bnumberGroups";
import { useAuthContext } from "../../hooks/useAuthContext";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [bnumbers, setBnumbers] = useState([]);
  const [detailName, setDetailName] = useState();
  // const [bnumberId, setBnumberId] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const orders = await getOrdersApi(user.token);

      setOrders(orders);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const handleDetailClick = function (name) {
    setDetailName(name);
    setIsOpen(true);
  };

  // const handleGettingBnumbers = (id) => async () => {
  const handleGettingBnumbers = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await getBnumberGroupNumbersApi(user.token, id);
    if (response) {
      setBnumbers(response.bnumbers);
      // toast.success("Bnumber group deleted");
      // setBnumberGroups(bnumberGroups.filter((row) => row.id !== id));
    } else {
      // toast.error("Error while getting B numbers");
    }
  };

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
    // {
    //   field: "prefix",
    //   headerName: "Prefix",
    //   flex: 1,
    //   valueGetter: (params) => params.row.carrier?.prefix || "",
    // },
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
    {
      field: "bnumber_group",
      headerName: "Bnumber Group",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex">
            <Button
              type="button"
              color="info"
              variant="contained"
              sx={{ mx: "5px" }}
              onClick={() => {
                handleGettingBnumbers(params.row.bnumber_group?.id);
                handleDetailClick(params.row.bnumber_group?.name);
              }}
            >
              {params.row.bnumber_group?.name || ""}
            </Button>
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
        title={`Numbers of Bnumber Group 
          ${detailName}`}
        bnumbers={bnumbers && bnumbers.map((bnumber) => bnumber.bnumber)}
      />
      <Box m="20px">
        <Header title="ORDERS" subtitle="All created orders" />
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid rows={orders} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Orders;
