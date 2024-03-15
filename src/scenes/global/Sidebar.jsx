import { useState } from "react";
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
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useAuthContext } from "../../hooks/useAuthContext";

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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("TCG");
  const navigate = useNavigate();

  const { user } = useAuthContext();

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
                    GTC
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

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
              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Main
              </Typography> */}

              {/* TCG */}
              <SubMenu
                title="Reports"
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
              {user && user.role !== "moderator" && (
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
              )}

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
                  title="Bnumber Group"
                  to="/orders/bnumber-group"
                  icon={<PlaylistAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>

              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Charts
              </Typography> */}
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
