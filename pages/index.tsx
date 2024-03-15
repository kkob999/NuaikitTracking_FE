import { Stack, Typography, useMediaQuery, Button, Link } from "@mui/material";
import Image from "next/image";
import img1 from "./View/login.png";
import { theme } from "../constants/theme";

export default function IndexPage() {
  return (
    <Stack direction={"row"} sx={{ width: "100vw", height: "100vh" }}>
      <Stack
        sx={{
          width: "50%",
          height: "100%",
          backgroundColor: "#fdf5f4",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "30vw", height: "30vw" }}>
          <img src={img1.src} />
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "50%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "fit-content" }}>
          <Stack direction={"row"} spacing={1} sx={{}}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                [theme.breakpoints.between("sm", "md")]: {
                  fontSize: "0.98rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.78rem",
                },
              }}
            >
              Welcome To
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#F1485B",
                fontWeight: "bold",
                [theme.breakpoints.between("sm", "md")]: {
                  fontSize: "0.98rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.78rem",
                },
              }}
            >
              Nuaikit Tracking
            </Typography>
          </Stack>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#9B9B9B",
              fontWeight: "bold",
              [theme.breakpoints.between("sm", "md")]: {
                fontSize: "0.98rem",
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.78rem",
              },
            }}
          >
            Login to track your nuaikit
          </Typography>
        </Stack>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#F1485B",
            "&:hover": {
              bgcolor: "#F1485B",
            },
            mt: 3,
            textTransform: "capitalize",
            width: "16vw",
            textAlign: "center",
            [theme.breakpoints.between("sm", "md")]: {
              fontSize: "0.8rem",
              width: "26vw",
            },
            [theme.breakpoints.down("sm")]: {
              width: "40vw",
              fontSize: "0.78rem",
            },
          }}
          href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}
        >
          <Typography
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.68rem",
              },
            }}
          >
            Login with CMU account
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
}
