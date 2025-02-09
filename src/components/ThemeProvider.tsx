import { Moon } from "lucide-react";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { toggle } = useDarkMode();

  return (
    <div className="flex items-center min-h-[100vh] py-2 bg-cover bg-center bg-scroll bg-no-repeat  bg-[url(bg-light.png)] dark:bg-[url(bg-dark.png)]">
      {children}
      <Tooltip title="Dark">
        <Button
          className="fixed bottom-20 right-20 text-white"
          variant="outline"
          size="icon"
          onClick={toggle}
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
    </div>
  );
};
