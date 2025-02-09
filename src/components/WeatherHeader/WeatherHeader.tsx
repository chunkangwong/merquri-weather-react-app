import dayjs from "dayjs";
import { AnimatePresence, motion } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { WeatherResponse } from "@/types";

interface WeatherHeaderProps {
  weatherData?: { datetime: number } & WeatherResponse;
  loading?: boolean;
}

export const WeatherHeader = ({ loading, weatherData }: WeatherHeaderProps) => {
  return (
    <div className="grid grid-cols-12 justify-between w-full relative">
      <div className="flex flex-col gap-1 col-span-3">
        <p className="sm:text-sm md:text-base">Today's Weather</p>
        {loading || !weatherData ? (
          <>
            <MotionSkeleton variant="logo" />
            <MotionSkeleton />
            <MotionSkeleton />
          </>
        ) : (
          <>
            <MotionTypography
              className="sm:text-xl md:text-2xl"
              // sx={{
              //   color: "font.temp",
              // }}
            >
              {weatherData.main.temp}&deg;
            </MotionTypography>
            <MotionTypography>
              H: {weatherData.main.temp_max}&deg; L: {weatherData.main.temp_min}
              &deg;
            </MotionTypography>
            <MotionTypography
              className="font-bold"
              // TODO
              // sx={{
              //   color: "font.info",
              // }}
            >
              {weatherData.name}, {weatherData.sys.country}
            </MotionTypography>
          </>
        )}
      </div>
      <div
        className="flex col-span-9 sm:flex-col-reverse md:flex-row sm:justify-end md:justify-between items-end h-full gap-1"
        // TODO
        // sx={{
        //   color: "font.info",
        // }}
      >
        {loading || !weatherData ? (
          <>
            <MotionSkeleton />
            <MotionSkeleton />
          </>
        ) : (
          <>
            <MotionTypography>
              {dayjs(weatherData.datetime).format("DD-MM-YYYY hh:mmA")}
            </MotionTypography>
            <MotionTypography>
              Humidity: {weatherData.main.humidity}%
            </MotionTypography>
            <MotionTypography>{weatherData.weather?.[0].main}</MotionTypography>
          </>
        )}
      </div>
      <AnimatePresence>
        {weatherData && (
          <motion.img
            src={
              weatherData.weather?.[0].main === "Clouds"
                ? "/cloud.png"
                : "/sun.png"
            }
            alt="Weather Icon"
            className="sm:w-48 md:w-80 max-w-[auto] h-auto absolute sm:-top-1/2 md:-top-3/4 sm:-right-[10%] md:-right-[5%]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface MotionTypographyProps {
  children: React.ReactNode;
  className?: string;
}

const MotionTypography = ({ children, className }: MotionTypographyProps) => {
  return (
    <motion.p
      key="text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("sm:text-sm md:text-base", className)}
    >
      {children}
    </motion.p>
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
      className="w-full"
    >
      <Skeleton className={cn("w-full", variant === "text" ? "h-4" : "h-20")} />
    </motion.div>
  );
};
