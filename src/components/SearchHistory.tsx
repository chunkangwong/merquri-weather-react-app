import { useSearchHistoryStore } from "../store/searchHistoryStore";
import { FormValues } from "../types";
import { SearchHistoryList } from "./SearchHistoryList/SearchHistoryList";

interface SearchHistoryProps {
  onSearch: (formValues: FormValues) => void;
}

export const SearchHistory = ({ onSearch }: SearchHistoryProps) => {
  const searchHistoryItems = useSearchHistoryStore(
    (state) => state.searchHistoryItems,
  );
  const deleteAll = useSearchHistoryStore((state) => state.deleteAll);
  const deleteItem = useSearchHistoryStore((state) => state.deleteItem);

  return (
    <SearchHistoryList
      searchHistoryItems={searchHistoryItems}
      onDelete={deleteItem}
      onDeleteAll={deleteAll}
      onSearch={onSearch}
    />
  );
};
