import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import { cn } from "@/lib/utils";
import React from "react";
import type { ContactDisplayProps } from "../../interfaces";

const ContactDisplay: React.FC<ContactDisplayProps> = ({
  contact,
  onChangeClick,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          value={contact}
          disabled
          type="text"
          className="text-foreground border-input"
        />
        <Button
          type="button"
          variant={"outline"}
          className="text-primary text-sm font-medium hover:underline"
          onClick={onChangeClick}
        >
          Change
        </Button>
      </div>
      {contact ? (
        <p className="text-sm text-muted-foreground">
          Enter the one-time password sent to {contact}.
        </p>
      ) : null}
    </div>
  );
};

export default ContactDisplay;
