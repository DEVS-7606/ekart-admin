import { useEffect, useRef, useState } from "react";
import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";

interface SearchAutocompleteProps {
  items: string[];
  onSelect: (item: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  emptyMessage?: string;
}

const SearchAutocomplete = ({
  items,
  onSelect,
  placeholder,
  className,
  value,
  emptyMessage = "No results found",
}: SearchAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const query = value !== undefined ? value : inputValue;

  const q = query.trim().toLowerCase();
  const filteredItems =
    q.length <= 3
      ? []
      : items.filter((option) => option.toLowerCase().includes(q));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onInputChange = (val: string) => {
    setInputValue(val);
    const canOpen = val.trim().length > 3;
    setIsOpen(canOpen);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    setInputValue("");
    setIsOpen(false);
  };

  const renderInput = () => {
    return (
      <Input
        type="text"
        placeholder={placeholder ?? `Search (min ${3 + 1} chars)`}
        value={query}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={() => {
          if (query.trim().length > 3) setIsOpen(true);
        }}
        className="w-full px-3 border border-input rounded-md bg-background focus:outline-none"
      />
    );
  };

  const renderDropdown = () => {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 border border-border bg-popover rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <Typography
            component="p"
            className="text-sm text-muted-foreground py-2 text-center"
          >
            {emptyMessage}
          </Typography>
        ) : (
          <div className="py-1">
            {filteredItems.map((item, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full bg-popover text-foreground px-3 py-2 text-left hover:bg-accent/40 flex items-center gap-2 border-b border-border last:border-b-0 cursor-pointer transition text-sm"
              >
                <Typography component="span" className="text-sm">
                  {item}
                </Typography>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      {renderInput()}
      {isOpen && renderDropdown()}
    </div>
  );
};
export default SearchAutocomplete;
