import React, { useState, useContext } from "react";
// import { UserContext } from "../../user.js";

import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { getTokenApi } from "../../state/api/users/signIn";
import { useLogin } from "../../hooks/useLogin";
// import { onChange } from "react-toastify/dist/core/store";

// =====================
import { IconButton, useTheme, Typography } from "@mui/material";
import { useMemo, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

// import { useContext } from "react";
// import { UserContext } from "../../user";

// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import { InputBase } from "@mui/material";
import InputBase from "@mui/material/InputBase";

// import { LightModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

// import { DarkModeOutlinedIcon } from "@mui/icons-material/DarkModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

// import { NotificationsOutlinedIcon } from "@mui/icons-material/NotificationsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

// import { SettingsOutlinedIcon } from "@mui/icons-material/SettingsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// import { PersonOutlinedIcon } from "@mui/icons-material/PersonOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

// import { SearchIcon } from "@mui/icons-material/Search";
import SearchIcon from "@mui/icons-material/Search";
import { getCurrentUser } from "../../state/api/users/signIn";

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setUsername] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // setUser(JSON.parse(localStorage.getItem("user")));
        // console.log("in topbar", user.email, user.token);
        const response = await getCurrentUser(user.token);
        setUsername(response.first_name + " " + response.last_name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // ========
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { login, error, isLoading } = useLogin();

  const handleLogin = async (values) => {
    login(values.email, values.password);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Box
      display="block"
      m="20px"
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      // border={"1px solid black"}
    >
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* ICONS */}
        {/* Нужно откомментить позже */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <PersonOutlinedIcon />
        </IconButton>

        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "user-menu",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {
            user &&
              // <>
              ((<MenuItem onClick={handleClose}>{username}</MenuItem>),
              (
                <MenuItem onClick={handleLogout}>
                  {/* <Typography>Вы вышли</Typography> */}
                  <Link to="/logout">Logout</Link>
                </MenuItem>
              ))
            // </>
          }
          {!user && (
            <MenuItem>
              <Link to="/login">Login</Link>
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Box
        display="block"
        m="20px auto"
        p="20px"
        width={"500px"}
        justifyContent={"center"}
        alignItems={"center"}
        // border={"1px solid black"}
        borderRadius={"5px"}
        boxShadow={"0px 0px 5px 5px #d9dde2"}
      >
        <Header title="LOGIN" subtitle="Login to account"></Header>
        <Formik
          onSubmit={handleLogin}
          initialValues={initialValues}
          validationSchema={orderSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                display="block"
                m=""
                gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                }}
                mt="20px"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 1", mb: "20px" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 1" }}
                />
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {/* <Link to="/">Login</Link> */}
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginForm;

const initialValues = {
  email: "",
  password: "",
};

const orderSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});
