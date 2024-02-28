import React from "react";
import { Stack, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getOAuthAccessTokenAsync, getCMUBasicInfoAsync } from "../Controller/Login";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import { Message } from "@mui/icons-material";

type SignInResponse = SuccessResponse | ErrorResponse;

type SuccessResponse = {
    ok: true;
  };
  
  type ErrorResponse = {
    ok: false;
    message: string;
  };

  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  async function Authen(authorizationCode:string) {
    
    const accessToken = await getOAuthAccessTokenAsync(authorizationCode);

    if(accessToken !== null){
      console.log(accessToken)
      const cmuBasicInfo = await getCMUBasicInfoAsync(accessToken);
      console.log(cmuBasicInfo)
    }else{
      console.log("Cannot get OAuth access token")
    }

    

  }

export default function CMUOAuthCallback() {
  let query = useQuery();
  
  // const router = useRouter();
  const code = query.get("code")
  const [message, setMessage] = useState("");
  console.log(query.get("code"))

  useEffect(() => {
    

    if (typeof code === "string"){
      Authen(code)
      axios
      .post<SignInResponse>("/api/signIn", { authorizationCode: code })
      .then((resp) => {
        if (resp.data.ok) {
          // router.push("/me");
          console.log("ok")
        }
      })
      .catch((error: AxiosError<SignInResponse>) => {
        if (!error.response) {
          setMessage(
            "Cannot connect to CMU OAuth Server. Please try again later."
          );
        } else if (!error.response.data.ok) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Unknown error occurred. Please try again later.");
        }
      });
    } 

    

  }, [code]);

  return (
    <Stack>
      <Typography>Redirecting...</Typography>
    </Stack>
  );
}
