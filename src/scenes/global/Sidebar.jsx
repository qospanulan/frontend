import { useContext, useState } from "react";
// import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import { UserContext } from "../../user";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

// const handleSubMenuClick = (
//   submenuTitle,
//   selected,
//   setSelected
//   // to,
//   // navigate
// ) => {
//   if (selected === submenuTitle) {
//     // If submenu is already selected, collapse it
//     setSelected("Dashboard");
//     // navigate(to);
//   } else {
//     setSelected(submenuTitle);
//     // If submenu is not selected, open it and select the first item
//     // navigate("/");
//   }
// };

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("TCG");
  const navigate = useNavigate();
  // const { token, setToken } = useContext(UserContext);
  return (
    <>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#0ecde0 !important",
          },
          "& .pro-menu-item.active": {
            color: "#0ecde0 !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ITEM */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h4" color={colors.grey[100]}>
                    CABINET
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* USER */}
            {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Kospan Ulan
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  Developer
                </Typography>
              </Box>
            </Box>
          )} */}

            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                // to="/"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Main
              </Typography>

              {/* Carriers */}
              <SubMenu
                title="TCG Panel"
                style={{ color: colors.grey[100] }}
                icon={<ContactsOutlinedIcon />}
              >
                <Item
                  title="TCG"
                  to="/received-calls"
                  icon={<CallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Orders
              </Typography>

              {/* Carriers */}
              <SubMenu
                title="Carriers Panel"
                style={{ color: colors.grey[100] }}
                icon={<ContactsOutlinedIcon />}
              >
                <Item
                  title="Carriers"
                  to="/carriers"
                  icon={<CallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Create Carrier"
                  to="/carriers/new/"
                  icon={<AddIcCallOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>

              {/* Orders */}
              <SubMenu
                title="Orders Panel"
                style={{ color: colors.grey[100] }}
                icon={<ListAltIcon />}
              >
                <Item
                  title="Orders"
                  to="/orders"
                  icon={<PlaylistAddCheckIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Create Order"
                  to="/orders/new/"
                  icon={<PlaylistAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Create Bnumber Group"
                  to="/orders/new-bnumber-group"
                  icon={<PlaylistAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>

              {/* <Item
              title="ProfileForm"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Charts
              </Typography>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
