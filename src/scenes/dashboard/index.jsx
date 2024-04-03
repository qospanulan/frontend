import Header from "../../components/Header";

import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px" width="90%" height="75%">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Typography variant="h4" fontWeight="bold" sx={{ mb: "5px" }}>
        No reports created
      </Typography>
      {/* <Box display="block" width="100%" height="100%" mt="20px">
        <iframe
          name="iframe1"
          src="http://localhost:3000/public-dashboards/43ee7dcd72924a91b6acba68c4fcca1f"
          width="100%"
          height="100%"
        ></iframe>
      </Box> */}
    </Box>
  );
};

export default Dashboard;
