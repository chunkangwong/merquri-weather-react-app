import { useEffect } from "react";

import { SearchBar } from "./components/SearchBar/SearchBar";
import { SearchHistory } from "./components/SearchHistory";
import { ThemeProvider } from "./components/ThemeProvider";
import { WeatherHeader } from "./components/WeatherHeader/WeatherHeader";
import { useQueryWeather } from "./hooks/useQueryWeather";
import { useSearchHistoryStore } from "./store/searchHistoryStore";
import { FormValues } from "./types";

function App() {
  const addItem = useSearchHistoryStore((state) => state.addItem);

  const queryWeather = useQueryWeather();

  // Initial render effect to run the last search
  useEffect(() => {
    const items = useSearchHistoryStore.getState().searchHistoryItems;
    if (items.length === 0) return;
    const firstItem = items[0];
    queryWeather.mutateAsync(firstItem);
  }, []);

  const handleSearch = async (formValues: FormValues) => {
    try {
      const weatherData = await queryWeather.mutateAsync(formValues);
      addItem({
        city: weatherData.name,
        country: weatherData.sys.country,
        datetime: weatherData.datetime,
        id: weatherData.datetime,
      });
    } catch (error) {
      if ((error as Error).message === "Invalid location") {
        window.alert("Invalid location. Please try another city & country.");
      } else {
        window.alert("Unexpected error. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-[100vh] flex-col items-center bg-[url(bg-light.png)] bg-cover bg-scroll bg-center bg-no-repeat py-2 dark:bg-[url(bg-dark.png)]">
        <SearchBar onSearch={handleSearch} />
        <div className="mt-14 flex w-[80%] flex-col items-center justify-center rounded-md border border-solid border-white border-opacity-50 bg-white bg-opacity-20 p-4 dark:border-opacity-40 dark:bg-[rgba(26,26,26,0.3)] md:w-1/2 md:rounded-lg">
          <WeatherHeader
            loading={queryWeather.isPending}
            weatherData={queryWeather.data}
          />
          <SearchHistory onSearch={handleSearch} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
