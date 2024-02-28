import { Box, Stack, Typography } from "@mui/material";
// import { nodes } from "../../Model/InitialNode";
// import {nodes}
// import "./node.css";

interface node {
  sub_no: string;
  sub_name: string;
  type: string;
  isPass: boolean;
  credit: number;
}

function NuikitViewNode(props: node) {
  const node = props;
  let style = "";
  let color = "";

  if (node.type == "gen") {
    if (node.isPass == true) {
      style = "1px solid #8850EA";
      color = "#8850EA";
    } else {
      style = "1px solid #9F91CE";
      color = "#9F91CE";
    }
  } else if (node.type == "spec") {
    if (node.isPass == true) {
      style = "1px solid #FF7D0F";
      color = "#FF7D0F";
    } else {
      style = "1px solid #FFB271";
      color = "#FFB271";
    }
  } else {
    if (node.isPass == true) {
      style = "1px solid #1976D2";
      color = "#1976D2";
      // style = "1px solid #3BBD84";
      // color = "#3BBD84";
    } else {
      style = "1px solid #77A4ED";
      color = "#77A4ED";
      // style = "1px solid #8EDCBA";
      // color = "#8EDCBA";
    }
  }

  function checkisPass(isPass: boolean) {
    if (isPass == true) {
      return (
        <Stack
          sx={{
            border: "1px solid #34C759",
            borderRadius: "100%",
            width: "1.666vh",
            height: "1.666vh",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#34C759",
          }}

          // sx={{
          //   border: "1px solid" + color,
          //   borderRadius: "100%",
          //   width: "1.666vh",
          //   height: "1.666vh",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   backgroundColor: color,
          // }}
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
    } else if (isPass == false) {
      return (
        <Stack
          sx={{
            border: style,
            borderRadius: "100%",
            width: "1.666vh",
            height: "1.666vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Stack>
      );
    }
  }

  function checkElective(sub_no: string) {
    if (
      sub_no == "Free Elective" ||
      sub_no == "Major Elective" ||
      sub_no == "Elective"
    ) {
      return "14px";
    } else {
      return "10px";
    }
  }

  function checlisClickable(sub_no: string) {
    if (
      sub_no == "Free Elective" ||
      sub_no == "Major Elective" ||
      sub_no == "Learner Person" ||
      sub_no == "Co-Creator" ||
      sub_no == "Elective"
    ) {
      return null;
    } else {
      return (
        <Stack
          sx={{
            justifyItems: "center",
            alignItems: "center",
            minWidth: "24%",
          }}
        >
          {checkisPass(node.isPass)}
        </Stack>
      );
    }
  }

  return (
    <Stack>
      <Box
        sx={{
          width: "6.146vw",
          height: "5.3704vh",
          border: style,
          borderRadius: "0.5rem",
        }}
      >
        <Stack sx={{ height: "100%", justifyContent: "center" }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              justifyItems: "center",
              margin: "0vh 0.6vw 0vh 0.6vw",
              textAlign: "center",
              // bgcolor: "beige",
              // textJustify: 'auto'
            }}
          >
            <Stack sx={{ width: "100%"}}>
              <Typography
                variant="caption"
                sx={{
                  
                  color: color,
                  // fontSize: checkElective(node.sub_no),
                  textAlign: "center",
                  fontSize: "0.9rem",
                  lineHeight: "0.8em",
                  maxHeight: "2em",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  
                }}
              >
                {node.sub_no}
              </Typography>
            </Stack>

            {checlisClickable(node.sub_no)}
          </Stack>
          {/* <Box
          sx={{
            // border: "1px solid #8850EA",
            width: "6.7vw",
            height: "2vh",
            marginInline: "0.5rem",
            overflow: 'scroll',
            marginTop: '0.3vh'
          }}
        >
          <Typography fontSize={12} sx={{color: color}}>{node.sub_name}</Typography>
        </Box> */}
        </Stack>
      </Box>
    </Stack>
  );
}

export default NuikitViewNode;
