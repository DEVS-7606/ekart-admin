import ButtonWithIcon from "../molecules/buttonWithIcon";
import CompanyImageWithTitle from "../molecules/companyImageWithTitle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/atoms/popover";
import Button from "@/shared/components/atoms/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const renderSettingButton = () => {
    return (
      <ButtonWithIcon
        iconName="setting"
        iconClassName="text-muted-foreground"
        width="6"
        height="6"
        label={<span className="hidden md:inline">Settings</span>}
        aria-label="Settings"
        iconPosition="left"
        variant="ghost"
        className="hover:bg-accent"
      />
    );
  };

  const renderUserButton = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <ButtonWithIcon
            iconName="user"
            iconClassName="text-muted-foreground"
            iconPosition="left"
            variant="ghost"
            width="6"
            height="6"
            className="cursor-pointer w-10 h-10 hover:bg-accent rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40 p-2">
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => navigate("/login")}
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-10">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <CompanyImageWithTitle title="Ekart" titleClassName="hidden sm:block" />

        <div className="flex items-center md:gap-6 justify-self-end">
          {renderSettingButton()}
          {renderUserButton()}
        </div>
      </div>
    </header>
  );
};

export default Header;
