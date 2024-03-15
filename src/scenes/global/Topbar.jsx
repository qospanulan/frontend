import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useState, useMemo, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";

// import { useContext } from "react";
// import { UserContext } from "../../user";

import Button from "@mui/material/Button";
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
import { useAuthContext } from "../../hooks/useAuthContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setUsername] = useState("");

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    localStorage.setItem("user", null);

    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      const response = await getCurrentUser(user.token);
      if (response) {
        setUsername(response.first_name + " " + response.last_name);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          // backgroundColor={colors.primary[800]}
          backgroundColor={colors.grey[100]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          {/* Нужно откомментить позже */}
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> */}

          {/* <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton> */}
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
            <MenuItem onClick={handleClose}>{username}</MenuItem>
            <MenuItem onClick={handleLogout}>
              {/* <Link to="/login">Logout</Link> */}
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
