import React from "react";
import {
  Box,
  Stack,
  Typography,
  Tooltip,
  SvgIcon,
  AppBar,
  Drawer,
} from "@mui/material";

import { usePathname } from 'next/navigation'

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  let navHover = "#EE6457";

  let dashboardPage = false;
  let termPage = false;
  let nuikitPage = false;

  let currTxt = {};
  let currNav = {};

  let bg = "";

  const url = usePathname()
  // console.log(url);

  // const nevigate = useNavigate();

  if (url == "/dashboard") {
    dashboardPage = true;
  } else if (url == "/TermView") {
    termPage = true;
  } else if (url == "/NuikitView") {
    nuikitPage = true;
  }

  function bgChage(nav: string) {
    if (url == "/dashboard" && nav == "dashboard") return "#EE6457";
    else if (url == "/TermView" && nav == "term") return "#EE6457";
    else if (url == "/NuikitView" && nav == "nuikit") return "#EE6457";
  }

  function fontChange(nav: string) {
    if (url == "/dashboard" && nav == "dashboard") return "#EE6457";
    else if (url == "/TermView" && nav == "term") return "#EE6457";
    else if (url == "/NuikitView" && nav == "nuikit") return "#EE6457";
    else return "#858382";
  }

  //
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const drawerWidth = 240;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    // <Stack
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //     bgcolor: "#FDF5F4",
    //     borderRadius: "0rem 1.25rem 1.25rem 0rem",
    //   }}
    // >
    //   <Stack sx={{ marginLeft: "10%", marginTop: "10%" }}>
    //     {/* Logo */}
    //     <Stack sx={{ display: "flex", flexDirection: "row" }}>
    //       <Box sx={{ width: "1.7625rem", height: "1.7625rem" }}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="29"
    //           height="29"
    //           viewBox="0 0 29 29"
    //           fill="none"
    //         >
    //           <path
    //             d="M20.6708 4.07891C16.0801 0.32286 7.78669 1.75908 4.02111 7.55756C0.25553 13.356 1.90352 21.1093 7.70201 24.8748C9.90396 26.3048 12.3878 26.9541 14.8281 26.8919C18.8139 26.7903 22.6837 24.7905 25.0193 21.1939C27.3483 17.0164 27.4577 13.6818 26.2057 10.3431"
    //             stroke="#EE6457"
    //             stroke-width="3"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //           />
    //           <path
    //             d="M9 13.125L13.6364 18L26 5"
    //             stroke="#EE6457"
    //             stroke-width="3"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //           />
    //         </svg>
    //       </Box>

    //       <Typography
    //         variant="h6"
    //         sx={{ fontWeight: "600", fontSize: "1.1875rem", marginLeft: "4%" }}
    //       >
    //         Nuikit Tracking
    //       </Typography>
    //     </Stack>
    //     {/*  */}

    //     {/* Context */}
    //     <Stack sx={{ marginTop: "10%", gap: "10%" }}>
    //       <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    //         {/* Dashboard */}
    //         <Stack>
    //           <Typography variant="subtitle1">Menu</Typography>
    //           <a href="/dashboard" style={{ textDecoration: "none" }}>
    //             <Stack
    //               sx={{
    //                 display: "flex",
    //                 flexDirection: "row",
    //                 marginTop: "0.6rem",
    //                 width: "12.188vw",
    //                 height: "2.963vh",
    //                 padding: "0.38rem",
    //                 borderRadius: "0.5rem",
    //                 backgroundColor: bgChage('dashboard'),
    //                 ":hover": {
    //                   backgroundColor: "#EE6457",
    //                   "& .h": { stroke: "white", color: "white" },
    //                 },
    //               }}
    //             >
    //               <SvgIcon
    //                 className="h"
    //                 sx={{ width: "1.1rem", height: "1.25713rem" }}
    //               >
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   width="18"
    //                   height="21"
    //                   viewBox="0 0 18 21"
    //                   fill="none"
    //                   stroke={fontChange('dashboard')}
    //                 >
    //                   <path
    //                     d="M0.75 9.14923C0.75 8.50541 1.0258 7.89243 1.50762 7.46539L7.30762 2.32487C8.15935 1.56998 9.44065 1.56998 10.2924 2.32487L16.0924 7.46539C16.5742 7.89243 16.85 8.50541 16.85 9.14923V17.1143C16.85 18.3569 15.8426 19.3643 14.6 19.3643H3C1.75736 19.3643 0.75 18.3569 0.75 17.1143V9.14923Z"
    //                     // stroke={navHover}
    //                     stroke-width="1.5"
    //                   />
    //                   <line
    //                     x1="4.75"
    //                     y1="10.25"
    //                     x2="13.25"
    //                     y2="10.25"
    //                     // stroke={navHover}
    //                     stroke-width="1.5"
    //                     stroke-linecap="round"
    //                   />
    //                   <line
    //                     x1="4.75"
    //                     y1="14.25"
    //                     x2="13.25"
    //                     y2="14.25"
    //                     // stroke={navHover}
    //                     stroke-width="1.5"
    //                     stroke-linecap="round"
    //                   />
    //                 </svg>
    //               </SvgIcon>

    //               <Typography
    //                 className="h"
    //                 sx={{ color: fontChange('dashboard'), marginLeft: "0.84rem" }}
    //               >
    //                 Dashboard
    //               </Typography>
    //             </Stack>
    //           </a>
    //         </Stack>

    //         {/* View Board */}
    //         <Stack>
    //           <Typography variant="subtitle1">View Board</Typography>
    //           <Stack
    //             sx={{
    //               display: "flex",
    //               flexDirection: "column",
    //               gap: "0.6rem",
    //               marginTop: "0.6rem",
    //             }}
    //           >
    //             {/* Term */}
    //             <a href="/TermView" style={{ textDecoration: "none" }}>
    //               <Stack
    //                 sx={{
    //                   display: "flex",
    //                   flexDirection: "row",
    //                   width: "12.188vw",
    //                   height: "2.963vh",
    //                   padding: "0.38rem",
    //                   borderRadius: "0.5rem",
    //                   backgroundColor: bgChage('term'),
    //                   ":hover": {
    //                     backgroundColor: "#EE6457",
    //                     "& .h": { stroke: "white", color: "white" },
    //                     "& circle": { fill: "white" },
    //                   },
    //                 }}
    //               >
    //                 <SvgIcon
    //                   className="h"
    //                   sx={{ width: "1.1rem", height: "1.25rem" }}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="18"
    //                     height="20"
    //                     viewBox="0 0 18 20"
    //                     fill="none"
    //                     stroke={fontChange('term')}
    //                   >
    //                     <line
    //                       x1="7.15"
    //                       y1="5.6499"
    //                       x2="13.65"
    //                       y2="5.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <line
    //                       x1="7.15"
    //                       y1="9.6499"
    //                       x2="13.65"
    //                       y2="9.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <line
    //                       x1="7.15"
    //                       y1="13.6499"
    //                       x2="13.65"
    //                       y2="13.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <rect
    //                       x="0.75"
    //                       y="0.75"
    //                       width="16.1"
    //                       height="18.5"
    //                       rx="2.25"
    //                       stroke-width="1.5"
    //                     />
    //                     <circle cx="4" cy="5.60005" r="0.8" fill="#EE6457" />
    //                     <circle cx="4" cy="9.60005" r="0.8" fill="#EE6457" />
    //                     <circle cx="4" cy="13.6" r="0.8" fill="#EE6457" />
    //                   </svg>
    //                 </SvgIcon>
    //                 <Typography
    //                   className="h"
    //                   sx={{ color: fontChange('term'), marginLeft: "0.84rem" }}
    //                 >
    //                   Term
    //                 </Typography>
    //               </Stack>
    //             </a>
    //             {/* Nuikit */}
    //             <a href="/NuikitView" style={{ textDecoration: "none" }}>
    //               <Stack
    //                 sx={{
    //                   display: "flex",
    //                   flexDirection: "row",
    //                   width: "12.188vw",
    //                   height: "2.963vh",
    //                   padding: "0.38rem",
    //                   borderRadius: "0.5rem",
    //                   backgroundColor: bgChage('nuikit'),
    //                   ":hover": {
    //                     backgroundColor: "#EE6457",
    //                     "& .h": { stroke: "white", color: "white" },
    //                     "& circle": { fill: "white" },
    //                   },
    //                 }}
    //               >
    //                 <SvgIcon
    //                   className="h"
    //                   sx={{ width: "1.1rem", height: "1.25rem" }}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="18"
    //                     height="20"
    //                     viewBox="0 0 18 20"
    //                     fill="none"
    //                     stroke={fontChange('nuikit')}
    //                   >
    //                     <line
    //                       x1="7.15"
    //                       y1="5.6499"
    //                       x2="13.65"
    //                       y2="5.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <line
    //                       x1="7.15"
    //                       y1="9.6499"
    //                       x2="13.65"
    //                       y2="9.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <line
    //                       x1="7.15"
    //                       y1="13.6499"
    //                       x2="13.65"
    //                       y2="13.6499"
    //                       stroke-width="1.5"
    //                       stroke-linecap="round"
    //                     />
    //                     <rect
    //                       x="0.75"
    //                       y="0.75"
    //                       width="16.1"
    //                       height="18.5"
    //                       rx="2.25"
    //                       stroke-width="1.5"
    //                     />
    //                     <circle cx="4" cy="5.60005" r="0.8" fill="#EE6457" />
    //                     <circle cx="4" cy="9.60005" r="0.8" fill="#EE6457" />
    //                     <circle cx="4" cy="13.6" r="0.8" fill="#EE6457" />
    //                   </svg>
    //                 </SvgIcon>
    //                 <Typography
    //                   className="h"
    //                   sx={{ color: fontChange('nuikit'), marginLeft: "0.84rem" }}
    //                 >
    //                   Category
    //                 </Typography>
    //               </Stack>
    //             </a>
    //             {/*  */}
    //           </Stack>
    //         </Stack>
    //         {/* End ViewBoard */}
    //       </Stack>
    //     </Stack>
    //     {/*  */}
    //   </Stack>
    // </Stack>

    <Stack>
      {/* <AppBar position="fixed" open={open} sx={{width: ''}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        {open == true ? (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              // border: "1px solid black",
              width: "84%",
              justifyContent: "flex-start",
              ml: "auto",
              mr: "auto",
              mb: "1.4vh",
            }}
          >
            <Box sx={{ width: "1.7625rem", height: "1.7625rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M20.6708 4.07891C16.0801 0.32286 7.78669 1.75908 4.02111 7.55756C0.25553 13.356 1.90352 21.1093 7.70201 24.8748C9.90396 26.3048 12.3878 26.9541 14.8281 26.8919C18.8139 26.7903 22.6837 24.7905 25.0193 21.1939C27.3483 17.0164 27.4577 13.6818 26.2057 10.3431"
                  stroke="#EE6457"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 13.125L13.6364 18L26 5"
                  stroke="#EE6457"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: "1.1875rem",
                marginLeft: "4%",
                opacity: 1,
              }}
            >
              Nuikit Tracking
            </Typography>
          </Stack>
        ) : (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              // border: "1px solid black",
              mr: 2,
              ml: 2.4,
              mb: "1.4vh",
            }}
          >
            <Box sx={{ width: "1.7625rem", height: "1.7625rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M20.6708 4.07891C16.0801 0.32286 7.78669 1.75908 4.02111 7.55756C0.25553 13.356 1.90352 21.1093 7.70201 24.8748C9.90396 26.3048 12.3878 26.9541 14.8281 26.8919C18.8139 26.7903 22.6837 24.7905 25.0193 21.1939C27.3483 17.0164 27.4577 13.6818 26.2057 10.3431"
                  stroke="#EE6457"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 13.125L13.6364 18L26 5"
                  stroke="#EE6457"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: "1.1875rem",
                marginLeft: "4%",
                opacity: 0,
              }}
            >
              Nuikit Tracking
            </Typography>
          </Stack>
        )}

        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              // nevigate("/dashboard");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SpaceDashboardIcon sx={{ color: fontChange("dashboard") }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0, color: fontChange("dashboard") }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          {open == true ? (
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItem
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  display: "flex",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"View Board"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItem>
            </ListItem>
          ) : null}

          {/* Category View */}
          <a href="/NuikitView" style={{ textDecoration: "none" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {open == true ? (
                    <CategoryIcon sx={{ opacity: 0 }} />
                  ) : (
                    <CategoryIcon sx={{ color: fontChange("nuikit") }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Category View"}
                  sx={{ opacity: open ? 1 : 0, color: fontChange("nuikit") }}
                />
              </ListItemButton>
            </ListItem>
          </a>

          {/* Term View */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              // nevigate("/TermView");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {open == true ? (
                  <AccountTreeIcon sx={{ opacity: 0 }} />
                ) : (
                  <AccountTreeIcon sx={{ color: fontChange("term") }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={"Term View"}
                sx={{ opacity: open ? 1 : 0, color: fontChange("term") }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Stack>
  );
}

export default Navbar;
