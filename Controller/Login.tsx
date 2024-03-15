import axios, { AxiosError } from "axios";
import React from "react";

type AccountType = "StdAcc" | "AlumAcc" | "MISEmpAcc";

type CmuOAuthBasicInfo = {
  cmuitaccount_name: string;
  cmuitaccount: string;
  student_id?: string;
  prename_id?: string;
  prename_TH?: string;
  prename_EN?: string;
  firstname_TH: string;
  firstname_EN: string;
  lastname_TH: string;
  lastname_EN: string;
  organization_code: string;
  organization_name_TH: string;
  organization_name_EN: string;
  itaccounttype_id: AccountType;
  itaccounttype_TH: string;
  itaccounttype_EN: string;
};

type SuccessResponse = {
  ok: true;
};

type ErrorResponse = {
  ok: false;
  message: string;
};

type SignInResponse = SuccessResponse | ErrorResponse;

export async function getOAuthAccessTokenAsync(
  authorizationCode: string
): Promise<string | null> {
  try {
    console.log("getAccessToken");
    const response = await axios.post(
      process.env.REACT_APP_CMU_OAUTH_GET_TOKEN_URL as string,
      {},
      {
        params: {
          code: authorizationCode,
          redirect_uri: process.env.REACT_APP_CMU_OAUTH_REDIRECT_URL,
          client_id: process.env.REACT_APP_CMU_OAUTH_CLIENT_ID,
          client_secret: process.env.REACT_APP_CMU_OAUTH_CLIENT_SECRET,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // console.log(response);
    return response.data.access_token;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getCMUBasicInfoAsync(accessToken: string) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_CMU_OAUTH_GET_BASIC_INFO as string,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    return response.data as CmuOAuthBasicInfo;
  } catch (err) {
    return null;
  }
}

