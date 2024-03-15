import { Stack, Typography } from "@mui/material";
import { theme } from "../../constants/theme";

let halfline = "184.77vh";

const NumberToString = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
  "Ninth",
  "Tenth",
  "Eleventh",
  "Twelfth",
];

export const NormalTerm = (
  stdYear: number,
  height: string,
  halfline: string,
  credit1: number,
  credit2: number
) => {
  var year: any = stdYear;
  if (stdYear <= 12) {
    year = NumberToString[stdYear - 1];
  }

  return (
    <Stack
      direction={"column"}
      sx={{
        height: height, //dynamic 136.77vh 190.77vh
        width: "18.438vw",
        border: "1px solid #9B9B9B",
        marginTop: "0.9259vh",
        borderRadius: "0.5rem",
        [theme.breakpoints.between("sm", "md")]: {
          width: "32vw",
          // bgcolor: 'khaki'
        },
        [theme.breakpoints.only("md")]: {
          width: "19.938vw",
        },
        [theme.breakpoints.between(600, 900)]: {
          width: "200px",
        },
        pb: 4,
      }}
    >
      <Stack>
        <Typography
          sx={{
            textAlign: "center",
            color: "#EE6457",
            [theme.breakpoints.up(2000)]: {
              fontSize: "1.2em",
            },
          }}
        >
          {year} year
        </Typography>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          {/* 1st sem */}
          <Stack
            sx={{
              width: "50%",
              height: halfline, //dynamic 132.77
              borderRight: "0.5px solid #9B9B9B",
              alignItems: "center",
              opacity: 0.25,
            }}
          >
            <Typography
              sx={{
                [theme.breakpoints.up(2000)]: {
                  fontSize: "1.2em",
                },
              }}
            >
              1st sem
            </Typography>
          </Stack>

          {/* 2nd sem */}
          <Stack
            sx={{
              width: "50%",
              height: halfline, //dynamic
              borderLeft: "0.5px solid #9B9B9B",
              alignItems: "center",
              opacity: 0.25,
            }}
          >
            <Typography
              sx={{
                [theme.breakpoints.up(2000)]: {
                  fontSize: "1.2em",
                },
              }}
            >
              2nd sem
            </Typography>
          </Stack>
          {/* End 2nd sem */}
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          position: "relative",
          mt: 0.5,
          pb: 2,
          [theme.breakpoints.up(2000)]: {
            mt: 3,
          },
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ width: "50%", justifyContent: "center" }}
        >
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            {credit1}
          </Typography>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            credits
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ width: "50%", justifyContent: "center" }}
        >
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            {credit2}
          </Typography>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            credits
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const summerTerm = (
  stdYear: number,
  height: string,
  halfline: string,
  credit1: number,
  credit2: number,
  creditSummer: number
) => {
  var year: any = stdYear;
  if (stdYear <= 12) {
    year = NumberToString[stdYear - 1];
  }

  return (
    <Stack
      sx={{
        height: height, //dynamic 136.77vh 190.77vh
        width: "27.657vw",
        border: "1px solid #9B9B9B",
        marginTop: "0.9259vh",
        borderRadius: "0.5rem",
        [theme.breakpoints.between("sm", "md")]: {
          width: "36.3vw",
        },
        [theme.breakpoints.only("md")]: {
          width: "29.61vw",
        },
        [theme.breakpoints.between(600, 900)]: {
          width: "300px",
        },
        // bgcolor: "beige",
        pb: 4,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "#EE6457",
          [theme.breakpoints.up(2000)]: {
            fontSize: "1.2em",
          },
        }}
      >
        {year} year
      </Typography>
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        {/* 1st sem */}
        <Stack
          sx={{
            width: "9.219vw",
            height: halfline, //dynamic 132.77
            borderRight: "0.5px solid #9B9B9B",
            alignItems: "center",
            [theme.breakpoints.between("sm", "md")]: {
              width: "12.1vw",
            },
            [theme.breakpoints.only("md")]: {
              width: "9.87vw",
            },
            [theme.breakpoints.between(600, 800)]: {
              width: "100px",
            },
            opacity: 0.25,
          }}
        >
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
              [theme.breakpoints.between("sm", "lg")]: {
                fontSize: "0.98em",
              },
            }}
          >
            1st sem
          </Typography>
        </Stack>

        {/* 2nd sem */}
        <Stack
          sx={{
            width: "9.219vw",
            height: halfline, //dynamic
            borderLeft: "0.5px solid #9B9B9B",
            borderRight: "0.5px solid #9B9B9B",
            alignItems: "center",
            [theme.breakpoints.between("sm", "md")]: {
              width: "12.1vw",
            },
            [theme.breakpoints.only("md")]: {
              width: "9.87vw",
            },
            [theme.breakpoints.between(600, 800)]: {
              width: "100px",
            },
            opacity: 0.25,
          }}
        >
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
              [theme.breakpoints.between("sm", "lg")]: {
                fontSize: "0.98em",
              },
            }}
          >
            2nd sem
          </Typography>
        </Stack>
        {/* End 2nd sem */}

        {/* summer sem */}
        <Stack
          sx={{
            width: "9.219vw",
            height: halfline, //dynamic
            borderLeft: "0.5px solid #9B9B9B",
            alignItems: "center",
            [theme.breakpoints.between("sm", "md")]: {
              width: "12.1vw",
            },
            [theme.breakpoints.only("md")]: {
              width: "9.87vw",
            },
            [theme.breakpoints.between(600, 800)]: {
              width: "100px",
            },
            opacity: 0.25,
          }}
        >
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
              [theme.breakpoints.between("sm", "lg")]: {
                fontSize: "0.88em",
              },
            }}
          >
            summer sem
          </Typography>
        </Stack>
        {/* End summer sem */}
      </Stack>
      {/* credit */}
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          justifyContent: "space-around",
          position: "relative",
          mt: 0.5,
          pb: 2,
          [theme.breakpoints.up(2000)]: {
            mt: 3,
          },
        }}
      >
        <Stack direction={"row"} spacing={1} sx={{}}>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            {credit1}
          </Typography>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            credits
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} sx={{}}>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            {credit2}
          </Typography>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            credits
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} sx={{}}>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            {creditSummer}
          </Typography>
          <Typography
            sx={{
              [theme.breakpoints.up(2000)]: {
                fontSize: "1.2em",
              },
            }}
          >
            credits
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

// export const fouryear = () => {
//   return (
//     <Stack direction={"row"} spacing={"1.875vw"}>
//       {summerTerm(1)}
//       {NormalTerm(2)}
//       {NormalTerm(3)}
//       {NormalTerm(4)}
//     </Stack>
//   );
// };
