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
    <div className="relative grid w-full grid-cols-12 justify-between gap-x-1">
      <div className="col-span-3 flex flex-col gap-1">
        <p className="text-sm md:text-base">Today's Weather</p>
        {loading || !weatherData ? (
          <>
            <MotionSkeleton variant="logo" />
            <MotionSkeleton />
            <MotionSkeleton />
          </>
        ) : (
          <>
            <MotionTypography className="text-7xl text-[rgb(108,64,181)] dark:text-white md:text-9xl">
              {weatherData.main.temp}&deg;
            </MotionTypography>
            <MotionTypography>
              H: {weatherData.main.temp_max}&deg; L: {weatherData.main.temp_min}
              &deg;
            </MotionTypography>
            <MotionTypography className="font-bold text-[rgb(102,102,102)] dark:text-white">
              {weatherData.name}, {weatherData.sys.country}
            </MotionTypography>
          </>
        )}
      </div>
      <div className="col-span-9 flex h-full flex-col-reverse items-end justify-start gap-1 text-[rgb(102,102,102)] dark:text-white md:flex-row md:justify-between">
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
            className="absolute -top-[75px] right-0 h-auto w-[150px] max-w-[auto] md:-top-[80px] md:w-[200px]"
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
      className={cn("text-sm md:text-base", className)}
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
