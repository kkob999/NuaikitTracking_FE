import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  SvgIcon,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import "../View/NuikitView.css";
import "../View/Navbar.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

import jsonData from "../Model/NodeDB.json";
import NuikitViewNode from "../View/Node/NuikitViewNode";

import Navbar from "../View/Navbar";

const urlNuikit =
  "http://localhost:8080/categoryView?year=2563&curriculumProgram=CPE&isCOOP=false&mockData=mockData5";

function fetchNuikitData(url: string) {
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch nuikit data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        reject(error);
        // return testfail1
      });
  });
}

function fetchFreeElective(groupName: string) {
  const urlFree =
    "http://localhost:8080/ge/elective?groupName=" +
    groupName +
    "&year=2563&curriculumProgram=CPE&isCOOP=false";
  return new Promise(function (resolve, reject) {
    axios
      .get(urlFree, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch free elective data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

var mjreq: any = [];
var mjelec: any = [];
var core: any = [];
var free: any = [];
var gen_req: any = [];
var gen_elec: any = [];

function NuikitView() {
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
  var [notLearnGEArr, setnotLearnGE] = useState<any>(null);
  var [modalTopic, setModalTopic] = useState("");
  var tempArr: any = [];

  async function NuikitData(url: string) {
    const resp: any = await fetchNuikitData(url);

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
          console.log(
            "not enough " +
              resp["geCategory"][i]["groupName"] +
              " credits" +
              (resp["geCategory"][i]["electiveCreditsNeed"] -
                resp["geCategory"][i]["electiveCreditsGet"])
          );

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
      // console.log("here");
      setGenReqNode(gen_req);
      console.log(genReqNode);
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
    const respFree: any = await fetchFreeElective(groupName);
    setFreeModalNode(respFree["courseLists"]);
    setModalTopic(groupName);
    toggleModal();
  }

  useEffect(() => {
    NuikitData(urlNuikit);
  }, []);

  function modalFreeElecNode() {
    var type = "free";
    var tmpArr: any = freeNode;
    var displayArr: any = [];
    if (
      modalTopic == "Learner Person" ||
      modalTopic == "Co-Creator" ||
      modalTopic == "Elective"
    ) {
      type = "gen";
      tmpArr = genElecNode;
      // console.log("lalala");
      // console.log(tmpArr);
    }

    freeModalNode.map((node: any) => {
      let res = tmpArr.some((n: any) => n.courseNo == node.courseNo);
      if (res) {
        displayArr.push(
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type={type}
            isPass={true}
            credit={node.credits}
          />
        );
      } else {
        displayArr.push(
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type={type}
            isPass={false}
            credit={node.credits}
          />
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
          }}
        >
          <Stack
            sx={{
              width: "auto",
              height: "5.37vh",
              bgcolor: "#F1485B",
              alignItems: "center",
              justifyContent: "center",
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
    if (genReqNode == null) return null;
    else {
      var idx = 0;
      genReqNode.map((node: any) => {
        if (!node["isPass"]) {
          //delete
          genReqNode.splice(idx, 1);
          //add
          genReqNode.splice(0, 0, node);
        }
        idx++;
        return node;
      });

      return genReqNode.map((node: any) => {
        return (
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="gen"
            isPass={node["isPass"]}
            credit={node.credits}
          />
        );
      });
    }
  }

  function GenElec() {
    var freeGENodeArr: any = [];

    if (genElecNode == null) return null;
    else {
      if (notLearnGEArr.length > 0) {
        
        for (let i = 0; i < notLearnGEArr.length; i++) {
          for (
            let j = 0;
            j < Math.ceil(notLearnGEArr[i]["remainedCredits"] / 3);
            j++
          ) {
            freeGENodeArr.push(
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

        genElecNode.map((node: any) => {
          freeGENodeArr.push(
            // <Stack>
            <NuikitViewNode
              sub_no={node.courseNo}
              sub_name={node.courseNo}
              type="gen"
              isPass={node["isPass"]}
              credit={node.credits}
            />
            // {/* </Stack> */}
          );
        });
        
        return freeGENodeArr;
      } else {
        return genElecNode.map((node: any) => {
          return (
            <NuikitViewNode
              sub_no={node.courseNo}
              sub_name={node.courseNo}
              type="gen"
              isPass={node["isPass"]}
              credit={node.credits}
            />
          );
        });
      }
    }
  }

  function FreeNode() {
    if (freeNode == null) {
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
          <NuikitViewNode
            sub_no={"Free Elective"}
            sub_name={"Free Elective"}
            type="free"
            isPass={false}
            credit={3}
          />

          <NuikitViewNode
            sub_no={"Free Elective"}
            sub_name={"Free Elective"}
            type="free"
            isPass={false}
            credit={3}
          />
        </Stack>
      );
    } else {
      return freeNode.map((node: any) => {
        return (
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="free"
            isPass={node["isPass"]}
            credit={node.credits}
          />
        );
      });
    }
  }

  function CoreNode() {
    if (coreNode == null) return null;
    else {
      return coreNode.map((node: any) => {
        var idx = 0;
        coreNode.map((node: any) => {
          if (!node["isPass"]) {
            //delete
            coreNode.splice(idx, 1);
            //add
            coreNode.splice(0, 0, node);
          }
          idx++;
          return node;
        });
        return (
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="spec"
            isPass={node["isPass"]}
            credit={node.credits}
          />
        );
      });
    }
  }

  function majorNode() {
    if (mjreqNode == null) {
      return null;
    } else {
      var idx = 0;
      mjreqNode.map((node: any) => {
        if (!node["isPass"]) {
          //delete
          mjreqNode.splice(idx, 1);
          //add
          mjreqNode.splice(0, 0, node);
        }
        idx++;
        return node;
      });
      return mjreqNode.map((node: any) => {
        return (
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="spec"
            isPass={node.isPass}
            credit={node.credits}
          />
        );
      });
    }
  }

  function majorENode() {
    if (mjelectiveNode == null) {
      var majorEArr: any = [];
      // console.log("major E credit " + major_elecCreditNeed);
      for (let i = 0; i < (major_elecCreditNeed - major_elecCredit) / 3; i++) {
        majorEArr.push(
          <NuikitViewNode
            sub_no={"Major Elective"}
            sub_name={"Major Elective"}
            type="spec"
            isPass={false}
            credit={3}
          />
        );
      }
      return majorEArr;
    } else {
      var majorEArr: any = [];
      for (let i = 0; i < (major_elecCreditNeed - major_elecCredit) / 3; i++) {
        majorEArr.push(
          <NuikitViewNode
            sub_no={"Major Elective"}
            sub_name={"Major Elective"}
            type="spec"
            isPass={false}
            credit={3}
          />
        );
      }
      mjelectiveNode.map((node: any) => {
        majorEArr.push(
          <NuikitViewNode
            sub_no={node.courseNo}
            sub_name={node.courseNo}
            type="spec"
            isPass={node.isPass}
            credit={node.credits}
          />
        );
      });
      
      return majorEArr;
    }
  }

  // console.log("free credits need" + free_CreditNeed);

  return (
    <Stack
      sx={{
        width: "100vw",
        flexDirection: "row",
        display: "flex",
      }}
    >
      {/* Navbar */}
      {/* <Box sx={{ width: "20vw" }}> */}
      <Navbar />
      {/* </Box> */}
      {/* Flow */}
      <Stack
        sx={{
          height: "100vh",
          width: "100%",
          alignItems: "center",
          //   bgcolor: "secondary.main",
        }}
      >
        <Stack
          sx={{
            width: "94%",
            marginTop: "3.4074vh",
            // height: "10vh",
            // justifyItems: 'flex-start'
          }}
        >
          {/* Topic section */}
          <Typography variant="h6" sx={{}}>
            Category View
          </Typography>
        </Stack>

        {/* Modal Part */}
        {modal && DisplayModal(modalTopic)}

        {/* Top Section  */}
        <Stack
          sx={{
            width: "94%",
            height: "32vh",
          }}
        >
          {/* Type Subject */}
          <Stack sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Stack
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "#8850EA" }}>
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
                <Typography variant="subtitle1" sx={{ color: "#8850EA" }}>
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
              <Typography variant="subtitle1" sx={{ color: "#1976D2" }}>
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
                <Typography variant="subtitle1" sx={{ color: "#1976D2" }}>
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
                justifyContent: "center",
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
                    marginTop: "4vh",
                  }}
                >
                  <Typography variant="body2" sx={{ marginBottom: "0.6vh" }}>
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
                    <Typography variant="body2" sx={{ color: "#8850EA" }}>
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
                    // overflowY: "scroll",
                    // marginBottom: '1vh'
                  }}
                >
                  {/* {majorReqNode} */}
                  {/* {actNode} */}
                  {/* {CoReqNode} */}
                  {GeneralReq()}
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
                  <Typography variant="body2" sx={{ marginBottom: "0.6vh" }}>
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
                    <Typography variant="body2" sx={{ color: "#8850EA" }}>
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
                  }}
                >
                  {/* {freeNode}
                  {GEfreeNode}
                  {CoFreeNode} */}
                  {GenElec()}
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
                  marginTop: "6vh",
                }}
              >
                {FreeNode()}
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
            <Typography variant="subtitle1" sx={{ color: "#FF7D0F" }}>
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
              <Typography variant="subtitle1" sx={{ color: "#FF7D0F" }}>
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
                /{core_CreditNeed + major_reqCreditNeed + major_elecCreditNeed}
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
                marginTop: "2vh",
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
                <Typography variant="body2" sx={{ marginBottom: "0.6vh" }}>
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
                  <Typography variant="body2" sx={{ color: "#FF7D0F" }}>
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
                }}
              >
                {CoreNode()}
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
                <Typography variant="body2">Major Course</Typography>

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    // margin: 0,
                    alignItems: "baseline",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#FF7D0F" }}>
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
                  <Typography variant="body2" sx={{ color: "#FF7D0F" }}>
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
                }}
              >
                {majorNode()}
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
                  <Typography variant="body2" sx={{ color: "#FF7D0F" }}>
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
                  //   overflowX: 'scroll'
                }}
              >
                {majorENode()}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NuikitView;
export { mjreq, mjelec, core, free, gen_req, gen_elec, fetchNuikitData };
