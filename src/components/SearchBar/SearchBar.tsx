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
      className="flex gap-1 items-center xs:w-[80%] md:w-1/2"
      onSubmit={handleSubmit}
    >
      <SearchBarTextField label="City" name="city" />
      <SearchBarTextField label="Country" name="country" />
      <Tooltip title="Clear">
        <Button
          variant="outline"
          size="icon"
          type="reset"
          className="aspect-square"
        >
          <X />
        </Button>
      </Tooltip>
      <Tooltip title="Search">
        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="aspect-square"
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
          "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base transition-all pointer-events-none",
          (focused || value) && "top-2 text-xs text-gray-700"
        )}
      >
        {label}
      </label>
      <Input
        className={cn(
          "w-full bg-gray-100 pt-5 pb-2 px-3 rounded-md border-none outline-none",
          "focus:ring-0 focus:border-b-2 focus:border-blue-500"
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={name}
      />
    </div>
  );
};
