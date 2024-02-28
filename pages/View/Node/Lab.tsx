import { Box, Stack, Typography, Theme, Breakpoint } from "@mui/material";
import React, { memo } from "react";
import { Handle, Position, Node, NodeProps } from "reactflow";

import { theme } from "../../../constants/theme";

type NodeData = {
  sub_no: string;
  pre: number;
  category: string;
  credit: number;
  is_pass: boolean;
};

type CustomNode = Node<NodeData>;

export default function Lab({ data, isConnectable }: NodeProps<NodeData>) {
  var st = { opacity: 0, top: "1rem" };
  if (data.sub_no == "261218") {
    st = { opacity: 0, top: "1.8rem" };
  }
  var color = "#7C4DFF";
  if (data.category == "gen") {
    color = "#7C4DFF";
  } else if (data.category == "sp") {
    color = "#FF7D0F";
  } else {
    color = "#1976D2";
  }
  function checkisPass(isPass: boolean) {
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
            [theme.breakpoints.between(1200,1439)]: {
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
        <Box
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
            [theme.breakpoints.between(1200,1439)]: {
              height: "0.78em",
              width: "0.78em",
            },
          }}
        ></Box>
      );
    }
  }
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, marginTop: "0.72vh" }}
      />
      <Stack
        sx={{
          width: "6.146vw",
          height: "5.3704vh",
          border: "1.5px solid" + color,
          padding: "1vh 0",
          borderRadius: "0.5rem",
          [theme.breakpoints.between("sm","md")]: {
            height: "16px",
            width: "9.146vw",
            // bgcolor: 'lavender',
          },
          [theme.breakpoints.only("md")]: {
            height: "22px",
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
          <Typography
            variant="body2"
            sx={{
              width: "50%",
              [theme.breakpoints.between("sm", "md")]: {
                fontSize: "0.68em",
              },
              [theme.breakpoints.only("md")]: {
                fontSize: "0.7em",
              },
              [theme.breakpoints.between(1200,1439)]: {
                fontSize: "0.78em",
              },
            }}
          >
            {data.sub_no}
          </Typography>
          {checkisPass(data.is_pass)}
          {/* <Box
            sx={{
              height: "1rem",
              width: "1rem",
              border: "1px solid black",
              borderRadius: "100%",
            }}
          ></Box> */}
        </Stack>
      </Stack>
    </>
  );
}
