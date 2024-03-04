import {
  Box,
  Stack,
  Typography,
  Breakpoint,
  Backdrop,
  IconButton,
  TextField,
  Paper,
  InputBase,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

import { amber, yellow } from "@mui/material/colors";

// import { fetchMajorElective } from "../Controller/Fetch";

import { theme } from "../../constants/theme";
import { fetchCourseDescription, FetchIsFree } from "../../Controller/Fetch";
import exp from "constants";

export function DisplayNodeModal(
  isClicked: boolean,
  setClicked: Function,
  NodeArr: any,
  TermArr: any[],
  isInsideNode: boolean
) {
  // var courseData = Object.values(NodeArr);
  var courseDetail = NodeArr["courseDetails"];
  var pre = "-";
  var enForceEN = "";
  var enForceTH = "";

  console.log("click");

  if (courseDetail !== undefined) {
    TermArr.map((n: any) => {
      if (n.id === courseDetail[0]["courseNo"]) {
        // console.log(n)
        if (n.data.sub_data["prerequisites"].length !== 0) {
          if (n.data.sub_data["prerequisites"].length === 1)
            pre = n.data.sub_data["prerequisites"][0];
          else if (n.data.sub_data["prerequisites"].length === 2)
            pre =
              n.data.sub_data["prerequisites"][0] +
              " or " +
              n.data.sub_data["prerequisites"][1];
        }
      }
    });

    if (courseDetail[0]["updatedSemester"] === 1) {
      enForceEN =
        "1st Semester Academic Year " +
        (Number(courseDetail[0]["updatedYear"]) - 543);
      enForceTH =
        "ภาคการศึกษาที่ 1 ปีการศึกษา " + courseDetail[0]["updatedYear"];
    } else if (courseDetail[0]["updatedSemester"] === 2) {
      enForceEN =
        "2nd Semester Academic Year " +
        (Number(courseDetail[0]["updatedYear"]) - 543);
      enForceTH =
        "ภาคการศึกษาที่ 2 ปีการศึกษา " + courseDetail[0]["updatedYear"];
    }
  }

  // console.log(courseDetail)
  if (isClicked) {
    // console.log("in node modal");
    // console.log(TermArr);
    return (
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
            height: "70%",
            top: "16vh",
            left: "28vw",
            zIndex: "1",
            borderRadius: "1rem",
            opacity: isInsideNode ? 2 : 1,
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
            <Typography sx={{ color: "white", ml: "auto", mr: "auto" }}>
              Description
            </Typography>
            <IconButton
              onClick={() => {
                setClicked(false);
              }}
              sx={{
                width: "2.222vw",
                height: "2.222vw",
                marginLeft: "46vw",
                // marginRight: "2vw",
                color: "white",
                position: "absolute",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          {/* Content */}
          <Stack
            sx={{
              width: "86%",
              height: "82%",
              ml: "auto",
              mr: "auto",
              overflowY: "scroll",
              mt: "auto",
              mb: "auto",
              rowGap: 1,
            }}
          >
            {/* Name */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>Name : </Typography>
              <Typography>
                {courseDetail !== undefined && courseDetail[0]["courseNameEN"]}
              </Typography>
            </Stack>
            {/* ชื่อ */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>ชื่อ : </Typography>
              <Typography>
                {courseDetail !== undefined && courseDetail[0]["courseNameTH"]}
              </Typography>
            </Stack>
            {/* CourseId */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>Course ID / รหัสกระบวนวิชา : </Typography>
              <Typography>
                {courseDetail !== undefined && courseDetail[0]["courseNo"]}
              </Typography>
            </Stack>
            {/* Credit */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>Credit / หน่วยกิต : </Typography>
              <Typography>
                {courseDetail !== undefined &&
                  courseDetail[0]["credits"]["credits"]}
              </Typography>
            </Stack>
            {/* Prerequisite */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>
                Prerequisite / เงื่อนไขที่ต้องผ่านก่อนเรียน :{" "}
              </Typography>
              <Typography>{courseDetail !== undefined && pre}</Typography>
            </Stack>
            {/* Enforce since */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>Enforce since : </Typography>
              <Typography>{courseDetail !== undefined && enForceEN}</Typography>
            </Stack>
            {/* มีผลบังคับใช้ */}
            <Stack direction={"row"} spacing={2} sx={{}}>
              <Typography>มีผลบังคับใช้ : </Typography>
              <Typography>{courseDetail !== undefined && enForceTH}</Typography>
            </Stack>
            {/* Description */}
            <Stack sx={{}}>
              <Typography>Description : </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {courseDetail !== undefined && courseDetail[0]["detailEN"]}
              </Typography>
            </Stack>
            {/* คำอธิบายลักษณะกระบวนวิชา */}
            <Stack sx={{}}>
              <Typography>คำอธิบายลักษณะกระบวนวิชา : </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {courseDetail !== undefined && courseDetail[0]["detailTH"]}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return null;
  }
}

function checkisPass(isPass: boolean, color: string) {
  if (isPass) {
    return (
      <Stack
        sx={{
          border: "1px solid #34C759",
          borderRadius: "100%",
          height: "0.9rem",
          width: "0.9rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#34C759",
          [theme.breakpoints.between("sm", "md")]: {
            height: "0.68em",
            width: "0.68em",
          },
          [theme.breakpoints.only("md")]: {
            height: "0.7em",
            width: "0.7em",
          },
          [theme.breakpoints.between(1200, 1439)]: {
            height: "0.78em",
            width: "0.78em",
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 12 10"
          fill="none"
        >
          <path
            d="M11 0.830078L4.125 8.69448L1 5.11975"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Stack>
    );
  } else {
    return (
      <Stack
        sx={{
          height: "0.9rem",
          width: "0.9rem",
          border: "1px solid" + color,
          borderRadius: "100%",
          [theme.breakpoints.between("sm", "md")]: {
            height: "0.68em",
            width: "0.68em",
          },
          [theme.breakpoints.only("md")]: {
            height: "0.7em",
            width: "0.7em",
          },
          [theme.breakpoints.between(1200, 1439)]: {
            height: "0.78em",
            width: "0.78em",
          },
        }}
      ></Stack>
    );
  }
}

export function MajorEModal(
  isClicked: boolean,
  setClicked: Function,
  setInsideNodeClicked: Function,
  setInsideNode: Function,
  NodeArr: any,
  TermNode: any[]
) {
  function isCloseClicked() {
    return true;
  }
  if (isClicked) {
    var mjNode = NodeArr["courseLists"];

    return (
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
            height: "70%",
            top: "16vh",
            left: "28vw",
            zIndex: "1",
            borderRadius: "1rem",
          }}
        >
          {/* Head Section */}
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
              Major Elective
            </Typography>
            <IconButton
              onClick={() => {
                setClicked(false);
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
          {/* Content Section */}
          <Stack
            sx={{
              // border: "1px solid black",
              height: "82%",
              mt: "auto",
              mb: "auto",
              mr: 4,
              ml: 4,
              overflowY: "scroll",
              justifyItems: "center",
              // alignContent: "center",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                rowGap: 2,
                columnGap: 2.2,
                flexWrap: "wrap",
                justifySelf: "center",
                // border: '1px solid red',
                width: "auto",
                [theme.breakpoints.between("sm", "md")]: {
                  columnGap: 2.6,
                },
                [theme.breakpoints.only("md")]: {
                  columnGap: 3,
                },
              }}
            >
              {mjNode !== undefined &&
                mjNode.map((node: any) => {
                  var isPass = false;
                  TermNode.map((tn: any) => {
                    if (tn.id === node.courseNo) {
                      console.log(tn.data.is_pass);
                      isPass = true;
                    }
                  });
                  // console.log(TermNode)
                  return (
                    <Stack
                      onClick={() => {
                        setInsideNode(node.courseNo);
                        setInsideNodeClicked(true);
                      }}
                      sx={{
                        m: 0,
                        width: "6.466vw",
                        height: "5.3704vh",
                        padding: "1vh 0",
                        border: "1.5px solid #FF7D0F",
                        borderRadius: "0.5rem",
                        [theme.breakpoints.between("sm", "md")]: {
                          height: "36px",
                          width: "9.466vw",
                          bgcolor: "lavender",
                        },
                        [theme.breakpoints.only("md")]: {
                          height: "40px", //44-16
                          width: "6.966vw", //+0.32
                          bgcolor: "pink",
                        },
                      }}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Stack
                          sx={{
                            width: "50%",
                          }}
                        >
                          <Typography
                            sx={{
                              [theme.breakpoints.between("sm", "md")]: {
                                fontSize: "0.78em",
                              },
                              [theme.breakpoints.only("md")]: {
                                fontSize: "0.8em",
                              },
                              [theme.breakpoints.between(1200, 1439)]: {
                                fontSize: "0.88em",
                              },
                              fontSize: "0.9rem",
                            }}
                          >
                            {node.courseNo}
                          </Typography>
                        </Stack>
                        {/* Checkbox */}
                        {checkisPass(isPass, "#FF7D0F")}
                      </Stack>
                    </Stack>
                  );
                })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return null;
  }
}

export function GEModal(
  isClicked: boolean,
  setClicked: Function,
  setInsideNodeClicked: Function,
  setInsideNode: Function,
  NodeArr: any,
  TermNode: any[],
  groupName: string
) {
  if (isClicked) {
    var GENode = NodeArr["courseLists"];
    console.log(GENode);

    return (
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
            height: "70%",
            top: "16vh",
            left: "28vw",
            zIndex: "1",
            borderRadius: "1rem",
          }}
        >
          {/* Head Section */}
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
              {groupName}
            </Typography>
            <IconButton
              onClick={() => {
                setClicked(false);
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
          {/* Content Section */}
          <Stack
            sx={{
              // border: "1px solid black",
              height: "82%",
              mt: "auto",
              mb: "auto",
              mr: 4,
              ml: 4,

              overflowY: "scroll",
              justifyItems: "center",
              // alignContent: "center",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                rowGap: 2,
                columnGap: 2.2,
                flexWrap: "wrap",
                justifySelf: "center",
                // border: '1px solid red',
                width: "fit-content",
                [theme.breakpoints.between("sm", "md")]: {
                  columnGap: 2.6,
                },
                [theme.breakpoints.only("md")]: {
                  columnGap: 3,
                },
              }}
            >
              {GENode !== undefined &&
                GENode.map((node: any) => {
                  var isPass = false;
                  TermNode.map((tn: any) => {
                    if (tn.id === node.courseNo) {
                      console.log(tn.data.is_pass);
                      isPass = true;
                    }
                  });
                  // console.log(TermNode)
                  return (
                    <Stack
                      onClick={() => {
                        setInsideNode(node.courseNo);
                        setInsideNodeClicked(true);
                      }}
                      sx={{
                        m: 0,
                        width: "6.466vw",
                        height: "5.3704vh",
                        padding: "1vh 0",
                        border: "1.5px solid #7C4DFF",
                        borderRadius: "0.5rem",
                        [theme.breakpoints.between("sm", "md")]: {
                          height: "36px",
                          width: "9.466vw",
                          bgcolor: "lavender",
                        },
                        [theme.breakpoints.only("md")]: {
                          height: "40px", //44-16
                          width: "6.966vw", //+0.32
                          bgcolor: "pink",
                        },
                      }}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Stack
                          sx={{
                            width: "50%",
                          }}
                        >
                          <Typography
                            sx={{
                              [theme.breakpoints.between("sm", "md")]: {
                                fontSize: "0.78em",
                              },
                              [theme.breakpoints.only("md")]: {
                                fontSize: "0.8em",
                              },
                              [theme.breakpoints.between(1200, 1439)]: {
                                fontSize: "0.88em",
                              },
                              fontSize: "0.9rem",
                            }}
                          >
                            {node.courseNo}
                          </Typography>
                        </Stack>
                        {/* Checkbox */}
                        {checkisPass(isPass, "#7C4DFF")}
                      </Stack>
                    </Stack>
                  );
                })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return null;
  }
}

export function CheckIsFreeModal(
  setClicked: Function,
  text: string,
  setText: Function
) {
  var isFree = false;
  return (
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
          top: "16vh",
          left: "28vw",
          zIndex: "1",
          borderRadius: "1rem",
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
              setClicked(false);
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

        <Stack sx={{ alignContent: "center", width: "100%" }}>
          <Paper
            component="form"
            sx={{
              p: 1,
              display: "flex",
              width: "90%",
              justifyContent: "center",
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
                console.log(text);
                if (text !== "" || text !== null) {
                  var resp: any = await FetchIsFree(text);
                  if (resp !== null) {
                    const group = resp["group"];
                    isFree = true;
                  }

                  console.log(resp);
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {isFree && text !== null && <Typography>Goo</Typography>}
        </Stack>
      </Stack>
    </Stack>
  );
}

export function warningModal(setOpen: Function) {
  return (
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
          // height: "30%",
          top: "50%",
          left: "50%",
          mt: "-100px",
          ml: "-250px",
          zIndex: "1",
          borderRadius: "1rem",
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
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ ml: "43%", mt: "auto", mb: "auto" }}
          >
            <WarningIcon sx={{ color: amber[500] }} />
            <Typography sx={{ color: "white" }}>Warning</Typography>
          </Stack>

          <IconButton
            onClick={() => {
              setOpen(false);
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
        <Stack sx={{ alignContent: "center", width: "100%", p: 2.6 }}>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เนื่องจากในขณะนี้ข้อมูลของหน่วยกิต
            หรือ credits ของวิชา Free Elective อาจมีความไม่ถูกต้อง
            โปรดตรวจสอบความถูกต้องของข้อมูลหน่วยกิตก่อนทำการตัดสินใจวางแผนการเรียนในเทอมต่อไป
            ท่านสามารถแก้ไขข้อมูลของหน่วยกิตเองได้ ด้วยกดกล่องที่วิชา Free
            Elective เพื่อทำการแก้ไขข้อมูล
            หลังจากกดยืนยันระบบจะทำการคำนวณจำนวนหน่วยกิตรวมให้ใหม่
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export function warningIcon(setOpen: Function) {
  return (
    <IconButton aria-label="warning" onClick={() => {
      setOpen(true)
    }}>
      <InfoIcon sx={{ color: amber[500] }} />
    </IconButton>
  );
}
