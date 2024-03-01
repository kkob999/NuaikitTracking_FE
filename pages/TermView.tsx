import React, { useState, useEffect } from "react";
//React Router
// import { useNavigate } from "react-router-dom";

import ReactFlow, { useNodesState } from "reactflow";
import "reactflow/dist/style.css";

import { usePathname, useRouter } from "next/navigation";

//MUI
import {
  AppBar,
  Box,
  Stack,
  Typography,
  List,
  Divider,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// import fetch
import {
  fetchCourseDescription,
  fetchGEElective,
  fetchMajorElective,
} from "../Controller/Fetch";

//Icon
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
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

//Smart Edge
// import { SmartStepEdge, SmartBezierEdge } from "@tisoap/react-flow-smart-edge";

import TermNode from "./View/Node/TermNode";

import {
  termNode,
  // currData,
  edArr,
  processData,
  mockjSon,
  fetchData,
  startNode,
  // allTerm,
  // allyear,
  summerArr,
  showPre,
  totalSubColumn,
  isCoop_api,
  arrTogglePrereq,
  creditArr,
} from "../Model/TermData";
// console.log(termNode);

//Import Node and Edge

import CustomEdge from "./View/customEdge";
import Lab from "./View/Node/Lab";
import haveLab from "./View/Node/haveLab";
// import { rfNodes } from "../Model/ReactFlowNode";

//import Modal
import isSelected, {
  displayCoopPlan,
  displayDone,
  displayFree,
  displayNormalPlan,
  displayPre,
  // displayPre,
  displaySp,
} from "./View/MUIFilter";
import { displayGE } from "./View/MUIFilter";

import { DisplayNodeModal, MajorEModal, GEModal } from "./View/NodeModal";

//import Switch
import { IOSSwitch } from "./View/SwitchMUI";
import { NormalTerm, summerTerm } from "./View/TermBlock";
import { ifError } from "assert";

const edgeTypes = {
  "custom-edge": CustomEdge,
};

var testNode = termNode;

const nodeTypes = {
  term_node: TermNode,
  lab: Lab,
  havelab: haveLab,
};

//responsive
// let halfline = "184.77vh"; //132.47
// var defaultMargin = "";
// let defaultWidth = "100vw";

//Drawer
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

function convertWidth(w: number) {
  return "" + w + "vw";
}

function ToggleButt(isDisable: boolean) {
  if (isDisable) {
    return (
      <ToggleButton
        value="normal"
        disabled
        sx={{
          width: "50%",
          textTransform: "none",
          "&.Mui-selected , &.Mui-selected:hover": {
            bgcolor: "#EE6457",
            color: "white",
          },
        }}
      >
        Normal Plan
      </ToggleButton>
    );
  } else {
    return (
      <ToggleButton
        value="normal"
        sx={{
          width: "50%",
          textTransform: "none",
          "&.Mui-selected , &.Mui-selected:hover": {
            bgcolor: "#EE6457",
            color: "white",
          },
        }}
      >
        Normal Plan
      </ToggleButton>
    );
  }
}

function DisplayBackDrop(checked: boolean) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer,
        "&.MuiBackdrop-root": { bgcolor: "white" },
      }}
      open={checked}
    >
      <CircularProgress sx={{ color: "#EE6457" }} />
    </Backdrop>
  );
}

function TermView() {
  const router = useRouter();
  //url
  const [isCoop, setisCoop] = useState(isCoop_api);
  const [stdYear, setStdYear] = useState("2563");
  // filter
  const [filterGE, setFilterGE] = useState(false);
  const [filterSp, setFilterSp] = useState(false);
  const [filterFree, setFilterFree] = useState(false);
  const [checkedPre, setCheckedPre] = useState(true);
  const [checkedPreFilter, setCheckedPreFilter] = useState(false);
  const [checkedDone, setCheckedDone] = useState(false);

  const [formats, setFormats] = useState("normal");
  const [prevFormat, setPrevFormat] = useState<any>();
  const [disButton, setDisButton] = useState(false);

  const [save, setSave] = useState(false);

  // Node Clicked
  const [nodeClicked, setNodeClicked] = useState(false);
  const [majorENodeClicked, setMajorENodeClicked] = useState(false);
  const [GENodeClicked, setGENodeClicked] = useState(false);
  const [groupName, setGroupName] = useState("");

  const [nodeArr, setNodeArr] = useState([]);

  // Set Height and Width
  const [ttWidth, SetWidth] = useState("100vw");
  const [ttHeight, SetHeight] = useState("auto");

  const [columnNode, SetColumnNode] = useState(18);
  const [credits, setCredits] = useState<number[]>([]);

  // Handle Change for Swicth Plan Toggle
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDone(event.target.checked);
  };
  const handleChangePre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPreFilter(event.target.checked);
  };
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string
  ) => {
    setPrevFormat(newFormats);
    console.log("Previous Format " + newFormats);
    if (newFormats == null) newFormats = formats;
    setFormats(newFormats);
    // console.log(newFormats);
    // window.location.reload();
  };

  const [nodes, setNodes] = useNodesState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const [startSubj, setStartSubj] = useState<string[]>([]);
  const [term, setTerm] = useState(4);

  const [filter, setFilter] = React.useState(false);

  //
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [backdrop, SetBackdrop] = useState(true);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const url = usePathname();
  // const nevigate = useNavigate();

  async function FetchMajorENode() {
    let data: any = await fetchMajorElective();
    return data;
  }

  async function FetchGENode(gname: string) {
    let data: any = await fetchGEElective(gname);
    return data;
  }

  async function FetchCourse(courseId: string) {
    let data: any = await fetchCourseDescription(courseId);
    return data;
  }

  const onNodeClick = async (event: React.MouseEvent, node: any) => {
    if (checkedPre) {
      if (arrTogglePrereq.length !== 0) {
        let PreReqArr = arrTogglePrereq.map((arr: string[]) => {
          let tempSet: Set<string> = new Set(arr);
          let newArr: string[] = Array.from(tempSet);
          return newArr;
        });

        PreReqArr.map((arrPre: any) => {
          arrPre.map((val: any) => {
            if (val === node.id) {
              if (arrPre.includes(node.id)) {
                setEdges((eds) =>
                  eds.map((edge) => {
                    if (
                      arrPre.includes(edge.source) ||
                      arrPre.includes(edge.target)
                    ) {
                      // console.log(edge.source + " " + edge.hidden);
                      edge.hidden = !edge.hidden;
                    }
                    return edge;
                  })
                );
              }
            }
          });
        });
      }
    } else {
      console.log("just clicked node");
      if (
        node.data["sub_no"] === "Elective" ||
        node.data["sub_no"] === "Co-Creator" ||
        node.data["sub_no"] === "Learner Person"
      ) {
        setGENodeClicked(!GENodeClicked);
        var tempArr = FetchGENode(node.data["sub_no"]);
        setNodeArr(await tempArr);
        setGroupName(node.data["sub_no"]);
      } else if (node.data["sub_no"] === "Major Elective") {
        setMajorENodeClicked(!majorENodeClicked);
        var tempArr = FetchMajorENode();
        setNodeArr(await tempArr);
      } else if (node.data["category"] !== "free") {
        setNodeClicked(!nodeClicked);
        var tempArr = FetchCourse(node.data["sub_no"]);
        setNodeArr(await tempArr);
      }
    }
  };

  function fontChange(nav: string) {
    if (url === "/dashboard" && nav === "dashboard") return "#EE6457";
    else if (url === "/TermView" && nav === "term") return "#EE6457";
    else if (url === "/NuikitView" && nav === "nuikit") return "#EE6457";
    else return "#858382";
  }

  //print current screen
  function widthResizer() {
    var width = window.innerWidth;
    if (window.innerWidth <= 1300) setOpen(false);
    console.log(width);
  }

  function displayTerm() {
    let i = 0; //term
    var term: string[] = [];

    summerArr.map(() => {
      if (summerArr[i] === 2) {
        i++;
        term.push("summer");
        // width += 9.219 * 3; //9.219 * 3
      } else if (summerArr[i] === 0) {
        i = i + 2;
        term.push("normal");
        // width += 9.219 * 2;
      } else if (summerArr[i] === 1) {
        i++;
      }
    });

    let h = columnNode * 3.30704 + (1.7 + (columnNode - 1)) + 77;

    var compTerm: any[] = [];
    let j = 0;

    // console.log("term log");
    // console.log(term);

    term.forEach((i, index) => {
      // console.log(i + " " + j);
      if (i === "normal") {
        compTerm.push(
          NormalTerm(
            index + 1,
            "" + h + "vh",
            "" + (h - 7) + "vh",
            credits[j],
            credits[j + 1]
          )
        );
        j += 2;
        // console.log('normal ' + j + ' ' + (j+1))
      }
      //91.14784
      else {
        compTerm.push(
          summerTerm(
            index + 1,
            "" + h + "vh",
            "" + (h - 7) + "vh",
            credits[j],
            credits[j + 1],
            credits[j + 2]
          )
        );
        j += 3;
      }
      // console.log('summer ' + j + ' ' + (j+3))
    });

    var sp = 1.845;
    var sp_str = "" + sp + "vw";

    if (typeof window !== "undefined") {
      if (window.innerWidth > 600 && window.innerWidth < 900) {
        sp = 4.355;
        sp_str = "" + sp + "vw";
      }
    }
    

    return (
      <Stack>
        <Stack direction={"row"} spacing={sp_str}>
          {compTerm}
        </Stack>
      </Stack>
    );
  }

  async function waitData() {
    SetBackdrop(true);
    await processData(stdYear, "" + isCoop);
    SetBackdrop(false);
    setNodes(termNode);
    setEdges(edArr);
    setCredits(creditArr);
    setStartSubj(startNode);
    setTerm(fetchData["study term"]);
    setisCoop(isCoop_api);

    SetColumnNode(totalSubColumn);

    // console.log(columnNode)

    //
    let i = 0;
    let y = 0;
    var width = 0;

    // console.log(summerArr)
    summerArr.map(() => {
      if (summerArr[i] === 2) {
        i++;
        y++;
        width += 9.219 * 3; //9.219 * 3
      } else if (summerArr[i] === 0) {
        i = i + 2;
        width += 9.219 * 2;
        y++;
      } else if (summerArr[i] === 1) {
        i++;
      }
      return summerArr;
    });

    var plus_w = 0;

    if (window.innerWidth > 600 && window.innerWidth < 900) plus_w = 17 + 15;
    if (window.innerWidth > 900 && window.innerWidth < 1000) plus_w = 0 - 2;
    if (window.innerWidth > 1000 && window.innerWidth < 1400) plus_w = 2;

    width += (y - 1) * 1.875 + 20.623 + plus_w;

    console.log("total width" + width);

    SetWidth(convertWidth(width));
  }

  async function startProgram() {
    setNodes([]);
    setEdges([]);

    await waitData();

    console.log("wait data finish");
    console.log(isCoop);

    if (filterGE) {
      termNode.map((nd) => {
        if (nd.data.category === "gen") nd.hidden = false;
        else if (filterSp && nd.data.category === "sp") nd.hidden = false;
        else if (filterFree && nd.data.category === "free") nd.hidden = false;
        else nd.hidden = true;
        return nd;
      });
    } else if (filterSp) {
      termNode.map((nd) => {
        if (nd.data.category === "sp") nd.hidden = false;
        else if (filterFree && nd.data.category === "free") nd.hidden = false;
        else nd.hidden = true;
        return nd;
      });
    } else if (filterFree) {
      termNode.map((nd) => {
        if (nd.data.category === "free") nd.hidden = false;
        else nd.hidden = true;
        return nd;
      });
    }

    if (checkedDone) {
      termNode.map((nd) => {
        if (!nd.data.is_pass) nd.hidden = true;
        return nd;
        // else nd.hidden = true;
      });
    }

    if (!checkedPreFilter) {
      edArr.map((nd) => {
        // console.log(nd.source)
        if (showPre.has(nd.source)) nd.hidden = true;
        return nd;
      });
    }
  }

  //UseEffect
  useEffect(() => {
    startProgram();

    let c = isCoop;
    console.log("in useeffect")
    console.log(c)
    if (c === "true") {
      setDisButton(true);
      setFormats("coop");
    } 
    if (c === "false") {
      setDisButton(false);
      setFormats("normal");
    }

    // console.log("is ge filter clicked " + filterGE);
    console.log(window.innerWidth);
    if (window.innerWidth <= 1300) setOpen(false);
    // console.log("this is height");
    // console.log(window.innerHeight);
    // console.log(fetchData["study term"])
  }, [columnNode, isCoop]);

  useEffect(() => {
    window.addEventListener("resize", widthResizer);
  });

  useEffect(() => {}, [open, filter]);

  // displayYearContain();

  return (
    <Stack
      sx={{
        width: ttWidth, //142vw 9.219 131.407 129.532
        height: ttHeight, //dynamic 210.77vh
        flexDirection: "row",
        display: "flex",
        // paddingRight: "0.6vw",
        overflowX: "scroll",
        // bgcolor: 'bisque'
      }}
    >
      {/* Navbar */}
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

          {open === true ? (
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
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13.125L13.6364 18L26 5"
                    stroke="#EE6457"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="3"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13.125L13.6364 18L26 5"
                    stroke="#EE6457"
                    strokeWidth="3"
                    stroke-linecap="round"
                    strokeLinejoin="round"
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
            {open === true ? (
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
              // </ListItem>
            ) : null}

            {/* Category View */}
              <ListItem disablePadding sx={{ display: "block" }}
              onClick={() => {
                router.push("/NuikitView");
              }}>
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
                    {open === true ? (
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
                  {open === true ? (
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

      {/* Flow */}
      <Stack
        sx={{
          width: "100%",
          overflowX: "scroll",
          alignItems: "center",
        }}
      >
        {/* Display Backdrop */}
        {DisplayBackDrop(backdrop)}
        {/* Node Clicked */}
        {nodeClicked
          ? DisplayNodeModal(nodeClicked, setNodeClicked, nodeArr, termNode)
          : null}
        {majorENodeClicked
          ? MajorEModal(
              majorENodeClicked,
              setMajorENodeClicked,
              nodeArr,
              termNode
            )
          : null}
        {GENodeClicked
          ? GEModal(
              GENodeClicked,
              setGENodeClicked,
              nodeArr,
              termNode,
              groupName
            )
          : null}

        <Stack sx={{ width: "auto" }}>
          <Stack
            direction={"row"}
            sx={{
              mt: "2vh",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{ alignSelf: "baseline", mt: "auto", mb: "auto" }}
            >
              Term View
            </Typography>

            {/* Display Filter Status */}
            <Stack direction={"row"} sx={{ mr: "1vw", columnGap: 1.4 }}>
              <Stack direction={"row"} sx={{ columnGap: 1.4 }}>
                {/* {isCoop === false && displayNormalPlan()}
                {isCoop === true && displayCoopPlan()} */}
                {isCoop === "true" ? displayCoopPlan() : displayNormalPlan()}
                {checkedDone && displayDone()}
                {checkedPreFilter && displayPre()}
                {filterGE && displayGE()}
                {filterSp && displaySp()}
                {filterFree && displayFree()}
              </Stack>

              <Button
                sx={{
                  bgcolor: "white",
                  pt: 0.5,
                  pb: 0.5,
                  pr: 1.4,
                  pl: 1.4,
                  alignItems: "center",
                  borderRadius: 5,
                  border: checkedPre
                    ? "1px solid #EE6457"
                    : "1px solid #9B9B9B",
                  textTransform: "none",
                }}
                onClick={() => {
                  setCheckedPre(!checkedPre);
                  setEdges((eds) =>
                    eds.map((edge) => {
                      if (checkedPre) edge.hidden = false;
                      else edge.hidden = true;
                      return edge;
                    })
                  );
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: checkedPre ? "#EE6457" : "#9B9B9B",
                  }}
                >
                  See Prerequisite Course
                </Typography>
              </Button>

              {/* Filter */}
              <Button
                variant="outlined"
                endIcon={<FilterListIcon />}
                onClick={() => {
                  setFilter(!filter);
                  setSave(false);
                }}
                sx={{
                  width: "8vw",
                  position: "relative",
                  // mr: "1.9vw",
                  textTransform: "none",
                  borderRadius: 5,
                  color: filter ? "#EE6457" : "#9B9B9B",
                  borderColor: filter ? "#EE6457" : "#9B9B9B",
                  pt: 0.25,
                  pb: 0,
                  pr: 1.4,
                  pl: 1.4,
                  "&:hover": {
                    color: "#EE6457",
                    borderColor: "#EE6457",
                    bgcolor: "white",
                  },
                  [theme.breakpoints.between("sm", "md")]: {
                    width: "10vw",
                  },
                }}
              >
                Filter
              </Button>
            </Stack>
          </Stack>

          {filter && (
            <Stack
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.50)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <Stack
                sx={{
                  p: 2,
                  position: "fixed",
                  top: 60,
                  right: 26,
                  bgcolor: "white",
                  borderRadius: 2.6,
                  [theme.breakpoints.between("sm", "md")]: {
                    width: "48vw",
                  },
                  [theme.breakpoints.only("md")]: {
                    width: "50vw",
                  },
                }}
              >
                <Stack sx={{ ml: "1.2vw", mr: "1.2vw" }}>
                  {/* Head Section */}
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography sx={{ alignSelf: "center" }}>Filter</Typography>
                    <IconButton
                      onClick={() => {
                        setFilter(!filter);
                      }}
                      sx={{
                        width: "2vw",
                        height: "2vw",
                        marginLeft: "auto",
                        color: "black",
                      }}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
                  </Stack>
                  {/* Choose Study Plan */}
                  <ToggleButtonGroup
                    value={formats}
                    exclusive
                    onChange={handleFormat}
                    aria-label="text alignment"
                    sx={{ mt: "1vh", mb: "1vh", height: 36 }}
                  >
                    {ToggleButt(disButton)}
                    <ToggleButton
                      value="coop"
                      sx={{
                        width: "50%",
                        textTransform: "none",
                        "&.Mui-selected , &.Mui-selected:hover": {
                          bgcolor: "#EE6457",
                          color: "white",
                        },
                      }}
                    >
                      Cooperative Plan
                    </ToggleButton>
                  </ToggleButtonGroup>

                  {/* Category Section */}
                  <Stack>
                    <Typography>Category</Typography>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{ mt: "1vh", mb: "1vh" }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: isSelected(filterGE),
                          display: "flex",
                          padding: 0.8,
                          borderRadius: 5,
                          textTransform: "none",
                          width: "10vw",
                          [theme.breakpoints.between("sm", "md")]: {
                            width: "18vw",
                          },
                          [theme.breakpoints.only("md")]: {
                            width: "18vw",
                          },
                        }}
                        onClick={() => {
                          setFilterGE(!filterGE);
                        }}
                      >
                        <Stack
                          sx={{
                            height: "1em",
                            width: "1em",
                            bgcolor: "#7C4DFF",
                            borderRadius: "100%",
                            mr: "0.3em",
                          }}
                        ></Stack>
                        <Typography
                          sx={{
                            fontSize: "0.8em",
                            color: isSelected(filterGE),
                            [theme.breakpoints.between("sm", "md")]: {
                              fontSize: "0.71em",
                            },
                          }}
                        >
                          General Education
                        </Typography>
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: isSelected(filterSp),
                          display: "flex",
                          padding: 0.8,
                          borderRadius: 5,
                          textTransform: "none",
                          width: "10vw",
                          [theme.breakpoints.between("sm", "md")]: {
                            width: "15vw",
                          },
                          [theme.breakpoints.only("md")]: {
                            width: "16vw",
                          },
                        }}
                        onClick={() => {
                          setFilterSp(!filterSp);
                        }}
                      >
                        <Stack
                          sx={{
                            height: "1em",
                            width: "1em",
                            bgcolor: "#FF7D0F",
                            borderRadius: "100%",
                            mr: "0.3em",
                          }}
                        ></Stack>
                        <Typography
                          variant="button"
                          sx={{
                            fontSize: "0.8em",
                            textTransform: "none",
                            color: isSelected(filterSp),
                          }}
                        >
                          Specification
                        </Typography>
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: isSelected(filterFree),
                          display: "flex",
                          padding: 0.8,
                          borderRadius: 5,
                          textTransform: "none",
                          width: "10vw",
                          [theme.breakpoints.between("sm", "md")]: {
                            width: "15vw",
                          },
                          [theme.breakpoints.only("md")]: {
                            width: "16vw",
                          },
                        }}
                        onClick={() => {
                          setFilterFree(!filterFree);
                        }}
                      >
                        <Stack
                          sx={{
                            height: "1em",
                            width: "1em",
                            bgcolor: "#1976D2",
                            borderRadius: "100%",
                            mr: "0.3em",
                          }}
                        ></Stack>
                        <Typography
                          variant="button"
                          sx={{
                            fontSize: "0.8em",
                            textTransform: "none",
                            color: isSelected(filterFree),
                          }}
                        >
                          Free Elective
                        </Typography>
                      </Button>
                    </Stack>
                  </Stack>

                  {/* Option */}
                  <Stack>
                    <Typography>Option</Typography>
                    {/* Prerequisite */}
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Stack>
                        <Typography>Prerequisite</Typography>
                        <Typography>Show prerequisite of all course</Typography>
                      </Stack>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{}}
                            onChange={handleChangePre}
                            checked={checkedPreFilter}
                          />
                        }
                        label=""
                      />
                      {/* <SwitchMUI/> */}
                    </Stack>
                    {/* Done Course */}
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Stack>
                        <Typography>Done Course</Typography>
                        <Typography>Show all course that done</Typography>
                      </Stack>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{}}
                            onChange={handleChange}
                            checked={checkedDone}
                          />
                        }
                        label=""
                      />
                    </Stack>
                  </Stack>

                  {/* Bottom Section */}
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between", mt: 1.4 }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ color: "#000000", borderColor: "#000000" }}
                      onClick={() => {
                        setFilterGE(false);
                        setFilterSp(false);
                        setFilterFree(false);
                        setCheckedDone(false);
                        setFormats("normal");
                        setisCoop("false");
                      }}
                    >
                      <Typography sx={{ textTransform: "none" }}>
                        Clear all
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#EE6457" }}
                      onClick={() => {
                        // console.log("test JAAA testttt");

                        setNodes((nds) =>
                          nds.map((node) => {
                            // let value:any = Object.values(node.data);
                            let value: any = node.data;
                            if (filterGE && value.category === "gen") {
                              if (!value.is_pass && checkedDone === true) {
                                node.hidden = true;
                              } else {
                                node.hidden = false;
                              }
                            } else if (filterSp && value.category === "sp") {
                              if (!value.is_pass && checkedDone) {
                                node.hidden = true;
                              } else {
                                node.hidden = false;
                              }
                            } else if (
                              filterFree &&
                              value.category === "free"
                            ) {
                              if (!value.is_pass && checkedDone) {
                                node.hidden = true;
                              } else {
                                node.hidden = false;
                              }
                            } else if (!filterFree || !filterSp || !filterGE) {
                              node.hidden = true;
                            }

                            if (!filterFree && !filterSp && !filterGE) {
                              if (!value.is_pass && checkedDone) {
                                node.hidden = true;
                              } else {
                                node.hidden = false;
                              }
                            }

                            return node;
                          })
                        );

                        setNodes((nds) =>
                          nds.map((node) => {
                            let value = Object.values(node.data);
                            if (value.includes("line")) {
                              node.hidden = true;
                            }

                            return node;
                          })
                        );

                        if (!checkedPre) {
                          setEdges((eds) =>
                            eds.map((edge) => {
                              if (checkedPreFilter) edge.hidden = false;
                              else edge.hidden = true;
                              return edge;
                            })
                          );
                        }

                        if (prevFormat !== null) {
                          console.log("not first time");
                          console.log("prev " + prevFormat);
                          console.log("click " + formats);
                          if (
                            prevFormat === undefined &&
                            formats === "normal"
                          ) {
                            console.log("not reload page");
                          } else if (
                            prevFormat !== undefined &&
                            formats === "normal"
                          ) {
                            console.log("reload back to narmal plan page");
                            setisCoop("false");
                            // window.location.reload();
                          } else if (
                            prevFormat !== undefined &&
                            formats === "coop"
                          ) {
                            console.log("reload to coop plan page");
                            // setNodes([])
                            setisCoop("true");
                            // window.location.reload();
                            // check if other filter are checked save that setting
                          }
                        }

                        setFilter(!filter);
                        setSave(true);
                      }}
                    >
                      <Typography sx={{ textTransform: "none" }}>
                        Save
                      </Typography>
                    </Button>
                  </Stack>
                  {/*  */}
                </Stack>
              </Stack>
            </Stack>
          )}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            onNodeClick={onNodeClick}
            // fitView
            // style={{backgroundColor: 'darksalmon'}}
          >
            <Stack sx={{ paddingBottom: "4vh" }}>
              <Stack
                sx={{
                  marginTop: "1vh",
                  justifyContent: "center",
                }}
              >
                {displayTerm()}

                {/*  */}
              </Stack>
            </Stack>
          </ReactFlow>
        </Stack>
        {/* comment */}
        {/* End Flow */}
      </Stack>
    </Stack>
  );
}

export default TermView;
