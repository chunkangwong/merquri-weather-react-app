import { Search, X } from "lucide-react";
import { useState } from "react";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormValues } from "@/types";

interface SearchBarProps {
  onSearch: (formValues: FormValues) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const city = formData.get("city") as string;
    const country = formData.get("country") as string;
    onSearch({ city, country });

    form.reset();
  };

  return (
    <form
      className="flex w-[80%] items-center gap-1 md:w-1/2"
      onSubmit={handleSubmit}
    >
      <SearchBarTextField label="City" name="city" />
      <SearchBarTextField label="Country" name="country" />
      <Tooltip title="Clear">
        <Button
          variant="outline"
          size="icon"
          type="reset"
          className="aspect-square rounded-lg border-none bg-[rgb(108,64,181)] text-white dark:bg-[rgb(40,18,77)]"
        >
          <X />
        </Button>
      </Tooltip>
      <Tooltip title="Search">
        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="aspect-square rounded-lg border-none bg-[rgb(108,64,181)] text-white dark:bg-[rgb(40,18,77)]"
        >
          <Search />
        </Button>
      </Tooltip>
    </form>
  );
};

interface SearchBarTextFieldProps {
  label: string;
  name: string;
}

const SearchBarTextField = ({ label, name }: SearchBarTextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full flex-grow">
      <label
        className={cn(
          "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-500 transition-all",
          (focused || value) && "top-2 text-xs text-gray-500",
        )}
      >
        {label}
      </label>
      <Input
        className={
          "w-full rounded-lg border-none bg-white bg-opacity-20 px-3 pb-2 pt-5 outline-none dark:bg-[rgba(26,26,26,0.5)] md:rounded-2xl"
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={name}
        required
      />
    </div>
  );
};
