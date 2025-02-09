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
      <div className="flex flex-col items-center min-h-[100vh] py-2 bg-cover bg-center bg-scroll bg-no-repeat  bg-[url(bg-light.png)] dark:bg-[url(bg-dark.png)]">
        <SearchBar onSearch={handleSearch} />
        <div
          className="flex flex-col items-center justify-center sm:w-1/2 md:w-[80%] p-4 mt-14 sm:rounded-md md:rounded-lg border-1 border-solid"
          // sx={{
          //   backgroundColor: "bg.panel",
          //   borderColor: "border.panel",
          // }}
        >
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
