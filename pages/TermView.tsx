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
  Avatar,
  Paper,
  InputBase,
  Alert,
  AlertTitle,
  useMediaQuery,
  Popover,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// import fetch
import {
  FetchIsFree,
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
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { red, green, blue, grey } from "@mui/material/colors";

//Smart Edge
// import { SmartStepEdge, SmartBezierEdge } from "@tisoap/react-flow-smart-edge";

import TermNode from "./View/Node/TermNode";

import {
  termNode,
  // currData,
  edArr,
  processData,
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

import {
  DisplayNodeModal,
  MajorEModal,
  GEModal,
  warningModal,
  warningIcon,
} from "./View/NodeModal";

//import Switch
import { IOSSwitch } from "./View/SwitchMUI";
import { NormalTerm, summerTerm } from "./View/TermBlock";
import { ifError } from "assert";
import { WhoAmIResponse } from "./api/whoAmI";
import axios, { AxiosError, AxiosResponse } from "axios";
import { free_pass, ge_pass, majorCore_pass } from "../constants/color";

import { useSearchParams } from "next/navigation";

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

function ToggleButtNormal(isDisableNormal: boolean) {
  if (isDisableNormal) {
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

function ToggleButtCoop(isDisableCoop: boolean) {
  if (isDisableCoop) {
    return (
      <ToggleButton
        value="coop"
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
        Cooperative Plan
      </ToggleButton>
    );
  } else {
    return (
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

  const [fullName, setFullName] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //url
  const [isCoop, setisCoop] = useState("false");
  const [stdYear, setStdYear] = useState("2563");
  // filter
  const [filterGE, setFilterGE] = useState(true);
  const [filterSp, setFilterSp] = useState(true);
  const [filterFree, setFilterFree] = useState(true);
  const [checkedPre, setCheckedPre] = useState(false);
  const [checkedPreFilter, setCheckedPreFilter] = useState(false);
  const [checkedDone, setCheckedDone] = useState(false);

  const [formats, setFormats] = useState("normal");
  const [prevFormat, setPrevFormat] = useState<any>();
  const [disButtonNormal, setdisButtonNormal] = useState(false);
  const [disButtonCoop, setdisButtonCoop] = useState(false);

  const [save, setSave] = useState(false);

  // Node Clicked
  const [nodeClicked, setNodeClicked] = useState(false);
  const [majorENodeClicked, setMajorENodeClicked] = useState(false);
  const [insideNodeClicked, setInsideNodeClicked] = useState(false);
  const [insideNode, setInsideNode] = useState("");
  const [GENodeClicked, setGENodeClicked] = useState(false);
  const [groupName, setGroupName] = useState("");

  const [nodeArr, setNodeArr] = useState([]);
  const [insideNodeArr, setInsideNodeArr] = useState([]);

  // Set Height and Width
  const [ttWidth, SetWidth] = useState("100vw");
  const [ttHeight, SetHeight] = useState("auto");

  const [columnNode, SetColumnNode] = useState(18);
  const [credits, setCredits] = useState<number[]>([]);

  const [text, setText] = useState("");
  const [tmpText, setTmpText] = useState("");
  const [freeClicked, setFreeClicked] = useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [errInp, setErrInp] = useState<boolean>(false);
  const [errInpMessage, setErrInpMessage] = useState<string>("");
  const [searchBtn, setSearchBtn] = useState<boolean>(false);

  const [freePassClick, setFreePassClick] = useState<boolean>(false);
  const [freeCreditArr, setFreeCreditArr] = useState<number[]>([]);
  const [freeCID, setFreeCID] = useState("");
  const [dfValue, setDFValue] = useState(3);

  const [free, setFree] = useState<any[]>([]);

  const [warning, setWarning] = useState(true);

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

  const [screen, setScreen] = useState(1440);

  //popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorElQ, setAnchorElQ] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handlePopoverOpenQ = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElQ(event.currentTarget);
  };
  const handlePopoverCloseQ = () => {
    setAnchorElQ(null);
  };

  const openPopover = Boolean(anchorEl);
  const openPopoverQ = Boolean(anchorElQ);

  

  const bp = useMediaQuery(theme.breakpoints.down("lg"));

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
    console.log("check pre " + checkedPre);
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
      var tempFreeArr: any[] = [];
      if (node.data["category"] === "free" && node.data["sub_no"] !== "Free") {
        // console.log('click')

        termNode.map((n: any) => {
          if (n.data["category"] === "free")
            tempFreeArr.push(n.data["sub_data"]);
        });

        freeCreditArr.map((n: any) => {
          // console.log(n)
          if (n.courseId === node.data["sub_no"]) setDFValue(n.credit);
        });

        setFreePassClick(true);
        setFreeCID(node.data["sub_no"]);
      }

      setFree(tempFreeArr);
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

      if (node.data["sub_no"] === "Free") {
        setFreeClicked(!freeClicked);
      }
    }
  };

  async function getInSideNodeDetail(insideNode: string) {
    console.log("inside node " + insideNode);
    setInsideNodeArr(await FetchCourse(insideNode));
  }

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
    setScreen(width);
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

    console.log("term log");
    console.log(term);

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
        console.log("normal " + j + " " + (j + 1));
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
    var sp_str: string = "1.845vw";

    if (typeof window !== "undefined") {
      if (window.innerWidth > 600 && window.innerWidth < 900) {
        sp = 4.355;
        sp_str = "4.35vw";
      }
    }

    console.log(sp_str);
    return (
      <Stack>
        <Stack direction={"row"} spacing={sp_str}>
          {compTerm}
        </Stack>
      </Stack>
    );
  }

  async function waitData() {
    await axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          setFullName(response.data.firstName + " " + response.data.lastName);
          setF_name(response.data.firstName);
          setL_name(response.data.lastName);
          // setCmuAccount(response.data.cmuAccount);
          setStudentId(response.data.studentId ?? "No Student Id");
        }
      })
      .catch((error: AxiosError<WhoAmIResponse>) => {
        if (!error.response) {
          setErrorMessage(
            "Cannot connect to the network. Please try again later."
          );
        } else if (error.response.status === 401) {
          setErrorMessage("Authentication failed");
        } else if (error.response.data.ok === false) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Unknown error occurred. Please try again later");
        }
      });
    SetBackdrop(true);
    if (studentId !== undefined || studentId !== "" || studentId !== null) {
      var tempYear = "25" + studentId.substring(0, 2);
      setStdYear(tempYear);
      var tempStdId = studentId;
      console.log(stdYear);
      console.log(tempStdId);
      if (typeof tempStdId !== "undefined") {
        await processData(stdYear, "" + isCoop, studentId);
      }
    }

    SetBackdrop(false);
    setNodes(termNode);

    // edArr.map((e:any)=>{
    //   e["hidden"] = false
    // })

    setEdges(edArr);

    setCredits(creditArr);
    setStartSubj(startNode);
    setTerm(fetchData["study term"]);
    setisCoop(isCoop_api);
    setDFValue(3);

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

    if (window.innerWidth > 600 && window.innerWidth < 900) plus_w = 17 + 58;
    if (window.innerWidth > 900 && window.innerWidth < 1000) plus_w = 0 - 2;
    if (window.innerWidth > 1200 && window.innerWidth < 1300) plus_w = 0 - 11;
    if (window.innerWidth > 1300 && window.innerWidth < 1400) plus_w = 0 - 2; //2
    if (window.innerWidth === 1440) plus_w = 0;
    if (window.innerWidth > 2000) {
      plus_w = 0 - 6;
    }
    // if (window.innerWidth === 1024) {
    //   plus_w = 10;
    // }
    // if (window.innerWidth > 1000 && window.innerWidth < 1300) plus_w = 0-3;

    width += (y - 1) * 1.875 + 20.623 + plus_w;

    console.log("total width" + width);

    // width = 140

    SetWidth(convertWidth(width));
  }

  async function startProgram() {
    setNodes([]);
    setEdges([]);
    setDFValue(3);

    await waitData();

    if (filterGE) {
      termNode.map((nd) => {
        if (nd.data.category === "gen") nd.hidden = false;
        else if (filterSp && nd.data.category.includes("sp")) nd.hidden = false;
        else if (filterFree && nd.data.category === "free") nd.hidden = false;
        else nd.hidden = true;
        return nd;
      });
    } else if (filterSp) {
      termNode.map((nd) => {
        if (nd.data.category.includes("sp")) nd.hidden = false;
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

    if (checkedPreFilter) {
      edArr.map((nd) => {
        // console.log(nd.source)
        if (showPre.has(nd.source)) nd.hidden = false;
        return nd;
      });
    }
  }

  //UseEffect
  useEffect(() => {
    startProgram();

    let c = isCoop;
    console.log("c " + c);

    if (c === "true") {
      if (prevFormat === "coop") {
        setdisButtonNormal(false);
      } else {
        setdisButtonNormal(true);
      }

      setFormats("coop");
    }
    if (c === "false") {
      console.log("in fault");
      setdisButtonNormal(false);
      if (
        fetchData["study term"] !== undefined &&
        typeof fetchData["study term"] !== "undefined"
      ) {
        var tempArr: any[] = fetchData["study term"];
        console.log(fetchData["study term"]);
        if (fetchData["study term"].length >= 4) {
          setdisButtonCoop(true);
        } else {
          // console.log("kkkk");
          setdisButtonCoop(false);
        }
      }
      setFormats("normal");
    }

    // console.log("is ge filter clicked " + filterGE);
    console.log(window.innerWidth);
    if (window.innerWidth <= 1300) setOpen(false);
    // console.log("this is height");
    // console.log(window.innerHeight);
    // console.log(fullName)
  }, [columnNode, isCoop]);

  useEffect(() => {
    window.addEventListener("resize", widthResizer);
  });

  useEffect(() => {
    if (insideNodeClicked) {
      getInSideNodeDetail(insideNode);
    }
  }, [open, filter, f_name, insideNodeClicked, fetchData]);

  function signOut() {
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

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
      {errorMessage !== "" && (
        <Stack
          sx={{
            zIndex: 1,
            position: "fixed",
            height: "100%",
            width: "100%",
            bgcolor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "red", mb: 4 }}>
            {errorMessage}
          </Typography>
          {/* <Typography variant="subtitle1" sx={{color: 'grey', mb: 3}}>Please Log in before use website</Typography> */}
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              bgcolor: "white",
              color: "#F1485B",
              borderColor: "#F1485B",
              "&:hover": {
                background: "#F1485B",
                color: "white",
                borderColor: "#F1485B",
              },
            }}
            onClick={() => {
              axios.post("/").finally(() => {
                router.push("/");
              });
            }}
          >
            Go back to Login page
          </Button>
        </Stack>
      )}
      {/* Navbar */}
      {errorMessage === "" && (
        <Stack sx={{ bgcolor: "#FDF5F4" }}>
          <Drawer
            variant="permanent"
            PaperProps={{ sx: { bgcolor: "#FDF5F4" } }}
            open={open}
          >
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
                  Nuaikit Tracking
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
                    <SpaceDashboardIcon
                      sx={{ color: fontChange("dashboard") }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: fontChange("dashboard"),
                    }}
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
                    sx={{ opacity: open ? 1 : 0, color: "gray" }}
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
                    bgcolor: "#EE6457",
                    width: "96%",
                    ml: 0,
                    mr: 1,
                    borderRadius: "0 0.6rem 0.6rem 0",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 0 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {open === true ? (
                      <AccountTreeIcon sx={{ opacity: 1, color: "white" }} />
                    ) : (
                      <AccountTreeIcon sx={{ color: "white" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Term View"}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "white",
                      ml: open ? 3 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            {/* Avatar */}
            <Stack sx={{ mt: "auto", mb: 6 }}>
              {!open ? (
                <Stack sx={{}}>
                  {/* Avatar */}
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      mb: 2,
                      ml: "auto",
                      mr: "auto",
                    }}
                  >
                    {/* {f_name === undefined ? null : f_name[0]}
                    {l_name === undefined ? null : l_name[0]} */}
                    M
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
                        {/* {studentId === undefined ? null : studentId} */}
                        Mock Data 13
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
                      {/* {f_name === undefined ? null : f_name[0]}
                      {l_name === undefined ? null : l_name[0]} */}
                      M
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
      )}

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

        {warning && warningModal(setWarning)}

        {freeClicked && (
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
                position: "fixed",
                bgcolor: "white",
                width: "50%",
                height: "30%",
                top: "32vh",
                left: "28vw",
                zIndex: "1",
                // borderRadius: "1rem",
                borderRadius: "1rem 1rem 1rem 1rem",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  bgcolor: "#F1485B",
                  pt: 1,
                  pb: 1,
                  borderRadius: "1rem 1rem 0 0",
                }}
              >
                <Typography
                  sx={{ color: "white", ml: "44%", mt: "auto", mb: "auto" }}
                >
                  Free Elective
                </Typography>
                <IconButton
                  onClick={() => {
                    setFreeClicked(false);
                    setText("");
                    setIsFree(false);
                    setErrInp(false);
                    setSearchBtn(false);
                  }}
                  sx={{
                    width: "2.222vw",
                    height: "2.222vw",
                    marginLeft: "auto",
                    marginRight: "2vw",
                    color: "white",
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>

              <Stack
                sx={{
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                <Paper
                  component="form"
                  sx={{
                    p: 1,
                    display: "flex",
                    width: "90%",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="check if this course is free elective or not"
                    inputProps={{ "aria-label": "checkFree" }}
                    value={text}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setText(event.target.value);
                    }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: 1 }}
                    aria-label="search"
                    onClick={async () => {
                      // console.log(text)
                      if (text !== "" || text !== null) {
                        var regex = /^[a-zA-Z]+$/;
                        if (
                          text.match(regex) ||
                          text.length > 6 ||
                          text.length < 6
                        ) {
                          setErrInp(true);
                          // setIsFree(false)
                          setSearchBtn(true);
                        } else {
                          var resp: any = await FetchIsFree(text);
                          if (resp !== null) {
                            console.log(resp);
                            const group = resp["group"];

                            if (group === "Free") setIsFree(true);
                            else setIsFree(false);

                            setSearchBtn(true);
                            setTmpText(text);
                            console.log("test free click " + text);
                          }
                          setErrInp(false);
                        }

                        // console.log(resp);
                      }
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Stack sx={{ mt: 2 }}>
                  {isFree && searchBtn && (
                    <Typography variant="h6">
                      {tmpText} is Free Elective
                    </Typography>
                  )}
                  {searchBtn && !isFree && !errInp && (
                    <Typography variant="h6">
                      {tmpText} is not Free Elective
                    </Typography>
                  )}
                  {errInp && searchBtn && (
                    <Typography variant="subtitle1">
                      โปรดกรอกรหัสวิชาที่ถูกต้อง โดยรหัสวิชามีรูปแบบเป็นเลข 6
                      ตัว
                    </Typography>
                  )}
                </Stack>
                <Stack sx={{ mt: 1 }}>
                  {isFree && searchBtn && (
                    <CheckCircleIcon sx={{ fontSize: 44, color: green[500] }} />
                  )}
                  {searchBtn && !isFree && !errInp && (
                    <CancelIcon sx={{ fontSize: 44, color: red[500] }} />
                  )}
                  {errInp && searchBtn && (
                    <CancelIcon sx={{ fontSize: 44, color: red[500] }} />
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}

        {freePassClick && (
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
                // position: "fixed",
                bgcolor: "white",
                width: "50%",
                top: "50%",
                left: "50%",
                // height: "30%",
                // top: "32vh",
                // left: "28vw",
                zIndex: 2,
                // borderRadius: "1rem",
                borderRadius: "1rem 1rem 1rem 1rem",
                m: "auto",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  bgcolor: "#F1485B",
                  pt: 1,
                  pb: 1,
                  borderRadius: "1rem 1rem 0 0",
                }}
              >
                <IconButton
                  disabled
                  sx={{
                    width: "2.222vw",
                    height: "2.222vw",
                    marginRight: "auto",
                    marginLeft: "2vw",
                    color: "white",
                    cursor: "none",
                    opacity: 0,
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
                <Typography sx={{ color: "white", m: "auto" }}>
                  Free Elective Credits Config
                </Typography>

                <IconButton
                  onClick={() => {
                    setFreePassClick(false);
                  }}
                  sx={{
                    width: "2.222vw",
                    height: "2.222vw",
                    marginLeft: "auto",
                    marginRight: "2vw",
                    color: "white",
                    // position: 'absolute',
                    // top: '43.2%',
                    // right: '24.7%'
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
              <Stack
                sx={{
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0 0 1rem 1rem",
                  justifyContent: "center",
                }}
              >
                <Alert
                  severity="info"
                  sx={{ borderRadius: "0.8rem", width: "90%", mt: 1 }}
                >
                  เนื่องจากข้อมูลของหน่วยกิต หรือ credits
                  ในเว็บไซต์นี้อาจมีความไม่ถูกต้อง
                  หากท่านรู้หน่วยกิตที่แท้จริงของวิชานี้
                  โปรดกรอกจำนวนของหน่วยกิต แล้วกดยืนยัน
                  ทางระบบจะทำการคำนวณหน่วยกิตรวมทั้งหมดให้ใหม่
                </Alert>
                {/* <Stack direction={"row"}> */}
                <Paper
                  component="form"
                  sx={{
                    p: 1,
                    display: "flex",
                    width: "90%",
                    justifyContent: "center",
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    placeholder="3"
                    inputProps={{ "aria-label": "checkFree" }}
                    defaultValue={dfValue} //
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setText(event.target.value);
                    }}
                  />
                  <Button
                    type="button"
                    sx={{
                      p: 1,
                      bgcolor: blue[500],
                      height: "100%",
                      "&:hover": {
                        bgcolor: green[500],
                        color: "white",
                      },
                    }}
                    aria-label="confirm"
                    onClick={async () => {
                      var tempArr: any = [];
                      free.map((n: any) => {
                        tempArr.push({
                          courseId: n.courseNo,
                          credit: n.credits,
                        });
                      });

                      tempArr.map((n: any, index: number) => {
                        if (n.courseId === freeCID) {
                          console.log(text);
                          n.credit = +text;
                          free[index]["credits"] = +text;
                          setDFValue(+text);
                        }
                      });
                      var tmpCredit = 0;
                      tempArr.map((n: any) => {
                        tmpCredit += n.credit;
                      });
                      setFreeCreditArr(tempArr);

                      // console.log(tempArr);

                      // console.log(credits)
                      // console.log(fet)
                      fetchData["template"].map(
                        (row: string[], index: number) => {
                          row.map((n: any) => {
                            if (freeCID === n) {
                              console.log(index);
                              console.log(credits[index]);
                              if (Number(text) < dfValue) {
                                credits[index] -= dfValue - Number(text);
                              } else if (Number(text) > dfValue) {
                                credits[index] += Number(text) - dfValue;
                              }
                            }
                          });
                        }
                      );
                    }}
                  >
                    <CheckIcon />
                  </Button>
                </Paper>
                {/* </Stack> */}
              </Stack>
            </Stack>
          </Stack>
        )}

        {/* Node Clicked */}

        {nodeClicked
          ? DisplayNodeModal(
              nodeClicked,
              setNodeClicked,
              nodeArr,
              termNode,
              true,
              "term"
            )
          : null}

        {insideNodeClicked
          ? DisplayNodeModal(
              insideNodeClicked,
              setInsideNodeClicked,
              insideNodeArr,
              termNode,
              false,
              "term"
            )
          : null}

        {majorENodeClicked && !insideNodeClicked
          ? MajorEModal(
              majorENodeClicked,
              setMajorENodeClicked,
              setInsideNodeClicked,
              setInsideNode,
              nodeArr,
              termNode
            )
          : null}
        {GENodeClicked && !insideNodeClicked
          ? GEModal(
              GENodeClicked,
              setGENodeClicked,
              setInsideNodeClicked,
              setInsideNode,
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

              // maxWidth: "98%",
              // border: '1px solid black'
            }}
          >
            <Stack sx={{ alignContent: "start" }}>
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <Typography variant="h5">Term View</Typography>
                <Stack>{warningIcon(setWarning)}</Stack>
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                columnGap: 1.4,
              }}
            >
              {/* Display Filter Status */}
              <Stack
                direction={"row"}
                sx={{
                  columnGap: 1.4,
                  alignItems: "center",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    columnGap: 1.4,
                    rowGap: 1,
                    width: "40vw",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    [theme.breakpoints.between("sm", "md")]: {
                      width: "56vw",
                    },
                  }}
                >
                  {/* {isCoop === false && displayNormalPlan()}
                {isCoop === true && displayCoopPlan()} */}
                  {isCoop === "true" ? displayCoopPlan() : displayNormalPlan()}
                  {checkedDone && displayDone()}
                  {checkedPreFilter && displayPre()}
                  {filterGE && displayGE(screen)}
                  {filterSp && displaySp()}
                  {filterFree && displayFree(screen)}
                </Stack>

                {/* <Stack direction={"row"} sx={{columnGap: 1.4, justifyContent: 'flex-end'}}> */}
              </Stack>

              <Stack
                direction={"row"}
                sx={{ alignContent: "start", columnGap: 1.4 }}
              >
                <Stack>
                  <Button
                    aria-owns={openPopover ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    sx={{
                      bgcolor: "white",
                      boxShadow: 1,
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
                      maxHeight: "4.2vh",
                      maxWidth: "20vw",
                      [theme.breakpoints.down("lg")]: {
                        maxHeight: "3.4vh",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        maxHeight: "4vh",
                      },
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

                        [theme.breakpoints.only("md")]: {
                          fontSize: "0.68rem",
                          wordBreak: "break-word",
                        },
                      }}
                    >
                      {typeof window !== "undefined" && window.innerWidth < 750
                        ? "Select PreReq"
                        : "Select Prerequisite Course"}
                    </Typography>
                  </Button>
                  {/* Popover */}
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Paper sx={{ backgroundColor: grey[200], p: 1 }}>
                      <Typography sx={{ fontSize: "0.6rem" }}>
                        หากกดปุ่มนี้เส้นแสดงตัวต่อทั้งหมดจะหายไป<br></br>
                        และคุณจะสามารถกดเช็คดูได้ว่าวิชาไหนมีตัวต่อ<br></br>
                        แต่หากกดปิดปุ่มนี้เส้นแสดงตัวต่อทั้งหมดจะแสดง<br></br>
                        และท่านจะสามารถกดที่กล่องวิชา เพื่อเช็คราย<br></br>
                        ละเอียดของแต่ละวิชาได้
                      </Typography>
                    </Paper>
                  </Popover>
                </Stack>

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
                    boxShadow: 1,
                    maxHeight: "4vh",
                    position: "relatice",
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
                    [theme.breakpoints.down("lg")]: {
                      fontSize: "0.86rem",
                      maxHeight: "3.4vh",
                    },
                    [theme.breakpoints.only("md")]: {
                      fontSize: "0.68rem",
                    },
                    [theme.breakpoints.between("sm", "md")]: {
                      fontSize: "0.7rem",
                      width: "10vw",
                      maxHeight: "4vh",
                    },
                  }}
                >
                  Filter
                </Button>
              </Stack>
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
                    <Typography
                      sx={{
                        alignSelf: "center",
                      }}
                    >
                      Filter
                    </Typography>
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
                    {ToggleButtNormal(disButtonNormal)}
                    {ToggleButtCoop(disButtonCoop)}
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
                            bgcolor: ge_pass,
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
                            bgcolor: majorCore_pass,
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
                            bgcolor: free_pass,
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
                        <Stack
                          direction={"row"}
                          spacing={1}
                          sx={{ alignItems: "center" }}
                        >
                          <Typography>Prerequisite</Typography>
                          <Stack>
                            <Stack
                              aria-owns={
                                openPopoverQ ? "mouse-over-popover-q" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpenQ}
                              onMouseLeave={handlePopoverCloseQ}
                            >
                              <HelpOutlineIcon
                                fontSize="small"
                                sx={{ color: blue[500] }}
                              />
                            </Stack>

                            <Popover
                              id="mouse-over-popover-q"
                              sx={{
                                pointerEvents: "none",
                              }}
                              open={openPopoverQ}
                              anchorEl={anchorElQ}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              onClose={handlePopoverCloseQ}
                              disableRestoreFocus
                            >
                              <Paper sx={{ backgroundColor: grey[200], p: 1 }}>
                                <Typography sx={{ fontSize: "0.6rem" }}>
                                  Filter ตัวนี้จะทำการเปิด และปิดเส้นแสดงตัวต่อทั้งหมด<br></br>หากปุ่ม see prerequisite course มีสถานะ<br></br>เปิดใช้งานอยู่การทำงานของ Filter ตัวนี้จะไม่เห็นผล
                                </Typography>
                              </Paper>
                            </Popover>
                          </Stack>
                        </Stack>

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
                        setFilterGE(true);
                        setFilterSp(true);
                        setFilterFree(true);
                        setCheckedDone(false);
                        setCheckedPreFilter(false);
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
                            if (!filterGE && value.category === "gen") {
                              node.hidden = true;
                            } else if (
                              !filterSp &&
                              value.category.includes("sp")
                            ) {
                              node.hidden = true;
                            } else if (
                              !filterFree &&
                              value.category === "free"
                            ) {
                              node.hidden = true;
                            }
                            // else if (filterFree || filterSp || filterGE) {
                            //   node.hidden = false;
                            // }

                            if (filterFree && filterSp && filterGE) {
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
                          // console.log("not first time");
                          // console.log("prev " + prevFormat);
                          // console.log("click " + formats);
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
