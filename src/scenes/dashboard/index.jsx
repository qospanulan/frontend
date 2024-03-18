import Header from "../../components/Header";

import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Typography
        variant="h4"
        // color={colors.primary[400]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        No reports created
      </Typography>
      {/* <Box
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
        
        <iframe
          name="iframe1"
          src="http://localhost:3000/d-solo/bdfa7egeep5vkd/new-dashboard?orgId=1&from=1710090989301&to=1710112589301&panelId=1"
          width="550"
          height="300"
          frameborder="0"
          style={{ m: "20px", gridColumn: "span 2" }}
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/bdfa7egeep5vkd/new-dashboard?orgId=1&from=1710116722866&to=1710138322867&theme=light&panelId=1"
          width="550"
          height="300"
          frameborder="0"
          style={{ marginLeft: "20px", gridColumn: "span 2" }}
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/bdfa7egeep5vkd/new-dashboard?orgId=1&from=1710090989301&to=1710112589301&panelId=1"
          width="550"
          height="300"
          frameborder="0"
          style={{ marginLeft: "20px", gridColumn: "span 2" }}
        ></iframe>
      </Box> */}
    </Box>
  );
};

export default Dashboard;
