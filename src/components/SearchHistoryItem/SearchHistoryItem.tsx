import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Delete, Search } from "lucide-react";
import { motion } from "motion/react";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { type SearchHistoryItemType } from "@/types";

interface SearchHistoryItemProps {
  searchHistoryItem: SearchHistoryItemType;
  onSearch: (formValues: { city: string; country: string }) => void;
  onDelete: (id: number) => void;
}

dayjs.extend(relativeTime);

export const SearchHistoryItem = ({
  searchHistoryItem: { city, country, datetime, id },
  onDelete,
  onSearch,
}: SearchHistoryItemProps) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleSearch = () => {
    onSearch({
      city,
      country,
    });
  };

  return (
    <motion.div
      className="flex w-full items-center gap-1 rounded-md bg-white bg-opacity-40 px-4 py-2 dark:bg-[rgba(26,26,26,0.5)]"
      layout
    >
      <div className="mr-auto flex w-full flex-col items-start gap-1 md:flex-row md:items-center">
        <p className="text-sm md:text-base">
          {city}, {country}
        </p>
        <p className="text-xs text-black dark:text-white dark:text-opacity-50 md:mr-auto md:text-sm">
          {dayjs(datetime).diff(dayjs(), "day") >= 2
            ? dayjs(datetime).format("DD-MM-YYYY hh:mmA")
            : dayjs(datetime).fromNow()}
        </p>
      </div>
      <div className="flex gap-1">
        <Tooltip title="Search">
          <Button
            className="border-2 border-white bg-white dark:border-opacity-40 dark:bg-transparent"
            variant="outline"
            size="icon"
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            className="border-2 border-white bg-white dark:border-opacity-40 dark:bg-transparent"
            variant="outline"
            size="icon"
            onClick={handleDelete}
          >
            <Delete />
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};
