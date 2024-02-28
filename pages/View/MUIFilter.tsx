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
      sx={{ mt: '1vh', mb: '1vh' }}
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
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Stack sx={{width: '0.8vw', height: '0.8vw', bgcolor: '#7C4DFF', mr: 1, borderRadius: 100}}></Stack>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>General Education</Typography>
    </Stack>
  );
}

export const displaySp = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Stack sx={{width: '0.8vw', height: '0.8vw', bgcolor: '#FF7D0F', mr: 1, borderRadius: 100}}></Stack>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Specification</Typography>
    </Stack>
  );
}

export const displayFree = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Stack sx={{width: '0.8vw', height: '0.8vw', bgcolor: '#1976D2', mr: 1, borderRadius: 100}}></Stack>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Free Elective</Typography>
    </Stack>
  );
}

export const displayNormalPlan = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Normal Plan</Typography>
    </Stack>
  );
}

export const displayCoopPlan = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Cooperative Plan</Typography>
    </Stack>
  );
}

export const displayPlan = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>

    </Stack>
  );
}

export const displayDone = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Doned Course</Typography>
    </Stack>
  );
}

export const displayPre = () => {
  return(
    <Stack direction={"row"} sx={{bgcolor: 'white', pt: 0.5, pb: 0.5, pr: 1.4, pl: 1.4, alignItems: 'center', borderRadius: 5, border: '1px solid #EE6457'}}>
      <Typography sx={{fontSize: '0.9rem', color: '#EE6457'}}>Prerequisite Course</Typography>
    </Stack>
  );
}