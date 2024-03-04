import React, { useState, useEffect, useRef } from "react";
import { Filter } from "@mui/icons-material";
import {
  Stack,
  Button,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { free_pass, ge_pass, majorCore_pass } from "../../constants/color";
import { theme } from "../../constants/theme";

export default function isSelected(selected: boolean) {
  if (selected) return "#EE6457";
  else return "#9B9B9B";
}

export function TogglePlan() {
  return (
    <ToggleButtonGroup
      // value={}
      exclusive
      // onChange={handleAlignment}
      aria-label="text alignment"
      sx={{ mt: "1vh", mb: "1vh" }}
    >
      <ToggleButton value="normal" sx={{ width: "50%", textTransform: "none" }}>
        Normal Plan
      </ToggleButton>
      <ToggleButton value="coop" sx={{ width: "50%", textTransform: "none" }}>
        Cooperative Plan
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export const displayGE = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Stack
        sx={{
          width: "0.8vw",
          height: "0.8vw",
          bgcolor: ge_pass,
          mr: 1,
          borderRadius: 100,
        }}
      ></Stack>
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#EE6457",
          [theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          },
        }}
      >
        General Education
      </Typography>
    </Stack>
  );
};

export const displaySp = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Stack
        sx={{
          width: "0.8vw",
          height: "0.8vw",
          bgcolor: majorCore_pass,
          mr: 1,
          borderRadius: 100,
        }}
      ></Stack>
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457",[theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Specification
      </Typography>
    </Stack>
  );
};

export const displayFree = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Stack
        sx={{
          width: "0.8vw",
          height: "0.8vw",
          bgcolor: free_pass,
          mr: 1,
          borderRadius: 100,
        }}
      ></Stack>
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457", [theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Free Elective
      </Typography>
    </Stack>
  );
};

export const displayNormalPlan = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457",[theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Normal Plan
      </Typography>
    </Stack>
  );
};

export const displayCoopPlan = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457",[theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Cooperative Plan
      </Typography>
    </Stack>
  );
};

export const displayPlan = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        
      }}
    ></Stack>
  );
};

export const displayDone = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457",[theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Doned Course
      </Typography>
    </Stack>
  );
};

export const displayPre = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: "white",
        pt: 0.5,
        pb: 0.5,
        pr: 1.4,
        pl: 1.4,
        alignItems: "center",
        borderRadius: 5,
        border: "1px solid #EE6457",
        maxHeight: "4.2vh",
        [theme.breakpoints.down("lg")]: {
          maxHeight: "3.4vh",
        },
        [theme.breakpoints.between("sm", "md")]: {
          maxHeight: "4vh",
        },
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", color: "#EE6457",[theme.breakpoints.down("lg")]: {
            fontSize: "0.86rem",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "0.7rem",
          }, }}>
        Prerequisite Course
      </Typography>
    </Stack>
  );
};
