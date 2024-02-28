import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "./api/whoAmI";
import { Box, CircularProgress, CircularProgressProps, Stack, Typography, circularProgressClasses } from "@mui/material";
import Navbar from "./View/Navbar";


export default function MePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  

  function signOut() {
    //Call sign out api without caring what is the result
    //It will fail only in case of client cannot connect to server
    //This is left as an exercise for you. Good luck.
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }



  return (
    <Stack>
      <Navbar/>
    </Stack>
    



  );
}
