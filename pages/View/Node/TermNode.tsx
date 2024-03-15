import { Box, Stack, Typography, Breakpoint } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { memo } from "react";
import { Handle, Position, Node, NodeProps } from "reactflow";
import { theme } from "../../../constants/theme";
import {
  free_notpass,
  free_pass,
  ge_notpass,
  ge_pass,
  majorCore_notpass,
  majorCore_pass,
  major_notpass,
  major_pass,
} from "../../../constants/color";

type NodeData = {
  sub_no: string;
  pre: number;
  category: string;
  credit: number;
  is_pass: boolean;
};

type CustomNode = Node<NodeData>;

export default function TermNode({
  data,
  isConnectable,
  xPos,
  yPos,
}: NodeProps<NodeData>) {
  var st = { opacity: 0, top: "1rem", left: "0.1vw" };
  if (data.sub_no == "261218") {
    st = { opacity: 0, top: "1.8rem", left: "0.1vw" };
  }
  var textSize = "body2";
  var color = "#7C4DFF";
  if (data.category == "gen") {
    if (!data.is_pass) {
      color = ge_notpass;
    } else {
      color = ge_pass;
    }
  } else if (data.category == "sp_core") {
    if (!data.is_pass) {
      color = majorCore_notpass;
    } else {
      color = majorCore_pass;
    }
  } else if (data.category == "sp_major") {
    if (!data.is_pass) {
      color = major_notpass;
    } else {
      color = major_pass;
    }
  } else {
    if (!data.is_pass) {
      color = free_notpass;
    } else {
      color = free_pass;
    }
  }

  function checkSubNo(sub_no: string) {
    if (
      sub_no == "Elective" ||
      data.sub_no == "Co-Creator" ||
      data.sub_no == "Major Elective" ||
      data.sub_no == "Learner Person" ||
      data.sub_no == "Free"
    ) {
      return (
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.7em",
            [theme.breakpoints.up("xl")]: {
              fontSize: "0.9em",
            },
            [theme.breakpoints.between("sm", "lg")]: {
              fontSize: "0.54em",
            },
          }}
        >
          {data.sub_no}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.9em",
            [theme.breakpoints.up("xl")]: {
              fontSize: "1.1em",
            },
            [theme.breakpoints.only("lg")]: {
              fontSize: "0.8em",
            },
            [theme.breakpoints.between(1200, 1439)]: {
              fontSize: "0.78em",
            },
            [theme.breakpoints.between("sm", "md")]: {
              fontSize: "0.68em",
            },
            [theme.breakpoints.only("md")]: {
              fontSize: "0.64em",
            },
          }}
        >
          {data.sub_no}
        </Typography>
      );
    }
  }

  function checkisPass(isPass: boolean) {
    if (isPass) {
      // console.log(window.innerWidth);
      return (
        <CheckCircleIcon
          sx={{
            color: "#34C759",
            [theme.breakpoints.up(2000)]: {
              height: "1.2em",
              width: "1.2em",
            },
            [theme.breakpoints.only("lg")]: {
              height: "0.7em",
              width: "0.7em",
            },
            [theme.breakpoints.between(1200, 1439)]: {
              height: "0.78em",
              width: "0.78em",
            },
            [theme.breakpoints.between("sm", "md")]: {
              height: "0.68em",
              width: "0.68em",
            },
            [theme.breakpoints.only("md")]: {
              height: "0.56em",
              width: "0.56em",
            },
          }}
        />
        // <Stack
        //   sx={{
        //     border: "1px solid #34C759",
        //     borderRadius: "100%",
        //     height: "0.9rem",
        //     width: "0.9rem",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundColor: "#34C759",

        //     [theme.breakpoints.up(2000)]: {
        //       height: "1.2em",
        //       width: "1.2em",
        //     },
        //     [theme.breakpoints.between(1200, 1439)]: {
        //       height: "0.78em",
        //       width: "0.78em",
        //     },
        //     [theme.breakpoints.between("sm", "md")]: {
        //       height: "0.68em",
        //       width: "0.68em",
        //     },
        //     [theme.breakpoints.only("md")]: {
        //       height: "0.7em",
        //       width: "0.7em",
        //     },
        //   }}
        // >
        //   <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       width="8"
        //       height="8"
        //       viewBox="0 0 12 10"
        //       fill="none"
        //     >
        //       <path
        //         d="M11 0.830078L4.125 8.69448L1 5.11975"
        //         stroke="white"
        //         stroke-width="2"
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //       />
        //     </svg>
        // </Stack>
      );
    } else {
      return (
        <RadioButtonUncheckedIcon
          sx={{
            color: color,
            [theme.breakpoints.up(2000)]: {
              height: "1.2em",
              width: "1.2em",
            },
            [theme.breakpoints.only("lg")]: {
              height: "0.7em",
              width: "0.7em",
            },
            [theme.breakpoints.between(1200, 1439)]: {
              height: "0.78em",
              width: "0.78em",
            },
            [theme.breakpoints.between("sm", "md")]: {
              height: "0.68em",
              width: "0.68em",
            },
            [theme.breakpoints.only("md")]: {
              height: "0.56em",
              width: "0.56em",
            },
          }}
        />
        // <Box
        //   sx={{
        //     height: "0.9rem",
        //     width: "0.9rem",
        //     border: "1px solid" + color,
        //     borderRadius: "100%",
        //     [theme.breakpoints.up("xl")]: {
        //       height: "1em",
        //       width: "1em",
        //     },
        //     [theme.breakpoints.between(1200, 1439)]: {
        //       height: "0.78em",
        //       width: "0.78em",
        //     },
        //     [theme.breakpoints.between("sm", "md")]: {
        //       height: "0.68em",
        //       width: "0.68em",
        //     },
        //     [theme.breakpoints.only("md")]: {
        //       height: "0.7em",
        //       width: "0.7em",
        //     },
        //   }}
        // ></Box>
      );
    }
  }

  let x = (window.innerWidth * 1.8) / 1440;
  if (window.innerWidth > 600 && window.innerWidth < 1000) {
    x = (window.innerWidth * 1.8) / 800;
  }
  // console.log(data.sub_no + ' has x position in ' + xPos)

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="a"
        style={{ opacity: 0, left: "0.1vw" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="b"
        style={{ opacity: 0, left: "0.1vw", top: x + "rem" }}
      />
      <Stack
        sx={{
          width: "6.146vw",
          height: "5.3704vh",
          padding: "1vh 0",
          border: "1.5px solid" + color,
          borderRadius: "0.5rem",
          cursor: "pointer",
          [theme.breakpoints.up("xl")]: {
            border: "2.5px solid" + color,
            // bgcolor: 'gainsboro'
          },
          [theme.breakpoints.only("lg")]: {
            width: "6.146vw",
            height: "5.3704vh",
            // bgcolor: "gainsboro",
          },
          [theme.breakpoints.between("sm", "md")]: {
            height: "40px",
            width: "70px",
            // bgcolor: "lavender",
          },
          [theme.breakpoints.only("md")]: {
            // height: "22px",
            width: "6.646vw",
            // bgcolor: 'pink',
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
            {checkSubNo(data.sub_no)}
          </Stack>
          {checkisPass(data.is_pass)}
        </Stack>
      </Stack>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ opacity: 0, right: "0.1vw" }}
      />
    </>
  );
}
