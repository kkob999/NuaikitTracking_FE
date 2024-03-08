import {
  Box,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  CircularProgressProps,
  circularProgressClasses,
  useMediaQuery,
  Button,
} from "@mui/material";
import * as React from "react";
import jsonData from "../Model/NodeDB.json";
import Navbar from "./View/Navbar";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "./api/whoAmI";
import { theme } from "../constants/theme";
import {
  free_pass,
  ge_pass,
  majorCore_pass,
  major_pass,
} from "../constants/color";
import { warningIcon, warningModal } from "./View/NodeModal";

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

  var [allgetCredit, setAllGetCredit] = React.useState<number>(0);
  var [allgetCreditCal, setAllGetCreditCal] = React.useState<number>(0);
  var [allneedCredit, setAllNeedCredit] = React.useState<number>(0);

  var [major_reqCredit, setmajorReqCredit] = React.useState<number>(0);
  var [major_reqCreditNeed, setmajorReqCreditNeed] = React.useState<number>(0);
  var [major_elecCredit, setmajorElecCredit] = React.useState<number>(0);
  var [major_elecCreditCal, setmajorElecCreditCal] = React.useState<number>(0);
  var [major_elecCreditNeed, setmajorElecCreditNeed] =
    React.useState<number>(0);
  var [majorPercent, setMajorPercent] = React.useState<number>(0);

  var [core_Credit, setcoreCredit] = React.useState<number>(0);
  var [core_CreditNeed, setcoreCreditNeed] = React.useState<number>(0);
  var [corePercent, setCorePercent] = React.useState<number>(0);

  var [free_Credit, setfreeCredit] = React.useState<number>(0);
  var [free_CreditCal, setfreeCreditCal] = React.useState<number>(0);
  var [free_CreditNeed, setfreeCreditNeed] = React.useState<number>(0);
  var [freePercent, setFreePercent] = React.useState<number>(0);

  var [gen_reqCredit, setgenReqCredit] = React.useState<number>(0);
  var [gen_reqCreditNeed, setgenReqCreditNeed] = React.useState<number>(0);
  var [gen_elecCredit, setgenElecCredit] = React.useState<number>(0);
  var [gen_elecCreditCal, setgenElecCreditCal] = React.useState<number>(0);
  var [gen_elecCreditNeed, setgenElecCreditNeed] = React.useState<number>(0);
  var [gePercent, setGEPercent] = React.useState<number>(0);

  var [clock, setClock] = React.useState<number>(0);

  const [warning, setWarning] = useState(true);

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

  async function FetchDashBoard(url: string) {
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

  async function DatchBoardData(url: string) {
    const resp: any = await FetchDashBoard(url);
    // console.log(resp["coreCategory"]);
    // console.log(resp);

    setAllGetCredit(resp["summaryCredit"]);
    setAllNeedCredit(resp["requiredCredits"]);

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

    setfreeCreditCal(free_Credit);
    if (free_Credit > free_CreditNeed) {
      setfreeCreditCal(free_CreditNeed);
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

    setgenElecCreditCal(free_Credit);
    if (gen_elecCredit > gen_elecCreditNeed) {
      setgenElecCreditCal(gen_elecCreditNeed);
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

    setmajorElecCreditCal(major_elecCredit);
    if (major_elecCredit > major_elecCreditNeed) {
      setmajorElecCreditCal(major_elecCreditNeed);
    }
    // console.log('.')
    // setClock(CircularWithValueLabel(allgetCredit,allneedCredit))

    setAllGetCreditCal(
      core_Credit +
        +gen_reqCredit +
        gen_elecCreditCal +
        free_CreditCal +
        major_elecCreditCal +
        major_reqCredit
    );
  }

  // React.useEffect(() => {
  //   DatchBoardData();
  // });

  const bp = useMediaQuery(theme.breakpoints.down("lg"));

  // var url =
  //   "http://localhost:8080/summaryCredits?year=2563&curriculumProgram=CPE&isCOOP=false&studentId=630610768";

  var stdId = "";
  async function cmuOauth() {
    await axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          setFullName(response.data.firstName + " " + response.data.lastName);
          setCmuAccount(response.data.cmuAccount);
          setStudentId(response.data.studentId ?? "No Student Id");
          stdId = response.data.studentId ?? "No Student Id";
          console.log(studentId);
          console.log("orgCode");
          console.log(response.data.orgCode);
          console.log(response.data.orgNameEN);
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
    var url =
      "http://localhost:8080/summaryCredits?year=2563&curriculumProgram=CPE&isCOOP=true"+
      // +"&studentId=" + stdId;
      "&mockData=mockData13"
      // "630610727"
    console.log(url);
    DatchBoardData(url);
  }
  React.useEffect(() => {
    fetchStdData();
  });

  React.useEffect(() => {

    if ((gen_reqCredit + gen_elecCredit) > (gen_reqCreditNeed + gen_elecCreditNeed)) {
      setGEPercent(100)
    }else{
      setGEPercent(
        Math.floor(
          ((gen_reqCredit + gen_elecCredit) * 100) /
            (gen_reqCreditNeed + gen_elecCreditNeed)
        )
      );
    }

    

    setCorePercent(Math.floor((core_Credit * 100) / core_CreditNeed));

    setMajorPercent(
      Math.floor(
        ((major_reqCredit + major_elecCreditCal) * 100) /
          (major_reqCreditNeed + major_elecCreditNeed)
      )
    );

    setFreePercent(Math.floor((free_CreditCal * 100) / free_CreditNeed));
    setAllGetCreditCal(
      core_Credit +
        +gen_reqCredit +
        gen_elecCreditCal +
        free_CreditCal +
        major_elecCreditCal +
        major_reqCredit
    );

    if (allgetCredit > allneedCredit ) {
      setClock(100)
    }else{
      setClock(Math.floor((allgetCredit * 100) / allneedCredit));
    }
    
  }, [
    gen_reqCredit,
    gen_elecCreditCal,
    gen_reqCreditNeed,
    gen_elecCreditNeed,
    core_Credit,
    core_CreditNeed,
    major_reqCredit,
    major_elecCreditCal,
    major_reqCreditNeed,
    major_elecCreditNeed,
    free_CreditCal,
    free_CreditNeed,
    allgetCreditCal,
    allneedCredit,
  ]);

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
      {errorMessage === "" && <Navbar />}
      {/* Navbar */}

      {/* Dashboard */}

      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        margin={{ xs: "16px", sm: "16px", lg: "48px" }}
        height={{ xs: "", sm: "", lg: "100vh" }}
        flexDirection={{ xs: "column", sm: "column", lg: "row" }}
        gap={{ xs: "16px", sm: "16px", lg: "48px" }}
        marginTop={{ xs: "20px", sm: "20px", lg: "0px" }}
      >
        <Stack
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          width={{ xs: "80%", sm: "80%", lg: "45%" }}
        >
          {/* Total Nuikit */}
          <Stack width={{ xs: "100%", sm: "100%", lg: "100%" }}>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <Typography variant="h6">Total Nuaikit</Typography>
              {warningIcon(setWarning)}
            </Stack>

            <Stack
              sx={{
                border: "2px solid var(--Grey_2, #C2C2C2)",
                borderRadius: "1.25rem",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              {warning && warningModal(setWarning)}
              <Stack
                sx={{
                  display: "flex",
                  margin: "16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
                flexDirection={"row"}
              >
                {/* Total Nuikit */}
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                  width={"50%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    position="relative"
                    display="inline-block"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CircularProgress
                        style={{ color: "#f5f5f5" }}
                        size={180}
                        variant="determinate"
                        value={100}
                      />
                    </Box>
                    <CircularProgress
                      sx={{
                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: "round",
                        },
                        color: "#F1485B",
                      }}
                      size={180}
                      variant="determinate"
                      value={clock ? (clock < 100 ? clock : 100) : 0}
                    />
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection={"column"}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="textSecondary"
                      >
                        Total
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        color="textSecondary"
                      >
                        {clock ? clock : 0} %
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                {/* Total Nuikit */}

                {/* แยก */}
                <Stack
                  flexDirection={"column"}
                  gap={"16px"}
                  width={"50%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Stack flexDirection={"row"} gap="20px">
                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                      width={"100px"}
                    >
                      <Typography variant="body2" marginBottom={"5px"}>
                        GE
                      </Typography>

                      <Box
                        position="relative"
                        display="inline-block"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <CircularProgress
                            style={{ color: "#f5f5f5" }}
                            size={90}
                            variant="determinate"
                            value={100}
                          />
                        </Box>
                        <CircularProgress
                          sx={{
                            [`& .${circularProgressClasses.circle}`]: {
                              strokeLinecap: "round",
                            },
                            color: ge_pass,
                          }}
                          size={90}
                          variant="determinate"
                          value={
                            gePercent ? (gePercent < 100 ? gePercent : 100) : 0
                          }
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                          >
                            {gePercent ? gePercent : 0} %
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                      width={"100px"}
                    >
                      <Typography variant="body2" marginBottom={"5px"}>
                        Core
                      </Typography>

                      <Box
                        position="relative"
                        display="inline-block"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <CircularProgress
                            style={{ color: "#f5f5f5" }}
                            size={90}
                            variant="determinate"
                            value={100}
                          />
                        </Box>
                        <CircularProgress
                          sx={{
                            [`& .${circularProgressClasses.circle}`]: {
                              strokeLinecap: "round",
                            },
                            color: majorCore_pass,
                          }}
                          size={90}
                          variant="determinate"
                          value={
                            corePercent
                              ? corePercent < 100
                                ? corePercent
                                : 100
                              : 0
                          }
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                          >
                            {corePercent ? corePercent : 0} %
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack flexDirection={"row"} gap="20px">
                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                      width={"100px"}
                    >
                      <Typography variant="body2" marginBottom={"5px"}>
                        Major
                      </Typography>

                      <Box
                        position="relative"
                        display="inline-block"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <CircularProgress
                            style={{ color: "#f5f5f5" }}
                            size={90}
                            variant="determinate"
                            value={100}
                          />
                        </Box>
                        <CircularProgress
                          sx={{
                            [`& .${circularProgressClasses.circle}`]: {
                              strokeLinecap: "round",
                            },
                            color: major_pass,
                          }}
                          size={90}
                          variant="determinate"
                          value={
                            majorPercent
                              ? majorPercent < 100
                                ? majorPercent
                                : 100
                              : 0
                          }
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                          >
                            {majorPercent ? majorPercent : 0} %
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                      width={"100px"}
                    >
                      <Typography variant="body2" marginBottom={"5px"}>
                        Free Elective
                      </Typography>

                      <Box
                        position="relative"
                        display="inline-block"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <CircularProgress
                            style={{ color: "#f5f5f5" }}
                            size={90}
                            variant="determinate"
                            value={100}
                          />
                        </Box>
                        <CircularProgress
                          sx={{
                            [`& .${circularProgressClasses.circle}`]: {
                              strokeLinecap: "round",
                            },
                            color: free_pass,
                          }}
                          size={90}
                          variant="determinate"
                          value={
                            freePercent
                              ? freePercent < 100
                                ? freePercent
                                : 100
                              : 0
                          }
                        />
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          position="absolute"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                          >
                            {freePercent ? freePercent : 0} %
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
                {/* แยก */}
              </Stack>
            </Stack>

            {/* End Total Nuikit */}

            {!bp && (
              <>
                <Stack
                  width={{ xs: "100%", sm: "100%", lg: "100%" }}
                  height={"24px"}
                ></Stack>
                <Stack width={{ xs: "100%", sm: "100%", lg: "100%" }}>
                  <Typography variant="h6" marginBottom={"4px"}>
                    Profile
                  </Typography>
                  <Stack
                    sx={{
                      padding: "16px",
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
                        width: "100%",
                      }}
                    >
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ width: "6.771vw" }}
                        >
                          Name
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ marginLeft: "0" }}
                        >
                          {fullName}
                        </Typography>
                      </Stack>
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ width: "6.771vw" }}
                        >
                          Email
                        </Typography>
                        <Typography variant="subtitle2">
                          {cmuAccount}
                        </Typography>
                      </Stack>
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ width: "6.771vw" }}
                        >
                          Student code
                        </Typography>
                        <Typography variant="subtitle2">{studentId}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>

        {/* Your Nuikit */}
        <Stack
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          width={{ xs: "80%", sm: "80%", lg: "45%" }}
        >
          <Stack
            sx={{
              width: "100%",
            }}
            height={{ lg: "520px" }}
          >
            <Typography variant="h6">Your Nuaikit</Typography>
            {/* frame */}
            <Stack
              sx={{
                height: "100%",
                width: "100%",
                border: "2px solid var(--Grey_2, #C2C2C2)",
                borderRadius: "1.25rem",
                justifyContent: "center",
                paddingX: "24px",
              }}
            >
              {/* Start */}
              <Stack
                sx={{
                  margin: "20px",
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
                    <Typography variant="subtitle1" sx={{ color: ge_pass }}>
                      General Education
                    </Typography>

                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
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
                        }}
                      >
                        /
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: "0.8rem",
                          color: "black",
                          opacity: 0.5,
                        }}
                      >
                        {gen_reqCreditNeed + gen_elecCreditNeed}
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
                          <Typography variant="body2" sx={{ color: ge_pass }}>
                            {gen_reqCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            {gen_reqCreditNeed}
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
                          <Typography variant="body2" sx={{ color: ge_pass }}>
                            {gen_elecCredit}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            /
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.8rem",
                              color: "black",
                              opacity: 0.5,
                            }}
                          >
                            {gen_elecCreditNeed}
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
                      sx={{ color: majorCore_pass }}
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
                        sx={{ color: majorCore_pass }}
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
                            sx={{ color: majorCore_pass }}
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
                            sx={{ color: major_pass }}
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
                            sx={{ color: major_pass }}
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
                            sx={{ color: major_pass }}
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
                    color: free_pass,
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
                    <Typography variant="subtitle1" sx={{ color: free_pass }}>
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

        {bp && (
          <Stack width={"80%"}>
            <Typography variant="h6">Profile</Typography>
            <Stack
              sx={{
                padding: "16px",
                width: "100%",
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
                  <Typography variant="subtitle2" sx={{ width: "80px" }}>
                    Name
                  </Typography>
                  <Typography variant="subtitle2" sx={{ marginLeft: "0" }}>
                    {fullName}
                  </Typography>
                </Stack>
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ width: "80px" }}>
                    Email
                  </Typography>
                  <Typography variant="subtitle2">{cmuAccount}</Typography>
                </Stack>
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography variant="subtitle2" sx={{ width: "80px" }}>
                    Student code
                  </Typography>
                  <Typography variant="subtitle2">{studentId}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
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
