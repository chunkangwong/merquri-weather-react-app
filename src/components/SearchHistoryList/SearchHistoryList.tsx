import { ListX } from "lucide-react";

import { SearchHistoryItem } from "@/components/SearchHistoryItem/SearchHistoryItem";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { type SearchHistoryItemType } from "@/types";

interface SearchHistoryListProps {
  searchHistoryItems: SearchHistoryItemType[];
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
  onSearch: (formValues: { city: string; country: string }) => void;
}

export const SearchHistoryList = ({
  searchHistoryItems,
  onDelete,
  onDeleteAll,
  onSearch,
}: SearchHistoryListProps) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-md p-2 w-full mt-2"
      // sx={{
      //   backgroundColor: "bg.panel",
      // }}
    >
      <div className="flex justify-between items-center">
        <p>Search History</p>
        <Tooltip title="Delete All">
          <Button variant="outline" size="icon" onClick={onDeleteAll}>
            <ListX />
          </Button>
        </Tooltip>
      </div>
      {searchHistoryItems.map((searchHistoryItem) => (
        <SearchHistoryItem
          key={searchHistoryItem.id}
          searchHistoryItem={searchHistoryItem}
          onDelete={onDelete}
          onSearch={onSearch}
        />
      ))}
    </div>
  );
};
