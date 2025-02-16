import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { SearchHistoryItemType } from "@/types";

type BearStore = {
  searchHistoryItems: SearchHistoryItemType[];
  addItem: (item: SearchHistoryItemType) => void;
  deleteAll: () => void;
  deleteItem: (id: number) => void;
};

export const useSearchHistoryStore = create<BearStore>()(
  persist(
    (set, get) => ({
      searchHistoryItems: [],
      addItem: (item) => {
        const historyItems = get().searchHistoryItems;
        historyItems.unshift(item);
        set({ searchHistoryItems: historyItems });
      },
      deleteAll: () =>
        set({
          searchHistoryItems: [],
        }),
      deleteItem: (id) =>
        set({
          searchHistoryItems: get().searchHistoryItems.filter(
            (item) => item.id !== id,
          ),
        }),
    }),
    {
      name: "weather-search-history", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
