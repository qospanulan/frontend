import React, { useState, useContext } from "react";
// import { UserContext } from "../../user.js";

import { Box, Button, TextField, Link } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { getTokenApi } from "../../state/api/users/signIn";
import { useLogin } from "../../hooks/useLogin";
// import { onChange } from "react-toastify/dist/core/store";

const LogoutForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //   const { login, error, isLoading } = useLogin();

  return (
    <Box
      display="block"
      m="20px auto"
      p="20px"
      width={"500px"}
      height={"300px"}
      // width={"50%"}
      justifyContent={"center"}
      alignItems={"center"}
      // border={"1px solid black"}
      borderRadius={"5px"}
      boxShadow={"0px 0px 5px 5px #d9dde2"}
    >
      <Header title="LOGOUT" subtitle="Вы вышли из аккаунта..."></Header>

      <Box display="flex" justifyContent="center" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          <Link to="/login">Login</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default LogoutForm;
