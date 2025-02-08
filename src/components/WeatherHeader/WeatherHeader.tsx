import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { WeatherResponse } from "../../types";

interface WeatherHeaderProps {
  weatherData?: { datetime: number } & WeatherResponse;
  loading?: boolean;
}

export const WeatherHeader = ({ loading, weatherData }: WeatherHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      justifyContent="space-between"
      width="100%"
      columnSpacing={1}
      position="relative"
      sx={{
        "& p": {
          typography: {
            md: "body1",
            xs: "body2",
          },
        },
      }}
    >
      <Grid size={3}>
        <Stack gap={1}>
          <Typography>Today's Weather</Typography>
          {loading || !weatherData ? (
            <>
              <MotionSkeleton variant="logo" />
              <MotionSkeleton variant="text" />
              <MotionSkeleton variant="text" />
            </>
          ) : (
            <>
              <MotionTypography
                variant={isMobile ? "h2" : "h1"}
                sx={{
                  fontWeight: "bold",
                  color: "font.temp",
                }}
              >
                {weatherData.main.temp}&deg;
              </MotionTypography>
              <MotionTypography>
                H: {weatherData.main.temp_max}&deg; L:{" "}
                {weatherData.main.temp_min}
                &deg;
              </MotionTypography>
              <MotionTypography
                sx={{
                  fontWeight: "bold",
                  color: "font.info",
                }}
              >
                {weatherData.name}, {weatherData.sys.country}
              </MotionTypography>
            </>
          )}
        </Stack>
      </Grid>
      <Grid size={9}>
        <Stack
          direction={{
            xs: "column-reverse",
            md: "row",
          }}
          justifyContent={{
            xs: "end",
            md: "space-between",
          }}
          alignItems="end"
          height="100%"
          gap={1}
          sx={{
            color: "font.info",
          }}
        >
          {loading || !weatherData ? (
            <>
              <MotionSkeleton variant="text" />
              <MotionSkeleton variant="text" />
            </>
          ) : (
            <>
              <MotionTypography>
                {dayjs(weatherData.datetime).format("DD-MM-YYYY hh:mmA")}
              </MotionTypography>
              <MotionTypography>
                Humidity: {weatherData.main.humidity}%
              </MotionTypography>
              <MotionTypography>
                {weatherData.weather?.[0].main}
              </MotionTypography>
            </>
          )}
        </Stack>
      </Grid>
      {weatherData && (
        <img
          src={
            weatherData.weather?.[0].main === "Clouds"
              ? "/cloud.png"
              : "/sun.png"
          }
          alt="Weather Icon"
          style={{
            width: "300px",
            height: "auto",
            position: "absolute",
            top: "-150px",
            right: "-30px",
            maxWidth: "auto",
          }}
        />
      )}
    </Grid>
  );
};

const MotionTypography = (props: TypographyProps) => {
  return (
    <motion.div
      key="text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography {...props}>{props.children}</Typography>
    </motion.div>
  );
};

interface MotionSkeletonProps {
  variant?: "text" | "logo";
}

const MotionSkeleton = ({ variant = "text" }: MotionSkeletonProps) => {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{
        width: "100%",
      }}
    >
      <Skeleton
        variant="text"
        sx={{
          fontSize: variant === "logo" ? "6rem" : undefined,
        }}
        width="100%"
      />
    </motion.div>
  );
};
