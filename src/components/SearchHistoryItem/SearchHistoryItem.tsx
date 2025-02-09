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

// TODO
// const iconButtonStyle: SxProps<Theme> = {
//   backgroundColor: "bg.itemIconButton",
//   borderColor: "border.itemIconButton",
// };

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
      className="flex w-full items-center gap-1 px-2 py-1 rounded-md"
      // TODO
      // sx={{
      //   backgroundColor: "bg.item",
      // }}
      layout
    >
      <div className="flex w-full sm:flex-col md:flex-row mr-auto">
        <p className="sm:text-sm md:text-base">
          {city}, {country}
        </p>
        <p
          className="sm:text-sm md:text-base md:mr-auto"
          // TODO
          // sx={{
          //   color: "font.itemInfo",
          // }}
        >
          {dayjs(datetime).diff(dayjs(), "day") >= 2
            ? dayjs(datetime).format("DD-MM-YYYY hh:mmA")
            : dayjs(datetime).fromNow()}
        </p>
      </div>
      <div className="flex gap-1">
        <Tooltip title="Search">
          <Button
            className="border-2"
            variant="outline"
            size="icon"
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            className="border-2"
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
