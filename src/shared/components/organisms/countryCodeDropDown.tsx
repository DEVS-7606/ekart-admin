import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Typography } from "@/shared/components/atoms/Typography";
import { COUNTRIES } from "@/shared/constants/countryCodes.constant";
import { useState } from "react";
import type { Country } from "@/shared/interfaces";

interface CountryCodeDropDownProps {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  disabled?: boolean;
}

const CountryCodeDropDown = ({
  selectedCountry,
  setSelectedCountry,
  disabled,
}: CountryCodeDropDownProps) => {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.label.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.countryCode.includes(countrySearch)
  );

  const handleCountrySelect = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.countryCode === countryCode);
    if (country) {
      setSelectedCountry(country);
      setShowCountryDropdown(false);
      setCountrySearch("");
    }
  };

  return (
    <div className="relative w-28 shrink-0">
      <Button
        type="button"
        onClick={() => {
          if (disabled) return;
          setShowCountryDropdown(!showCountryDropdown);
        }}
        disabled={disabled}
        className="w-full px-3 border border-input rounded-md bg-background hover:bg-muted flex items-center justify-center gap-2 font-semibold text-foreground transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Typography className="text-lg" component="span">
          {selectedCountry.flag}
        </Typography>
        <Typography className="flex-1 font-medium" component="span">
          {selectedCountry.code}
        </Typography>
        <Typography className="text-sm" component="span">
          {selectedCountry.countryCode}
        </Typography>
      </Button>

      {showCountryDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 border border-border bg-popover rounded-md shadow-lg z-50 max-h-60">
          <Input
            type="text"
            placeholder="Search country..."
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-border focus:outline-none text-sm rounded-t-md bg-background"
          />

          <div className="overflow-y-auto max-h-48">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <Button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.countryCode)}
                  className="w-full bg-popover text-foreground px-3 py-3 text-left hover:bg-accent/40 flex items-center gap-2 border-b border-border last:border-b-0 cursor-pointer transition text-sm"
                >
                  <Typography component="span" className="text-sm">
                    {country.flag}
                  </Typography>
                  <Typography
                    component="span"
                    className="text-sm flex-1 font-medium"
                  >
                    {country.code}
                  </Typography>
                  <Typography
                    component="span"
                    className="text-sm text-muted-foreground font-semibold"
                  >
                    {country.countryCode}
                  </Typography>
                </Button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-muted-foreground text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {showCountryDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCountryDropdown(false)}
        />
      )}
    </div>
  );
};

export default CountryCodeDropDown;
