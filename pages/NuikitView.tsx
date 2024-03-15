import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  SvgIcon,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  InputBase,
  Paper,
  Alert,
} from "@mui/material";

import isSelected, {
  displayCoopPlan,
  displayDone,
  displayFree,
  displayGE,
  displayNormalPlan,
  displayPre,
  // displayPre,
  displaySp,
} from "./View/MUIFilter";

import {
  free_pass,
  ge_pass,
  majorCore_pass,
  major_pass,
} from "../constants/color";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { red, green, blue } from "@mui/material/colors";

import axios, { AxiosError, AxiosResponse } from "axios";

import React, { useState, useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";

import jsonData from "../Model/NodeDB.json";
import NuikitViewNode from "./View/Node/NuikitViewNode";
import {
  CheckIsFreeModal,
  DisplayNodeModal,
  warningIcon,
  warningModal,
} from "./View/NodeModal";

import Navbar from "./View/Navbar";
import { theme } from "../constants/theme";
import { IOSSwitch } from "./View/SwitchMUI";
import { WhoAmIResponse } from "./api/whoAmI";
import { useRouter } from "next/router";
import {
  FetchCourse,
  FetchIsFree,
  fetchCourseDescription,
  fetchFreeElective,
  fetchMajorElective,
  fetchNuikitData,
} from "../Controller/Fetch";

var mjreq: any = [];
var mjelec: any = [];
var core: any = [];
var free: any = [];
var gen_req: any = [];
var gen_elec: any = [];

function NuikitView() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  //Modal Part
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  //node elective
  const [mjreqNode, setMJreqNode] = useState<any>(null);
  const [mjelectiveNode, setMJelectiveNode] = useState<any>(null);
  const [coreNode, setCoreNode] = useState<any>(null);
  const [freeNode, setFreeNode] = useState<any>(null);
  const [genReqNode, setGenReqNode] = useState<any>(null);
  const [genElecNode, setGenElecNode] = useState<any>(null);

  var [major_reqCredit, setmajorReqCredit] = useState<number>(0);
  var [major_reqCreditNeed, setmajorReqCreditNeed] = useState<number>(0);
  var [major_elecCredit, setmajorElecCredit] = useState<number>(0);
  var [major_elecCreditNeed, setmajorElecCreditNeed] = useState<number>(0);
  var [core_Credit, setcoreCredit] = useState<number>(0);
  var [core_CreditNeed, setcoreCreditNeed] = useState<number>(0);

  var [free_Credit, setfreeCredit] = useState<number>(0);
  var [free_CreditNeed, setfreeCreditNeed] = useState<number>(0);

  var [gen_reqCredit, setgenReqCredit] = useState<number>(0);
  var [gen_reqCreditNeed, setgenReqCreditNeed] = useState<number>(0);
  var [gen_elecCredit, setgenElecCredit] = useState<number>(0);
  var [gen_elecCreditNeed, setgenElecCreditNeed] = useState<number>(0);

  // filter
  const [filter, setFilter] = useState(false);
  const [isCoop, setisCoop] = useState(false);

  const [filterGE, setFilterGE] = useState(true);
  const [filterSp, setFilterSp] = useState(true);
  const [clickSp, setClickSp] = useState(true);
  const [filterFree, setFilterFree] = useState(true);

  const [checkedPreFilter, setCheckedPreFilter] = useState(true);
  const [checkedDone, setCheckedDone] = useState(false);
  const [clickDoned, setClickDone] = useState(false);

  const [formats, setFormats] = useState("normal");
  const [prevFormat, setPrevFormat] = useState<any>();
  const [disNormalButton, setDisNormalButton] = useState(false);
  const [disCoopButton, setDisCoopButton] = useState(false);

  const [saveBtn, setSaveBtn] = useState(false);

  const [detailClicked, setDetailClicked] = useState<boolean>(false);
  const [detail, setDetail] = useState([]);
  const [arrNode, setArrNode] = useState([]);

  const [insideNodeClicked, setInsideNodeClicked] = useState<boolean>(false);
  const [arrInsideNode, setInsideArrNode] = useState([]);

  const [text, setText] = useState("");
  const [tmpText, setTmpText] = useState("");
  const [freeClicked, setFreeClicked] = useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [searchBtn, setSearchBtn] = useState<boolean>(false);

  const [freePassClick, setFreePassClick] = useState<boolean>(false);
  const [freeCreditArr, setFreeCreditArr] = useState<number[]>([]);
  const [freeCID, setFreeCID] = useState("");
  const [dfValue, setDFValue] = useState(3);

  const [errInp, setErrInp] = useState<boolean>(false);

  const [warning, setWarning] = useState(true);

  const [screen, setScreen] = useState(1440);

  var tmp_major_reqCredit = 0;
  var tmp_major_reqCreditNeed = 0;
  var tmp_major_elecCredit = 0;
  var tmp_major_elecCreditNeed = 0;

  var tmp_coreCredit = 0;
  var tmp_coreCreditNeed = 0;

  var tmp_free_Credit = 0;
  var tmp_free_CreditNeed = 0;

  var tmp_gen_reqCredit = 0;
  var tmp_gen_reqCreditNeed = 0;

  var tmp_gen_elecCredit = 0;
  var tmp_gen_elecCreditNeed = 0;

  //free elective
  var [freeModalNode, setFreeModalNode] = useState<any>(null);
  var [majorModalNode, setMajorModalNode] = useState<any>(null);
  var [notLearnGEArr, setnotLearnGE] = useState<any>(null);
  var [modalTopic, setModalTopic] = useState("");

  const [year, setYear] = useState("2563");
  var tempArr: any = [];

  var studentId = "";

  // console.log("checkdoned   " + checkedDone);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setClickDone(event.target.checked)
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

  function ToggleCoopButt(isDisable: boolean) {
    if (isDisable) {
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

  async function NuikitData(url: string) {
    const resp: any = await fetchNuikitData(url);
    
    if (resp["isCoop"] === "true") {
      setisCoop(true);
      setFormats("coop");
      
      if (resp["number of term"].length >= 4) {
        setDisNormalButton(true);
      } else {
        setDisNormalButton(false);
      }

    } else {
      setisCoop(false);
      setFormats("normal");
      
      if (resp["number of term"].length >= 4) {
        setDisCoopButton(true);
      } else {
        setDisCoopButton(false);
      }
    }

    gen_req = [];
    gen_elec = [];
    //Gen Category
    for (let i = 0; i < resp["geCategory"].length; i++) {
      if (resp["geCategory"][i]["requiredCreditsNeed"] > 0) {
        gen_req = gen_req.concat(
          Object.values(resp["geCategory"][i]["requiredCourseList"])
        );
        // gen_req = Object.values(resp["geCategory"][i]["requiredCourseList"])
        tmp_gen_reqCredit += resp["geCategory"][i]["requiredCreditsGet"];
        setgenReqCredit(tmp_gen_reqCredit);

        tmp_gen_reqCreditNeed += resp["geCategory"][i]["requiredCreditsNeed"];
        setgenReqCreditNeed(tmp_gen_reqCreditNeed);
      }
      if (resp["geCategory"][i]["electiveCreditsNeed"] > 0) {
        gen_elec = gen_elec.concat(
          Object.values(resp["geCategory"][i]["electiveCourseList"])
        );

        tmp_gen_elecCredit += resp["geCategory"][i]["electiveCreditsGet"];
        setgenElecCredit(tmp_gen_elecCredit);

        tmp_gen_elecCreditNeed += resp["geCategory"][i]["electiveCreditsNeed"];
        setgenElecCreditNeed(tmp_gen_elecCreditNeed);

        if (
          resp["geCategory"][i]["electiveCreditsNeed"] -
            resp["geCategory"][i]["electiveCreditsGet"] >
          0
        ) {
          

          tempArr.push({
            groupName: resp["geCategory"][i]["groupName"],
            remainedCredits:
              resp["geCategory"][i]["electiveCreditsNeed"] -
              resp["geCategory"][i]["electiveCreditsGet"],
          });
        }
      }
    }
    setnotLearnGE(tempArr);

    //Free Category
    for (let i = 0; i < resp["freeCategory"].length; i++) {
      if (resp["freeCategory"][i]["electiveCreditsNeed"] > 0) {
        free = Object.values(resp["freeCategory"][i]["electiveCourseList"]);

        tmp_free_Credit += resp["freeCategory"][i]["electiveCreditsGet"];
        setfreeCredit(tmp_free_Credit);
        // tempFreeCdArr.push(resp["freeCategory"][i]["electiveCreditsGet"])

        tmp_free_CreditNeed += resp["freeCategory"][i]["electiveCreditsNeed"];
        setfreeCreditNeed(tmp_free_CreditNeed);
      }
    }

    //Specific Category
    //Core Category
    for (let i = 0; i < resp["coreCategory"].length; i++) {
      if (resp["coreCategory"][i]["requiredCreditsNeed"] > 0) {
        core = Object.values(resp["coreCategory"][i]["requiredCourseList"]);

        tmp_coreCredit += resp["coreCategory"][i]["requiredCreditsGet"];
        setcoreCredit(tmp_coreCredit);

        tmp_coreCreditNeed += resp["coreCategory"][i]["requiredCreditsNeed"];
        setcoreCreditNeed(tmp_coreCreditNeed);
      }
    }
    //Major Category
    for (let i = 0; i < resp["majorCategory"].length; i++) {
      if (resp["majorCategory"][i]["requiredCreditsNeed"] > 0) {
        mjreq = Object.values(resp["majorCategory"][i]["requiredCourseList"]);
        tmp_major_reqCredit += resp["majorCategory"][i]["requiredCreditsGet"];

        setmajorReqCredit(tmp_major_reqCredit);

        tmp_major_reqCreditNeed +=
          resp["majorCategory"][i]["requiredCreditsNeed"];
        setmajorReqCreditNeed(tmp_major_reqCreditNeed);
        // console.log(major_reqCredit);
      }
      if (resp["majorCategory"][i]["electiveCreditsNeed"] > 0) {
        // console.log(i + " have sp elec");
        mjelec = Object.values(resp["majorCategory"][i]["electiveCourseList"]);
        // console.log(mjelec);
        tmp_major_elecCredit += resp["majorCategory"][i]["electiveCreditsGet"];
        setmajorElecCredit(tmp_major_elecCredit);

        tmp_major_elecCreditNeed +=
          resp["majorCategory"][i]["electiveCreditsNeed"];
        setmajorElecCreditNeed(tmp_major_elecCreditNeed);
      }
    }

    //Gen
    if (gen_req.length == 0) {
      setGenReqNode(null);
    } else {
      // console.log("here testttttt");
      setGenReqNode(gen_req);
      // console.log(genReqNode);
    }

    if (gen_elec != 0) {
      setGenElecNode(gen_elec);
    }

    //Free
    if (free.length != 0) {
      setFreeNode(free);
    }

    //Specific Category
    //Core
    if (core.length != 0) {
      setCoreNode(core);
    }
    //Major Req
    if (mjreq.length == 0) {
      setMJreqNode(null);
    } else {
      setMJreqNode(mjreq);
    }
    //Major Elective
    if (mjelec.length == 0) {
      setMJelectiveNode(null);
    } else {
      setMJelectiveNode(mjelec);
    }

    return resp;
  }

  async function handleNodeClick(groupName: string) {
    if (groupName === "Major Elective") {
      var respmjE: any = await fetchMajorElective();
      console.log(respmjE);
      setFreeModalNode(respmjE["courseLists"]);
      setModalTopic("Major Elective");
    } else {
      var respFree: any = await fetchFreeElective(groupName);
      setFreeModalNode(respFree["courseLists"]);
      setModalTopic(groupName);
    }

    toggleModal();
  }

  // useEffect(() => {}, [freeCID]);

  function modalFreeElecNode() {
    var type = "free";
    var tmpArr: any = freeNode;
    var displayArr: any = [];
    var checkLearn: any[] = [];
    if (
      modalTopic === "Learner Person" ||
      modalTopic === "Co-Creator" ||
      modalTopic === "Elective"
    ) {
      type = "gen";
      tmpArr = genElecNode;
      // console.log(tmpArr);
    } else {
      type = "spec_mj";
      tmpArr = mjelectiveNode;

      if (tmpArr === null || tmpArr.length === 0) {
        tmpArr = [];
      }
      // console.log(tmpArr);
    }
    console.log(tmpArr);
    checkLearn = genElecNode;
    freeModalNode.map((node: any) => {
      if (tmpArr.length !== 0) {
        let res = tmpArr.some((n: any) => n.courseNo == node.courseNo);
        // console.log('log res ')

        if (res) {
          displayArr.push(
            <Stack
              onClick={async () => {
                setDetail(await FetchCourse(node.courseNo));

                setInsideArrNode(genElecNode);
                setInsideNodeClicked(true);
              }}
            >
              <NuikitViewNode
                sub_no={node.courseNo}
                sub_name={node.courseNo}
                type={type}
                isPass={true}
                credit={node.credits}
              />
            </Stack>
          );
        } else {
          displayArr.push(
            <Stack
              onClick={async () => {
                setDetail(await FetchCourse(node.courseNo));

                setInsideArrNode(genElecNode);
                setInsideNodeClicked(true);
              }}
            >
              <NuikitViewNode
                sub_no={node.courseNo}
                sub_name={node.courseNo}
                type={type}
                isPass={false}
                credit={node.credits}
              />
            </Stack>
          );
        }
      } else {
        // console.log(node)
        checkLearn = mjelectiveNode;
        // console.log(checkLearn)
        console.log(
          checkLearn.some((n: any) => {
            n.courseNo === node.courseNo;
          })
        );

        // console.log(node.courseNo)

        displayArr.push(
          <Stack
            onClick={async () => {
              setDetail(await FetchCourse(node.courseNo));
              // console.log(genElecNode);
              // setArrNode(genElecNode);
              setInsideArrNode(genElecNode);
              setInsideNodeClicked(true);
              // setDetailClicked(true);
            }}
          >
            <NuikitViewNode
              sub_no={node.courseNo}
              sub_name={node.courseNo}
              type={type}
              isPass={false}
              credit={node.credits}
            />
          </Stack>
        );
      }

      // console.log(res + node.courseNo)
    });

    return displayArr;
  }

  function DisplayModal(cat: String) {
    return (
      <Stack
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.50)",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Stack
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            width: "50.903vw",
            height: "33.796vh",
            bgcolor: "white",
            borderRadius: "1rem 1rem 1rem 1rem",
          }}
        >
          <Stack
            sx={{
              width: "auto",
              height: "5.37vh",
              bgcolor: "#F1485B",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "1rem 1rem 0 0",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
                width: "100%",

                // bgcolor: 'wheat'
              }}
            >
              <Typography sx={{ color: "white", marginLeft: "45%" }}>
                {cat}
              </Typography>
              <IconButton
                onClick={toggleModal}
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
          </Stack>
          <Stack
            sx={{
              height: "76%",
              width: "96%",
              // border: "1px solid black",
              alignSelf: "center",
              margin: "auto",
              p: 2,
            }}
          >
            <Typography sx={{ color: "#858382" }}>
              3 credits must be selected from the following courses
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                columnGap: "1.7vw",
                rowGap: "1.2vh",
                overflowY: "scroll",
                mt: 1,
              }}
            >
              {modalFreeElecNode()}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  function GeneralReq() {
    var isPassArr: any[] = [];
    var notPassArr: any[] = [];

    var total: any[] = [];

    if (genReqNode == null) return null;
    else {
      if (clickDoned) {
        genReqNode.map((node: any) => {
          if (node["isPass"]) {
            total.push(node);
          }
        });
      } else {
        genReqNode.map((node: any) => {
          if (node["isPass"]) {
            isPassArr.push(node);
          } else {
            notPassArr.push(node);
          }
        });
        total = notPassArr.concat(isPassArr);
      }

      return total.map((node: any) => {
        return (
          <Stack
            onClick={async () => {
              setDetail(await FetchCourse(node.courseNo));
              setArrNode(genReqNode);

              setDetailClicked(true);
            }}
          >
            <NuikitViewNode
              sub_no={node.courseNo}
              sub_name={node.courseNo}
              type="gen"
              isPass={node["isPass"]}
              credit={node.credits}
            />
          </Stack>
        );
      });
    }
  }

  function GenElec() {
    var isPassArr: any[] = [];
    var notPassArr: any[] = [];

    var total: any[] = [];

    if (genElecNode === null) {
      if (clickDoned) {
        return total;
      } else {
        // console.log(notLearnGEArr);
        if (notLearnGEArr !== null) {
          if (notLearnGEArr.length > 0) {
            for (let i = 0; i < notLearnGEArr.length; i++) {
              for (
                let j = 0;
                j < Math.ceil(notLearnGEArr[i]["remainedCredits"] / 3);
                j++
              ) {
                console.log(notLearnGEArr[i]["remainedCredits"]);
                total.push(
                  <Stack
                    onClick={() => {
                      handleNodeClick(notLearnGEArr[i]["groupName"]);
                    }}
                  >
                    <NuikitViewNode
                      sub_no={notLearnGEArr[i]["groupName"]}
                      sub_name={notLearnGEArr[i]["groupName"]}
                      type="gen"
                      isPass={false}
                      credit={3}
                    />
                  </Stack>
                );
              }
            }
            return total;
          }
        }
      }
    } else {
      if (clickDoned) {
        genElecNode.map((node: any) => {
          if (node["isPass"]) {
            // console.log(node);
            total.push(
              <Stack
                onClick={async () => {
                  setDetail(await FetchCourse(node.courseNo));
                  setArrNode(mjelec);
                  setDetailClicked(true);
                }}
              >
                <NuikitViewNode
                  sub_no={node.courseNo}
                  sub_name={node.courseNo}
                  type="gen"
                  isPass={node.isPass}
                  credit={node.credits}
                />
              </Stack>
            );
          }
        });
      } else {
        genElecNode.map((node: any) => {
          if (node["isPass"]) {
            isPassArr.push(
              <Stack
                onClick={async () => {
                  setDetail(await FetchCourse(node.courseNo));
                  // console.log(genElecNode);
                  setArrNode(genElecNode);
                  setDetailClicked(true);
                }}
              >
                <NuikitViewNode
                  sub_no={node.courseNo}
                  sub_name={node.courseNo}
                  type="gen"
                  isPass={node["isPass"]}
                  credit={node.credits}
                />
              </Stack>
            );
          }
        });
        // console.log(notLearnGEArr)
        for (let i = 0; i < notLearnGEArr.length; i++) {
          for (
            let j = 0;
            j < Math.ceil(notLearnGEArr[i]["remainedCredits"] / 3);
            j++
          ) {
            notPassArr.push(
              <Stack
                onClick={() => {
                  handleNodeClick(notLearnGEArr[i]["groupName"]);
                }}
              >
                <NuikitViewNode
                  sub_no={notLearnGEArr[i]["groupName"]}
                  sub_name={notLearnGEArr[i]["groupName"]}
                  type="gen"
                  isPass={false}
                  credit={3}
                />
              </Stack>
            );
          }
        }

        total = notPassArr.concat(isPassArr);
      }

      return total;
    }
  }

  function FreeNode() {
    if (freeNode == null) {
      if (checkedDone) {
        return null;
      } else {
        return (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "1.7vw",
              rowGap: "1.2vh",
              // marginTop: "1.8vh",
            }}
          >
            <Stack
              onClick={() => {
                setFreeClicked(true);
              }}
            >
              <NuikitViewNode
                sub_no={"Free Elective"}
                sub_name={"Free Elective"}
                type="free"
                isPass={false}
                credit={3}
              />
            </Stack>

            <Stack
              onClick={() => {
                setFreeClicked(true);
              }}
            >
              <NuikitViewNode
                sub_no={"Free Elective"}
                sub_name={"Free Elective"}
                type="free"
                isPass={false}
                credit={3}
              />
            </Stack>
          </Stack>
        );
      }
    } else {
      var freeArr: any[] = [];
      if (checkedDone) {
        freeNode.map((node: any) => {
          freeArr.push(
            <Stack
              onClick={() => {
                setFreeCID(node.courseNo);

                setFreePassClick(true);

                if (freeCreditArr.length !== 0) {
                  freeCreditArr.map((n: any) => {
                    if (n.courseId === node.courseNo) {
                      setDFValue(n.credit);
                    }
                  });
                }
              }}
            >
              <NuikitViewNode
                sub_no={node.courseNo}
                sub_name={node.courseNo}
                type="free"
                isPass={node["isPass"]}
                credit={node.credits}
              />
            </Stack>
          );
        });
      } else {
        for (let i = 0; i < (free_CreditNeed - free_Credit) / 3; i++) {
          freeArr.push(
            <Stack
              onClick={() => {
                setFreeClicked(true);
              }}
            >
              <NuikitViewNode
                sub_no={"Free Elective"}
                sub_name={"Free Elective"}
                type="free"
                isPass={false}
                credit={3}
              />
            </Stack>
          );
        }

        freeNode.map((node: any) => {
          freeArr.push(
            <Stack
              onClick={() => {
                setFreeCID(node.courseNo);

                setFreePassClick(true);

                if (freeCreditArr.length !== 0) {
                  freeCreditArr.map((n: any) => {
                    if (n.courseId === node.courseNo) {
                      setDFValue(n.credit);
                    }
                  });
                }
              }}
            >
              <NuikitViewNode
                sub_no={node.courseNo}
                sub_name={node.courseNo}
                type="free"
                isPass={node["isPass"]}
                credit={node.credits}
              />
            </Stack>
          );
        });
      }

      return freeArr;
    }
  }

  function CoreNode() {
    var isPassArr: any[] = [];
    var notPassArr: any[] = [];

    var total: any[] = [];

    if (coreNode == null) return null;
    else {
      if (clickDoned) {
        coreNode.map((node: any) => {
          if (node["isPass"]) {
            total.push(node);
          }
        });
      } else {
        coreNode.map((node: any) => {
          if (node["isPass"]) {
            isPassArr.push(node);
          } else {
            notPassArr.push(node);
          }
        });
        total = notPassArr.concat(isPassArr);
      }

      return total.map((node: any) => {
        return (
          <Stack
            onClick={async () => {
              setDetail(await FetchCourse(node.courseNo));
              setArrNode(coreNode);
              setDetailClicked(true);
            }}
          >
            <NuikitViewNode
              sub_no={node.courseNo}
              sub_name={node.courseNo}
              type="spec_core"
              isPass={node["isPass"]}
              credit={node.credits}
            />
          </Stack>
        );
      });
    }
  }

  function majorNode() {
    var isPassArr: any[] = [];
    var notPassArr: any[] = [];

    var total: any[] = [];

    if (mjreqNode == null) {
      return null;
    } else {
      if (clickDoned) {
        mjreqNode.map((node: any) => {
          if (node["isPass"]) {
            total.push(node);
          }
        });
      } else {
        mjreqNode.map((node: any) => {
          if (node["isPass"]) {
            isPassArr.push(node);
          } else {
            notPassArr.push(node);
          }
        });
        total = notPassArr.concat(isPassArr);
      }
    }
    return total.map((node: any) => {
      return (
        <Stack
          onClick={async () => {
            setDetail(await FetchCourse(node.courseNo));
            if (majorNode !== null) {
            }
            setArrNode(mjreqNode);
            setDetailClicked(true);
          }}
        >
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="spec_mj"
            isPass={node["isPass"]}
            credit={node.credits}
          />
        </Stack>
      );
    });
  }

  function majorENode() {
    var isPassArr: any[] = [];
    var notPassArr: any[] = [];

    var total: any[] = [];

    if (mjelectiveNode === null) {
      if (clickDoned) {
        return total;
      } else {
        for (
          let i = 0;
          i < (major_elecCreditNeed - major_elecCredit) / 3;
          i++
        ) {
          // console.log("jojojojojo");
          total.push(
            <Stack
              onClick={() => {
                handleNodeClick("Major Elective");
              }}
            >
              <NuikitViewNode
                sub_no={"Major Elective"}
                sub_name={"Major Elective"}
                type="spec_mj"
                isPass={false}
                credit={3}
              />
            </Stack>
          );
        }
      }
    } else {
      if (clickDoned) {
        console.log("ppppp");
        mjelec.map((node: any) => {
          if (node["isPass"]) {
            total.push(
              <Stack
                onClick={async () => {
                  setDetail(await FetchCourse(node.courseNo));
                  setArrNode(mjelec);
                  setDetailClicked(true);
                }}
              >
                <NuikitViewNode
                  sub_no={node.courseNo}
                  sub_name={node.courseNo}
                  type="spec_mj"
                  isPass={node.isPass}
                  credit={node.credits}
                />
              </Stack>
            );
          }
        });
      } else {
        // console.log(mjelec)
        mjelec.map((node: any) => {
          if (node["isPass"]) {
            isPassArr.push(
              <Stack
                onClick={async () => {
                  setDetail(await FetchCourse(node.courseNo));
                  setArrNode(mjelec);
                  setDetailClicked(true);
                }}
              >
                <NuikitViewNode
                  sub_no={node.courseNo}
                  sub_name={node.courseNo}
                  type="spec_mj"
                  isPass={node.isPass}
                  credit={node.credits}
                />
              </Stack>
            );
            total = isPassArr;
          }
        });

        if (major_elecCreditNeed - major_elecCredit > 0) {
          for (
            let i = 0;
            i < (major_elecCreditNeed - major_elecCredit) / 3;
            i++
          ) {
            notPassArr.push(
              <Stack
                onClick={() => {
                  handleNodeClick("Major Elective");
                }}
              >
                <NuikitViewNode
                  sub_no={"Major Elective"}
                  sub_name={"Major Elective"}
                  type="spec_mj"
                  isPass={false}
                  credit={3}
                />
              </Stack>
            );
          }

          total = notPassArr.concat(isPassArr);
        }
      }
    }
    return total;
  }

  async function cmuOauth() {
    await axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          studentId = response.data.studentId ?? "No Student Id";
          
          if (Number(studentId.substring(0, 2)) >= 63 && Number(studentId.substring(0, 2)) <= 67){
            setYear("2563");
          }
          
          
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
  }

  async function fetchStdData() {
    await cmuOauth();

    const searchParams = new URLSearchParams(window.location.search);
    var search = searchParams.has("mockData");
    var qryValue = searchParams.get("mockData");

    var urlNuikit =
      "http://localhost:8080/categoryView?year=" +
      year +
      "&curriculumProgram=CPE&isCOOP=" +
      isCoop;

    if (search) {
      console.log("have mock");
      urlNuikit += "&mockData=mockData" + qryValue;
    } else {
      
      urlNuikit += "&studentId=" + "630610768";
    }
    NuikitData(urlNuikit);
  }

  useEffect(() => {
    // widthResizer()
    if (window.innerWidth < 601) {
      setErrorMessage("Please use this website in bigger device.")
    }
    fetchStdData();
    
  }, [errorMessage]);

  function widthResizer() {
    var width = window.innerWidth;
    // if (window.innerWidth <= 1300) setOpen(false);
    console.log(width);
    setScreen(width);
  }

  return (
    <Stack
      sx={{
        width: "100vw",
        flexDirection: "row",
        display: "flex",
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
          <Typography variant="h5" sx={{ color: "red", mb: 4, textAlign: 'center' }}>
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
      {errorMessage === "" && <Navbar />}

      {/* Flow */}
      {errorMessage === "" && (
        <Stack
          sx={{
            height: "100vh",
            width: "100%",
            alignItems: "center",
            //   bgcolor: "secondary.main",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "94%",
              marginTop: "3.4074vh",
              justifyContent: "space-between",
              mb: 1,
              alignItems: "center",
              [theme.breakpoints.between("sm", "md")]: {
                alignItems: "start",
              },
            }}
          >
            {/* Topic section */}
            <Stack direction={"row"} sx={{ alignItems: "center", mt: 0 }}>
              <Typography variant="h6" sx={{ mt: 0 }}>
                Category View
              </Typography>
              {warningIcon(setWarning)}
            </Stack>

            <Stack direction={"row"} sx={{ columnGap: 1.4 }}>
              <Stack
                direction={"row"}
                sx={{
                  columnGap: 1.4,
                  rowGap: 1,
                  width: "50vw",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {isCoop ? displayCoopPlan() : displayNormalPlan()}
                {checkedDone && saveBtn && displayDone()}
                {/* {checkedPreFilter && displayPre()} */}
                {filterGE && displayGE(screen)}
                {filterSp && displaySp()}
                {filterFree && displayFree(screen)}
              </Stack>
              {/* Filter */}
              <Button
                variant="outlined"
                endIcon={<FilterListIcon />}
                onClick={() => {
                  setFilter(!filter);
                  setSaveBtn(false);
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
                  justifySelf: "center",
                  "&:hover": {
                    color: "#EE6457",
                    borderColor: "#EE6457",
                    bgcolor: "white",
                  },
                  [theme.breakpoints.down("lg")]: {
                    fontSize: "0.86rem",
                    maxHeight: "3.6vh",
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

          {/* Modal Part */}
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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
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
                      <CheckCircleIcon
                        sx={{ fontSize: 44, color: green[500] }}
                      />
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
                  // height: "30%",
                  bottom: "50%",
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
                      marginLeft: "auto",
                      marginRight: "2vw",
                      color: "white",
                      opacity: 0,
                      cursor: "none",
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
                    {}
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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setText(event.target.value);
                      }}
                    />
                    <Button
                      type="button"
                      sx={{
                        p: 1,
                        bgcolor: blue[500],
                        color: "white",
                        height: "100%",
                        "&:hover": {
                          bgcolor: green[500],
                          color: "white",
                        },
                      }}
                      aria-label="confirm"
                      onClick={async () => {
                        // console.log(freeNode);
                        var tempArr: any = [];
                        free.map((n: any) => {
                          tempArr.push({
                            courseId: n.courseNo,
                            credit: n.credits,
                          });
                        });
                        // defaultCredits()
                        tempArr.map((n: any, index: number) => {
                          if (n.courseId === freeCID) {
                            n.credit = +text;

                            if (Number(text) < dfValue) {
                              free[index]["credits"] -= dfValue - Number(text);
                            } else if (Number(text) > dfValue) {
                              free[index]["credits"] += Number(text) - dfValue;
                            }
                            // free[index]["credits"] = +text;
                            setDFValue(+text);
                          }
                        });
                        var tmpCredit = 0;
                        tempArr.map((n: any) => {
                          tmpCredit += n.credit;
                        });
                        setfreeCredit(tmpCredit);
                        // console.log(tempArr);
                        setFreeCreditArr(tempArr);
                      }}
                    >
                      <CheckIcon />
                    </Button>
                  </Paper>
                </Stack>
              </Stack>
            </Stack>
          )}
          {warning && warningModal(setWarning)}
          {modal && DisplayModal(modalTopic)}
          {detailClicked &&
            DisplayNodeModal(
              detailClicked,
              setDetailClicked,
              detail,
              arrNode,
              false,
              "cat"
            )}

          {insideNodeClicked &&
            DisplayNodeModal(
              insideNodeClicked,
              setInsideNodeClicked,
              detail,
              arrInsideNode,
              true,
              "cat"
            )}
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
                      sx={{ alignSelf: "center" }}
                      variant="h6"
                      fontWeight={600}
                    >
                      Filter
                    </Typography>
                    <IconButton
                      onClick={() => {
                        if (!saveBtn) {
                          setCheckedDone(clickDoned);
                          console.log("click sp " + clickSp);
                        }
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
                    {ToggleButt(disNormalButton)}
                    {ToggleCoopButt(disCoopButton)}
                  </ToggleButtonGroup>

                  {/* Category Section */}
                  <Stack>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Category
                    </Typography>
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
                            height: "0.74em",
                            width: "0.74em",
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
                          setClickSp(filterSp);
                        }}
                      >
                        <Stack direction={"row"}>
                            <Stack
                              sx={{
                                height: "1em",
                                width: "1em",
                                bgcolor: majorCore_pass,
                                borderRadius: "100%",
                                mr: "0.3em",
                              }}
                            ></Stack>
                            <Stack
                              sx={{
                                height: "1em",
                                width: "1em",
                                bgcolor: major_pass,
                                borderRadius: "100%",
                                mr: "0.3em",
                              }}
                            ></Stack>
                          </Stack>

                          {/* <Stack
                              sx={{
                                height: "1em",
                                width: "1em",
                                bgcolor: majorCore_pass,
                                borderRadius: "100%",
                                mr: "0.3em",
                              }}
                            ></Stack> */}
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
                            height: "0.74em",
                            width: "0.74em",
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
                    <Typography variant="subtitle1" fontWeight={600}>
                      Option
                    </Typography>

                    {/* Done Course */}
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "end",
                      }}
                    >
                      <Stack>
                        <Typography variant="subtitle1" fontWeight={500}>
                          Done Course
                        </Typography>
                        <Typography variant="body2">
                          Show all course that done
                        </Typography>
                      </Stack>
                      <FormControlLabel
                        control={
                          <IOSSwitch
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
                      sx={{
                        color: "#000000",
                        borderColor: "#000000",
                        "&:hover": {
                          borderColor: "#EE6457",
                          color: "#EE6457",
                        },
                      }}
                      onClick={() => {
                        setFilterGE(true);
                        setFilterSp(true);
                        setFilterFree(true);
                        setCheckedDone(false);
                        if (isCoop === false) setFormats("normal");
                        else setFormats("coop");

                        // setisCoop(false);
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
                        setSaveBtn(true);
                        setClickDone(checkedDone);
                        setFilter(!filter);
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

          {/* Top Section  */}
          <Stack
            sx={{
              width: "94%",
              height: "32vh",
            }}
          >
            {/* Type Subject */}
            <Stack
              sx={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <Stack
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1" sx={{ color: ge_pass }}>
                  General Education
                </Typography>

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 0,
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: ge_pass }}>
                    {gen_reqCredit + gen_elecCredit}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                      opacity: 0.5,
                      marginRight: "2.5vw",
                      fontSize: "0.9rem",
                    }}
                  >
                    /{gen_reqCreditNeed + gen_elecCreditNeed}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1" sx={{ color: free_pass }}>
                  Free Elective
                </Typography>

                {/* <Typography variant="subtitle1" sx={{ color: "#3BBD84" }}>
                Free Elective
              </Typography> */}

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 0,
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: free_pass }}>
                    {free_Credit}
                  </Typography>

                  {/* <Typography variant="subtitle1" sx={{ color: "#3BBD84" }}>
                  {free_Credit}
                </Typography> */}

                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", opacity: 0.5, fontSize: "0.9rem" }}
                  >
                    /{free_CreditNeed}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* BOX */}
            <Stack
              sx={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{
                  border: "3px solid #F3F3F3",
                  width: "56%",
                  height: "28vh",
                  borderRadius: "0.625rem",
                  // justifyContent: "center",
                  overflowY: "scroll",
                }}
              >
                <Stack
                  sx={{
                    width: "88%",
                    // height: "14vh",
                    alignSelf: "center",
                    // border: "1px solid blue",
                    marginBottom: "1.2vh",
                  }}
                >
                  <Stack
                    sx={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={550}
                      sx={{ marginBottom: "0.6vh" }}
                    >
                      Required Course
                    </Typography>
                    {/* <Typography variant="body2" >Required Course</Typography> */}

                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        margin: 0,
                        alignItems: "baseline",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: ge_pass }}>
                        {gen_reqCredit}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "black",
                          opacity: 0.5,
                          fontSize: "0.8rem",
                        }}
                      >
                        /{gen_reqCreditNeed}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    sx={{
                      // border: "1px solid blue",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      columnGap: "1.7vw",
                      rowGap: "1.2vh",
                      [theme.breakpoints.down("lg")]: {
                        columnGap: "2vw",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        columnGap: "5.4vw",
                      },
                      // overflowY: "scroll",
                      // marginBottom: '1vh'
                    }}
                  >
                    {/* {majorReqNode} */}
                    {/* {actNode} */}
                    {/* {CoReqNode} */}
                    {!filterGE && saveBtn ? (
                      <Stack sx={{ height: "5.3704vh", width: "100%" }}></Stack>
                    ) : (
                      GeneralReq()
                    )}
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    width: "88%",
                    height: "10vh",
                    alignSelf: "center",
                  }}
                >
                  <Stack
                    sx={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={550}
                      sx={{ marginBottom: "0.6vh" }}
                    >
                      Elective
                    </Typography>
                    {/* <Typography variant="body2" >Elective</Typography> */}
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // margin: 0,
                        alignItems: "baseline",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: ge_pass }}>
                        {gen_elecCredit}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "black",
                          opacity: 0.5,
                          fontSize: "0.8rem",
                        }}
                      >
                        /{gen_elecCreditNeed}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    sx={{
                      // border: "1px solid black",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      rowGap: "1.2vh",
                      columnGap: "1.7vw",
                      paddingBottom: "2vh",
                      flexWrap: "wrap",
                      [theme.breakpoints.down("lg")]: {
                        columnGap: "2vw",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        columnGap: "5.4vw",
                      },
                    }}
                  >
                    {/* {freeNode}
                  {GEfreeNode}
                  {CoFreeNode} */}
                    {!filterGE && saveBtn ? null : GenElec()}
                  </Stack>
                </Stack>
              </Stack>

              {/* Free Elective */}
              <Stack
                sx={{
                  border: "3px solid #F3F3F3",
                  width: "40%",
                  height: "28vh",
                  borderRadius: "0.625rem",
                  // bgcolor: 'beige'
                }}
              >
                <Stack
                  sx={{
                    // border: "1px solid black",
                    width: "82%",
                    display: "flex",
                    flexDirection: "row",
                    rowGap: "1.2vh",
                    columnGap: "1.7vw",
                    paddingBottom: "2vh",
                    flexWrap: "wrap",
                    alignSelf: "center",
                    marginTop: 4.2,
                    [theme.breakpoints.down("lg")]: {
                      columnGap: "2vw",
                    },
                    [theme.breakpoints.between("sm", "md")]: {
                      columnGap: "5.4vw",
                    },
                  }}
                >
                  {!filterFree && saveBtn ? (
                    <Stack sx={{ height: "5.3704vh", width: "100%" }}></Stack>
                  ) : (
                    FreeNode()
                  )}
                </Stack>
              </Stack>
              {/*  */}
            </Stack>
          </Stack>

          {/* Bottom Section  */}
          <Stack
            sx={{
              width: "94%",
              height: "54vh",
              marginTop: "2vh",
              // bgcolor: "primary.main",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: majorCore_pass }}>
                Specfication
              </Typography>

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  // margin: 0,
                  alignItems: "baseline",
                }}
              >
                <Typography variant="subtitle1" sx={{ color: majorCore_pass }}>
                  {core_Credit + major_reqCredit + major_elecCredit}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "black",
                    opacity: 0.5,
                    fontSize: "0.9rem",
                  }}
                >
                  /
                  {core_CreditNeed + major_reqCreditNeed + major_elecCreditNeed}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{
                border: "3px solid #F3F3F3",
                width: "100%",
                height: "100%",
                borderRadius: "0.625rem",
                justifyContent: "start",
                overflowY: "scroll",
              }}
            >
              <Stack
                sx={{
                  width: "94%",
                  // height: "14vh",
                  alignSelf: "center",
                  marginBottom: "1.2vh",
                  marginTop: 1,
                  // alignItems: 'start'
                  // overflowY: 'scroll'
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={550}
                    sx={{ marginBottom: "0.6vh" }}
                  >
                    Core Course
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // margin: 0,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: majorCore_pass }}>
                      {core_Credit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        opacity: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      /{core_CreditNeed}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    // border: "1px solid black",
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "1.7vw",
                    rowGap: "1.2vh",
                    // overflowY: "scroll",
                    [theme.breakpoints.down("lg")]: {
                      columnGap: "2vw",
                    },
                    [theme.breakpoints.between("sm", "md")]: {
                      columnGap: "3.84vw",
                    },
                  }}
                >
                  {!filterSp && saveBtn ? (
                    <Stack sx={{ height: "5.3704vh", width: "100%" }}></Stack>
                  ) : (
                    CoreNode()
                  )}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  width: "94%",
                  // height: "20vh",
                  alignSelf: "center",
                  marginBottom: "1.2vh",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={550}>
                    Major Course
                  </Typography>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // margin: 0,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: major_pass }}>
                      {major_reqCredit + major_elecCredit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        opacity: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      /{major_reqCreditNeed + major_elecCreditNeed}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginBottom: "0.6vh" }}>
                    Major Require Course
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // margin: 0,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: major_pass }}>
                      {major_reqCredit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        opacity: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      /{major_reqCreditNeed}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    //   border: "1px solid black",
                    width: "100%",
                    // height: "20vh",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "1.7vw",
                    rowGap: "1.2vh",
                    // overflowY: "scroll",
                    [theme.breakpoints.down("lg")]: {
                      columnGap: "2vw",
                    },
                    [theme.breakpoints.between("sm", "md")]: {
                      columnGap: "3.84vw",
                    },
                  }}
                >
                  {!filterSp && saveBtn ? (
                    <Stack sx={{ height: "5.3704vh", width: "100%" }}></Stack>
                  ) : (
                    majorNode()
                  )}
                </Stack>
              </Stack>

              {/* Major Elective */}
              <Stack
                sx={{
                  width: "94%",
                  // height: "9.3vh",
                  alignSelf: "center",
                  paddingBottom: "2vh",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginBottom: "0.6vh" }}>
                    Major Elective
                  </Typography>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      // margin: 0,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: major_pass }}>
                      {major_elecCredit}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        opacity: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      /{major_elecCreditNeed}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    //   border: "1px solid black",
                    width: "100%",
                    // height: "16vh",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "1.7vw",
                    rowGap: "1.2vh",
                    [theme.breakpoints.down("lg")]: {
                      columnGap: "2vw",
                    },
                    [theme.breakpoints.between("sm", "md")]: {
                      columnGap: "3.84vw",
                    },
                    //   overflowX: 'scroll'
                  }}
                >
                  {!filterSp && saveBtn ? (
                    <Stack sx={{ height: "5.3704vh", width: "100%" }}></Stack>
                  ) : (
                    majorENode()
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default NuikitView;
export { mjreq, mjelec, core, free, gen_req, gen_elec, fetchNuikitData };
