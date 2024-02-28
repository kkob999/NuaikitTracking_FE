import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  CircularProgressProps,
  circularProgressClasses,
} from "@mui/material";
import * as React from "react";
import jsonData from "../Model/NodeDB.json";
import Navbar from "./View/Navbar";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "./api/whoAmI";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{ borderRadius: "100%" }}
        {...props}
      />
      <Box
        sx={{
          top: -160,
          left: -160,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#F1485B" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function CircularWithValueLabel(allgetCredit: number, allneedCredit: number) {
  const [progress, setProgress] = React.useState(1);
  if (allneedCredit == 0) allneedCredit = 100;
  var currProgress = (allgetCredit * 100) / allneedCredit;
  if (currProgress > 100) currProgress = 100;
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= currProgress ? currProgress : prevProgress + 1
      );
    }, 0.1);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return progress;
}

const totalCredit = jsonData.summaryCredit;
const reqCredit = jsonData.requiredCredits;
// General Credit
let totalReqGenCredit = 0;
let totalReqGenCreditNeed = 0;
let totalElectiveGenCredit = 0;
let totalElectiveGenCreditNeed = 0;

for (let i = 0; i < jsonData.geCategory.length; i++) {
  if (jsonData.geCategory[i].requiredCreditsNeed > 0) {
    totalReqGenCredit += jsonData.geCategory[i].requiredCreditsGet;
    totalReqGenCreditNeed += jsonData.geCategory[i].requiredCreditsNeed;
  }
  if (jsonData.geCategory[i].electiveCreditsNeed > 0) {
    totalElectiveGenCredit += jsonData.geCategory[i].electiveCreditsGet;
    totalElectiveGenCreditNeed += jsonData.geCategory[i].electiveCreditsNeed;
  }
}
const totalGenGet = totalReqGenCredit + totalElectiveGenCredit;
const totalGenNeed = totalReqGenCreditNeed + totalElectiveGenCreditNeed;

// Free Credit
let totalReqFree = 0,
  totalReqFreeNeed = 0,
  totalElectiveFree = 0,
  totalElectiveFreeNeed = 0;

for (let i = 0; i < jsonData.freeCategory.length; i++) {
  if (jsonData.freeCategory[i].requiredCreditsNeed > 0) {
    totalReqFree += jsonData.freeCategory[i].requiredCreditsGet;
    totalReqFreeNeed += jsonData.freeCategory[i].requiredCreditsNeed;
  }
  if (jsonData.freeCategory[i].electiveCreditsNeed > 0) {
    totalElectiveFree += jsonData.freeCategory[i].electiveCreditsGet;
    totalElectiveFreeNeed += jsonData.freeCategory[i].electiveCreditsNeed;
  }
}

const totalFreeGet = totalReqFree + totalElectiveFree;
const totalFreeNeed = totalReqFreeNeed + totalElectiveFreeNeed;

// Specific Credit
// core
let totalReqCoreCredit = 0,
  totalReqCoreCreditNeed = 0,
  totalElectiveCore = 0,
  totalElectiveCoreNeed = 0;
for (let i = 0; i < jsonData.coreCategory.length; i++) {
  if (jsonData.coreCategory[i].requiredCreditsNeed > 0) {
    totalReqCoreCredit += jsonData.coreCategory[i].requiredCreditsGet;
    totalReqCoreCreditNeed += jsonData.coreCategory[i].requiredCreditsNeed;
  }
  if (jsonData.coreCategory[i].electiveCreditsNeed > 0) {
    totalElectiveCore += jsonData.coreCategory[i].electiveCreditsGet;
    totalElectiveCoreNeed += jsonData.coreCategory[i].electiveCreditsNeed;
  }
}

//Major
let totalMajorReqCredit = 0,
  totalMajorReqCreditNeed = 0,
  totalMajorECredit = 0,
  totalMajorECreditNeed = 0;
for (let i = 0; i < jsonData.majorCategory.length; i++) {
  if (jsonData.majorCategory[i].requiredCreditsNeed > 0) {
    totalMajorReqCredit += jsonData.majorCategory[i].requiredCreditsGet;
    totalMajorReqCreditNeed += jsonData.majorCategory[i].requiredCreditsNeed;
  }
  if (jsonData.majorCategory[i].electiveCreditsNeed > 0) {
    totalMajorECredit += jsonData.majorCategory[i].electiveCreditsGet;
    totalMajorECreditNeed += jsonData.majorCategory[i].electiveCreditsNeed;
  }
}

const totalCoreGet = totalReqCoreCredit + totalElectiveCore;
const totalCoreNeed = totalReqCoreCreditNeed + totalElectiveCoreNeed;

const totalMajorGet = totalMajorReqCredit + totalMajorECredit;
const totalMajorNeed = totalMajorReqCreditNeed + totalMajorECreditNeed;

const totalSpGet = totalCoreGet + totalMajorGet;
const totalSpNeed = totalCoreNeed + totalMajorNeed;

function DashBoard() {
  //Login
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const url =
    "http://localhost:8080/summaryCredits?year=2563&curriculumProgram=CPE&isCOOP=false&studentId=630610727";

  function FetchDashBoard() {
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
          console.log("fetch dashboard data");
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

  var [allgetCredit, setAllGetCredit] = React.useState<number>(0);
  var [allneedCredit, setAllNeedCredit] = React.useState<number>(0);

  var [major_reqCredit, setmajorReqCredit] = React.useState<number>(0);
  var [major_reqCreditNeed, setmajorReqCreditNeed] = React.useState<number>(0);
  var [major_elecCredit, setmajorElecCredit] = React.useState<number>(0);
  var [major_elecCreditNeed, setmajorElecCreditNeed] =
    React.useState<number>(0);
  var [core_Credit, setcoreCredit] = React.useState<number>(0);
  var [core_CreditNeed, setcoreCreditNeed] = React.useState<number>(0);

  var [free_Credit, setfreeCredit] = React.useState<number>(0);
  var [free_CreditNeed, setfreeCreditNeed] = React.useState<number>(0);

  var [gen_reqCredit, setgenReqCredit] = React.useState<number>(0);
  var [gen_reqCreditNeed, setgenReqCreditNeed] = React.useState<number>(0);
  var [gen_elecCredit, setgenElecCredit] = React.useState<number>(0);
  var [gen_elecCreditNeed, setgenElecCreditNeed] = React.useState<number>(0);

  var [clock, setClock] = React.useState<number>(0);

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

  async function DatchBoardData() {
    const resp: any = await axios
      .get(url, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then(function (response) {
        console.log("fetch dashboard dataaaaaa");
        return response.data;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        // return testfail1
      });
    // console.log(resp["coreCategory"]);
    console.log(resp);

    setAllGetCredit(resp["summaryCredit"]);
    setAllNeedCredit(resp["requiredCredits"]);

    setClock(resp["summaryCredit"]);

    for (let i = 0; i < resp["coreCategory"].length; i++) {
      tmp_coreCredit += resp["coreCategory"][i]["requiredCreditsGet"];
      // console.log(resp["coreCategory"][i]["requiredCreditsGet"])
      setcoreCredit(tmp_coreCredit);

      tmp_coreCreditNeed += resp["coreCategory"][i]["requiredCreditsNeed"];
      setcoreCreditNeed(tmp_coreCreditNeed);
    }

    for (let i = 0; i < resp["freeCategory"].length; i++) {
      tmp_free_Credit += resp["freeCategory"][i]["electiveCreditsGet"];
      setfreeCredit(tmp_free_Credit);

      tmp_free_CreditNeed += resp["freeCategory"][i]["electiveCreditsNeed"];
      setfreeCreditNeed(tmp_free_CreditNeed);
    }

    for (let i = 0; i < resp["geCategory"].length; i++) {
      if (resp["geCategory"][i]["requiredCreditsNeed"] > 0) {
        tmp_gen_reqCredit += resp["geCategory"][i]["requiredCreditsGet"];
        setgenReqCredit(tmp_gen_reqCredit);

        tmp_gen_reqCreditNeed += resp["geCategory"][i]["requiredCreditsNeed"];
        setgenReqCreditNeed(tmp_gen_reqCreditNeed);
      }
      if (resp["geCategory"][i]["electiveCreditsNeed"] > 0) {
        tmp_gen_elecCredit += resp["geCategory"][i]["electiveCreditsGet"];
        setgenElecCredit(tmp_gen_elecCredit);

        tmp_gen_elecCreditNeed += resp["geCategory"][i]["electiveCreditsNeed"];
        setgenElecCreditNeed(tmp_gen_elecCreditNeed);
      }
    }

    for (let i = 0; i < resp["majorCategory"].length; i++) {
      if (resp["majorCategory"][i]["requiredCreditsNeed"] > 0) {
        tmp_major_reqCredit += resp["majorCategory"][i]["requiredCreditsGet"];
        setmajorReqCredit(tmp_major_reqCredit);

        tmp_major_reqCreditNeed +=
          resp["majorCategory"][i]["requiredCreditsNeed"];
        setmajorReqCreditNeed(tmp_major_reqCreditNeed);
      }
      if (resp["majorCategory"][i]["electiveCreditsNeed"] > 0) {
        tmp_major_elecCredit += resp["majorCategory"][i]["electiveCreditsGet"];
        setmajorElecCredit(tmp_major_elecCredit);
        console.log(tmp_major_elecCredit);

        tmp_major_elecCreditNeed +=
          resp["majorCategory"][i]["electiveCreditsNeed"];
        setmajorElecCreditNeed(tmp_major_elecCreditNeed);
      }
      // console.log('.')
    }
    // console.log('.')
    // setClock(CircularWithValueLabel(allgetCredit,allneedCredit))

    if (resp["summaryCredit"] >= resp["requiredCredits"]) {
      setClock(100);
    } else {
      setClock((resp["summaryCredit"] * 100) / resp["requiredCredits"]);
    }
  }

  useEffect(() => {
    //All cookies that belong to the current url will be sent with the request automatically
    //so we don't have to attach token to the request
    //You can view token (stored in cookies storage) in browser devtools (F12). Open tab "Application" -> "Cookies"
    axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          setFullName(response.data.firstName + " " + response.data.lastName);
          setCmuAccount(response.data.cmuAccount);
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
  }, []);

  React.useEffect(() => {
    DatchBoardData();
  }, []);

  function signOut() {
    //Call sign out api without caring what is the result
    //It will fail only in case of client cannot connect to server
    //This is left as an exercise for you. Good luck.
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

  return (
    <Stack
      sx={{
        width: "100vw",
        flexDirection: "row",
        display: "flex",
      }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Dashboard */}
      <Stack
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Stack
          sx={{
            height: "100%",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Total Nuikit */}
          <Stack sx={{ marginBottom: "5.5556vh" }}>
            <Typography>Total Nuikit</Typography>
            <Stack
              sx={{
                width: "22.917vw",
                height: "25.3704vh",
                border: "2px solid var(--Grey_2, #C2C2C2)",
                borderRadius: "1.25rem",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    marginRight: "1.563vw",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CircularProgress
                      variant="determinate"
                      sx={{ color: "#C5C5C5" }}
                      size={160}
                      thickness={4}
                      value={100}
                    />
                    <CircularProgressWithLabel
                      variant="determinate"
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: -160,
                        color: "#F1485B",
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: "round",
                        },
                      }}
                      thickness={4}
                      size={160}
                      value={clock}
                    />
                  </Box>
                </Stack>

                <Stack sx={{ justifyContent: "center" }}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#F1485B",
                        height: "0.938rem",
                        width: "0.938rem",
                        borderRadius: "100%",
                      }}
                    ></Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginLeft: "0.521vw" }}
                    >
                      Done
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#C2C2C2",
                        height: "0.938rem",
                        width: "0.938rem",
                        borderRadius: "100%",
                      }}
                    ></Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginLeft: "0.521vw" }}
                    >
                      Undone
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* End Total Nuikit */}

          {/* Profile */}
          <Stack>
            <Typography>Profile</Typography>
            <Stack
              sx={{
                width: "22.917vw",
                height: "13.9229vh",
                border: "2px solid var(--Grey_2, #C2C2C2)",
                borderRadius: "1.25rem",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  marginLeft: "1.771vw",
                  marginRight: "1.771vw",
                  gap: "1.4815vh",
                }}
              >
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ width: "6.771vw" }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginLeft: "0" }}>
                    Natcha Sirakorn
                  </Typography>
                </Stack>
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ width: "6.771vw" }}>
                    Email
                  </Typography>
                  <Typography variant="subtitle2">
                    natcha_sil@cmu.ac.th
                  </Typography>
                </Stack>
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ width: "6.771vw" }}>
                    Student code
                  </Typography>
                  <Typography variant="subtitle2">630610727</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* End Profile */}
        </Stack>

        {/* Your Nuikit */}
        <Stack
          sx={{
            height: "100%",
            // width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography>Your Nuikit</Typography>
            {/* frame */}
            <Stack
              sx={{
                height: "48.8889vh",
                width: "31.979vw",
                border: "2px solid var(--Grey_2, #C2C2C2)",
                borderRadius: "1.25rem",
                justifyContent: "center",
              }}
            >
              {/* Start */}
              <Stack
                sx={{
                  marginLeft: "2.917vw",
                  marginRight: "2.917vw",
                  gap: "2.9630vh",
                  justifyItems: "center",
                }}
              >
                {/* General */}
                <Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "var(--GE_done, #7C4DFF)" }}
                    >
                      General Education
                    </Typography>

                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "var(--GE_done, #7C4DFF)" }}
                      >
                        {gen_reqCredit + gen_elecCredit}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: "0.9rem",
                          color: "black",
                          opacity: 0.5,
                        }}
                      >
                        /{gen_reqCredit + gen_elecCredit}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "1.042vw",
                    }}
                  >
                    {/* SVG */}
                    <Stack sx={{ marginRight: "0.417vw" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="58"
                        viewBox="0 0 16 68"
                        fill="none"
                      >
                        <path
                          d="M15 21.1489L1 21.1489L1 1.14893"
                          stroke="black"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15 57.1489L1 57.1489L1 21.1489"
                          stroke="black"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Stack>

                    <Stack sx={{ width: "100%" }}>
                      {/* Req Course */}
                      <Stack
                        sx={{
                          marginTop: "1.2963vh",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Required Course</Typography>

                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #7C4DFF)" }}
                          >
                            {gen_reqCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{gen_reqCreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                      {/* Elective */}
                      <Stack
                        sx={{
                          alignItems: "end",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Elective</Typography>

                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #7C4DFF)" }}
                          >
                            {gen_elecCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{gen_elecCreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                {/* End General */}

                {/* Specification */}
                <Stack sx={{}}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "var(--SP_done, #FF7D0F)" }}
                    >
                      Specification
                    </Typography>

                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "var(--GE_done, #FF7D0F)" }}
                      >
                        {major_elecCredit + major_reqCredit + core_Credit}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: "0.9rem",
                          color: "black",
                          opacity: 0.5,
                        }}
                      >
                        /
                        {major_elecCreditNeed +
                          major_reqCreditNeed +
                          core_CreditNeed}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "1.042vw",
                    }}
                  >
                    {/* SVG */}
                    <Stack sx={{ marginRight: "0.417vw" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="58"
                        viewBox="0 0 16 68"
                        fill="none"
                      >
                        <path
                          d="M15 21.1489L1 21.1489L1 1.14893"
                          stroke="black"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15 57.1489L1 57.1489L1 21.1489"
                          stroke="black"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Stack>

                    <Stack sx={{ width: "100%" }}>
                      {/* Req Course */}
                      <Stack
                        sx={{
                          marginTop: "1.2963vh",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Core Course</Typography>

                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #FF7D0F)" }}
                          >
                            {core_Credit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{core_CreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                      {/* Elective */}
                      <Stack
                        sx={{
                          alignItems: "end",
                          width: "100%",
                          height: "100%",
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
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #FF7D0F)" }}
                          >
                            {major_elecCredit + major_reqCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{major_elecCreditNeed + major_reqCreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack
                    sx={{
                      marginLeft: "3.125vw",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Stack sx={{ marginRight: "0.417vw" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="58"
                        viewBox="0 0 16 68"
                        fill="none"
                      >
                        <path
                          d="M15 21.1489L1 21.1489L1 1.14893"
                          stroke="black"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15 57.1489L1 57.1489L1 21.1489"
                          stroke="black"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Stack>

                    <Stack sx={{ width: "100%" }}>
                      {/* Major Required Coursed */}
                      <Stack
                        sx={{
                          marginTop: "1.2963vh",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography variant="body2">
                          Major Required Course
                        </Typography>

                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #FF7D0F)" }}
                          >
                            {major_reqCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{major_reqCreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                      {/*  */}
                      {/* Major Elective */}
                      <Stack
                        sx={{
                          alignItems: "end",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">Major Elective</Typography>

                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--GE_done, #FF7D0F)" }}
                          >
                            {major_elecCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /{major_elecCreditNeed}
                          </Typography>
                        </Stack>
                      </Stack>
                      {/*  */}
                    </Stack>
                  </Stack>
                  {/*  */}
                </Stack>
                {/* End Specification */}
                {/* Free Elective */}
                <Stack
                  sx={{
                    color: "var(--Free_2_done, #3BBD84)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1">Free Elective</Typography>

                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "var(--GE_done, #3BBD84)" }}
                    >
                      {free_Credit}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "0.9rem",
                        color: "black",
                        opacity: 0.5,
                      }}
                    >
                      /{free_CreditNeed}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Total */}
                <Stack
                  sx={{
                    color: "var(--Primary_1, #EE6457)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "var(--GE_done, #EE6457)" }}
                    >
                      {allgetCredit}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.1rem",
                        color: "black",
                        opacity: 0.5,
                      }}
                    >
                      /{allneedCredit}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              {/* End */}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* End Dashboard */}
    </Stack>
  );
}
export {
  totalGenGet,
  totalGenNeed,
  totalReqGenCredit,
  totalReqGenCreditNeed,
  totalElectiveGenCredit,
  totalElectiveGenCreditNeed,
  totalFreeGet,
  totalFreeNeed,
  totalReqCoreCredit,
  totalReqCoreCreditNeed,
  totalElectiveCore,
  totalElectiveCoreNeed,
  totalMajorReqCredit,
  totalMajorReqCreditNeed,
  totalMajorECredit,
  totalMajorECreditNeed,
  totalCoreGet,
  totalCoreNeed,
  totalMajorGet,
  totalMajorNeed,
  totalSpGet,
  totalSpNeed,
};
export default DashBoard;

// {/* Content */}
// <Stack sx={{ marginBottom: "4.8148vh" }}>
//   {/* Profile */}
//   <Typography sx={{ color: "#F1485B" }}>Profile</Typography>
//   <Stack
//     sx={{
//       width: "48.611vw",
//       height: "14.5508vh",
//       border: "2px solid #F3F3F3;",
//       justifyContent: "center",
//     }}
//   >
//     <Stack
//       sx={{
//         marginLeft: "3.889vw",
//         marginRight: "3.889vw",
//         display: "flex",
//         flexDirection: "column",
//         gap: "0.972vh",
//       }}
//     >
//       <Stack sx={{ display: "flex", flexDirection: "row" }}>
//         <Typography
//           variant="body2"
//           sx={{ color: "#858382", width: "10.417vw", fontSize: "1rem" }}
//         >
//           Name
//         </Typography>
//         <Typography>Natcha Sirakorn</Typography>
//       </Stack>
//       <Stack sx={{ display: "flex", flexDirection: "row" }}>
//         <Typography
//           variant="body2"
//           sx={{ color: "#858382", width: "10.417vw", fontSize: "1rem" }}
//         >
//           CMU Account
//         </Typography>
//         <Typography>natcha_sil@cmu.ac.th</Typography>
//       </Stack>
//       <Stack sx={{ display: "flex", flexDirection: "row" }}>
//         <Typography
//           variant="caption"
//           sx={{ color: "#858382", width: "10.417vw", fontSize: "1rem" }}
//         >
//           Student Id
//         </Typography>
//         <Typography>630610727</Typography>
//       </Stack>
//     </Stack>
//   </Stack>
// </Stack>
// {/* EndContent */}
// {/* Your Nuikit */}
// <Stack>
//   <Typography sx={{ color: "#F1485B" }}>Your Nuikit</Typography>
//   <Stack
//     sx={{
//       width: "48.611vw",
//       height: "51.6667vh",
//       border: "2px solid #F3F3F3",
//     }}
//   >
//     {/* Frame */}
//     <Stack
//       sx={{
//         marginLeft: "6.944vw",
//         marginRight: "6.944vw",
//         display: "flex",
//         flexDirection: "column",
//         gap: "3.1481vh",

//       }}
//     >
//       <Stack sx={{marginTop: '1.7vh'}}>
//         {/* General Section */}
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography>General Education</Typography>
//           <Typography>{sumReqCourse+sumElective}/{reqReqCourse+reqElective}</Typography>
//         </Stack>

//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "end",
//             }}
//           >
//             <Box
//               sx={{
//                 marginLeft: "0.972vw",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="13"
//                 height="30"
//                 viewBox="0 0 13 33"
//                 fill="none"
//               >
//                 <path
//                   d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                   stroke="#282726"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </Box>
//             <Typography sx={{ lineHeight: "1" }}>
//               Required Course
//             </Typography>
//           </Stack>
//           <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//            {sumReqCourse}/{reqReqCourse}
//           </Typography>
//         </Stack>
//         {/*  */}
//         {/*  */}
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "end",
//             }}
//           >
//             <Box
//               sx={{
//                 marginLeft: "0.972vw",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="13"
//                 height="30"
//                 viewBox="0 0 13 33"
//                 fill="none"
//               >
//                 <path
//                   d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                   stroke="#282726"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </Box>
//             <Typography sx={{ lineHeight: "1" }}>Elective</Typography>
//           </Stack>
//           <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//             {sumElective}/{reqElective}
//           </Typography>
//         </Stack>
//       </Stack>
//       {/* Specification Section */}
//       <Stack sx={{}}>
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography>Specification</Typography>
//           <Typography>{sumMajorReqCredit+sumMajorECredit+sumCoreCredit}/{reqMajorReqCredit+reqMajorECredit+reqCoreCredit}</Typography>
//         </Stack>

//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "end",
//             }}
//           >
//             <Box
//               sx={{
//                 marginLeft: "0.972vw",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="13"
//                 height="30"
//                 viewBox="0 0 13 33"
//                 fill="none"
//               >
//                 <path
//                   d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                   stroke="#282726"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </Box>
//             <Typography sx={{ lineHeight: "1" }}>
//               Core Course
//             </Typography>
//           </Stack>
//           <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//             {sumCoreCredit}/{reqCoreCredit}
//           </Typography>
//         </Stack>
//         {/*  */}
//         {/*  */}
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "end",
//             }}
//           >
//             <Box
//               sx={{
//                 marginLeft: "0.972vw",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="13"
//                 height="30"
//                 viewBox="0 0 13 33"
//                 fill="none"
//               >
//                 <path
//                   d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                   stroke="#282726"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </Box>
//             <Typography sx={{ lineHeight: "1" }}>
//               Major Course
//             </Typography>
//           </Stack>
//           <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//             {sumMajorReqCredit+sumMajorECredit}/{reqMajorReqCredit+reqMajorECredit}
//           </Typography>

//           {/*  */}
//         </Stack>
//         {/* Major */}
//         <Stack sx={{ marginLeft: "1.389vw" }}>
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <Stack
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "end",
//               }}
//             >
//               <Box
//                 sx={{
//                   marginLeft: "0.972vw",
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="13"
//                   height="30"
//                   viewBox="0 0 13 33"
//                   fill="none"
//                 >
//                   <path
//                     d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                     stroke="#282726"
//                     stroke-width="1.5"
//                     stroke-linecap="round"
//                   />
//                 </svg>
//               </Box>
//               <Typography sx={{ lineHeight: "1" }}>
//                 Major Require Course
//               </Typography>
//             </Stack>
//             <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//               {sumMajorReqCredit}/{reqMajorReqCredit}
//             </Typography>
//           </Stack>
//           {/*  */}
//           {/*  */}
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <Stack
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "end",
//               }}
//             >
//               <Box
//                 sx={{
//                   marginLeft: "0.972vw",
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="13"
//                   height="30"
//                   viewBox="0 0 13 33"
//                   fill="none"
//                 >
//                   <path
//                     d="M1.4635 1L1.5126 28.3236C1.51356 28.8605 1.88297 29.2703 2.36714 29.2716L11.5766 29.2961"
//                     stroke="#282726"
//                     stroke-width="1.5"
//                     stroke-linecap="round"
//                   />
//                 </svg>
//               </Box>
//               <Typography sx={{ lineHeight: "1" }}>
//                 Major Elective
//               </Typography>
//             </Stack>
//             <Typography sx={{ alignSelf: "end", lineHeight: "1" }}>
//               {sumMajorECredit}/{reqMajorECredit}
//             </Typography>
//           </Stack>
//         </Stack>
//       </Stack>
//       {/* Free */}
//       <Stack
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography>Free</Typography>
//         <Typography>{sumFreeCredit}/{reqFreeCredit}</Typography>
//       </Stack>
//       {/* Total */}
//       <Stack
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography>Total</Typography>
//         <Typography>{totalCredit}/{reqCredit}</Typography>
//       </Stack>
//     </Stack>
//   </Stack>
//   {/* Frame */}
// </Stack>
// {/* End Your Nuikit */}
