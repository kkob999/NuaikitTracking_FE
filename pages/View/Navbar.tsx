import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  SvgIcon,
  AppBar,
  Drawer,
} from "@mui/material";

import { usePathname } from "next/navigation";

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
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
// import { useNavigate, Link } from "react-router-dom";

import { useRouter } from "next/navigation";

import Link from "next/link";
import axios, { AxiosError, AxiosResponse } from "axios";
import { WhoAmIResponse } from "../api/whoAmI";

function Navbar() {
  const router = useRouter();

  let navHover = "#EE6457";

  let dashboardPage = false;
  let termPage = false;
  let nuikitPage = false;

  let currTxt = {};
  let currNav = {};

  let bg = "";

  const url = usePathname();
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

  const [fullName, setFullName] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          console.log("data ok");
          setFullName(response.data.firstName + " " + response.data.lastName);
          setF_name(response.data.firstName);
          setL_name(response.data.lastName);
          setCmuAccount(response.data.cmuAccount);
          setStudentId(response.data.studentId ?? "No Student Id");
        }
      })
      .catch((error: AxiosError<WhoAmIResponse>) => {
        if (!error.response) {
          console.log("error.response");
          setErrorMessage(
            "Cannot connect to the network. Please try again later."
          );
        } else if (error.response.status === 401) {
          console.log("Authentication failed");
          setErrorMessage("Authentication failed");
        } else if (error.response.data.ok === false) {
          console.log("error.response.data.message");
          setErrorMessage(error.response.data.message);
        } else {
          console.log("Unknown error occurred. Please try again later");
          setErrorMessage("Unknown error occurred. Please try again later");
        }
      });
  }, []);

  function signOut() {
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1300) setOpen(false);
    }
    console.log(fullName);
  }, []);

  return (
    <Stack>
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
              router.push("/Dashboard");
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
            // <ListItem disablePadding sx={{ display: "block" }}>
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
          ) : // </ListItem>
          null}

          {/* Category View */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              router.push("/NuikitView");
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

          {/* Term View */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              router.push("/TermView");
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

        <Stack sx={{ mt: "auto", mb: 6 }}>
          {!open ? (
            <Stack sx={{}}>
              {/* Avatar */}
              <Avatar
                sx={{ width: 44, height: 44, mb: 2, ml: "auto", mr: "auto" }}
              >
                {f_name === undefined ? null : f_name[0]}
                {l_name === undefined ? null : l_name[0]}
              </Avatar>

              <IconButton
                onClick={signOut}
                aria-label="Logout"
                size="large"
                sx={{
                  width: 44,
                  height: 44,
                  ml: "auto",
                  mr: "auto",
                  bgcolor: "#EE6457",
                  color: "white",
                  "&:hover": {
                    bgcolor: "white",
                    color: "#EE6457",
                  },
                }}
              >
                <ExitToAppOutlinedIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack>
              <Stack
                direction={"row"}
                sx={{
                  width: "80%",
                  ml: "auto",
                  mr: "auto",
                  mb: 2,
                  justifyContent: "space-between",
                }}
              >
                {/* Name */}
                <Stack>
                  <Typography
                    sx={{
                      color: "#EE6457",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {studentId === undefined ? null : studentId}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "medium",
                        color: "#858382",
                      }}
                    >
                      {f_name === undefined
                        ? null
                        : f_name.charAt(0) + f_name.slice(1).toLowerCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "medium",
                        color: "#858382",
                      }}
                    >
                      {l_name === undefined ? null : l_name.charAt(0) + "."}
                    </Typography>
                  </Stack>
                </Stack>
                {/* Avatar */}
                <Avatar sx={{ width: 44, height: 44 }}>
                  {f_name === undefined ? null : f_name[0]}
                  {l_name === undefined ? null : l_name[0]}
                </Avatar>
              </Stack>
              <Button
                variant="outlined"
                onClick={signOut}
                sx={{
                  width: "80%",
                  ml: "auto",
                  mr: "auto",
                  textTransform: "capitalize",
                  color: "#EE6457",
                  borderColor: "#EE6457",
                  "&:hover": {
                    borderColor: "#EE6457",
                  },
                }}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
}

export default Navbar;
