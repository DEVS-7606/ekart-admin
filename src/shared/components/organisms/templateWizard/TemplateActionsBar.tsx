import Button from "@/shared/components/atoms/button";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import type { ReactNode } from "react";

interface TemplateActionsBarProps {
  createButtonLabel: string;
  filterButtonLabel?: string;
  onCreateTemplate?: () => void;
  hasSelectedRows?: boolean;
  onDeleteSelected?: () => void;
  onAttachTemplates?: () => void;
  filterComponent?: ReactNode;
  isFilterApplied?: boolean;
}

const TemplateActionsBar = ({
  createButtonLabel,
  filterButtonLabel,
  onCreateTemplate,
  hasSelectedRows,
  onDeleteSelected,
  onAttachTemplates,
  filterComponent,
  isFilterApplied,
}: TemplateActionsBarProps) => {
  return (
    <div className="module-header-buttons">
      {filterComponent ? (
        <div className="relative inline-flex">
          {isFilterApplied && (
            <span className="absolute -top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
          )}
          {filterComponent}
        </div>
      ) : (
        filterButtonLabel && (
          <ButtonWithIcon
            type="button"
            variant="outline"
            iconName="filter"
            label={filterButtonLabel}
          />
        )
      )}
      {onAttachTemplates && (
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="border-border text-foreground"
          onClick={onAttachTemplates}
        >
          Attach Alarm Templates
        </Button>
      )}
      {onDeleteSelected && (
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="border-destructive text-destructive"
          disabled={!hasSelectedRows}
          onClick={onDeleteSelected}
        >
          Delete Templates
        </Button>
      )}
      <ButtonWithIcon
        label={createButtonLabel}
        iconName="plus"
        size="sm"
        onClick={onCreateTemplate}
      />
    </div>
  );
};

export default TemplateActionsBar;
