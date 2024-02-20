import Header from "../../components/Header";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { reach } from "yup";
import React from "react";
// import { UserContext } from "../../user";

const Dashboard = () => {
  // const { token, setToken } = useContext(UserContext);
  // if (!token) return <Link to="/login" />;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
