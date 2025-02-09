import { Moon } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem(storageKey, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
      <Tooltip title="Dark">
        <Button
          className="fixed bottom-20 right-20 text-white"
          variant="outline"
          size="icon"
          onClick={handleToggle}
          // TODO
          // sx={{
          //   backgroundColor: "bg.themeToggleButton",
          //   "&:hover": {
          //     backgroundColor: "rgba(255,255,255,0.08)",
          //   },
          // }}
        >
          <Moon />
        </Button>
      </Tooltip>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
