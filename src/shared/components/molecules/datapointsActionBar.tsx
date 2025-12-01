import Button from "@/shared/components/atoms/button";
import type { DatapointsActionBarProps } from "@/shared/interfaces";
import ButtonWithIcon from "./buttonWithIcon";

const DatapointsActionBar = ({
  actionsEnabled,
  hasSelectedRows,
  onDeleteSelected,
  onOpenAttachDatapoint,
  onOpenCreateDatapoint,
}: DatapointsActionBarProps) => {
  return (
    <div className="module-header-buttons">
      <Button
        size="sm"
        variant="outline"
        className="border-border text-foreground"
        disabled={!actionsEnabled}
        onClick={onOpenAttachDatapoint}
      >
        Attach Datapoint
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-destructive text-destructive"
        disabled={!actionsEnabled || !hasSelectedRows}
        onClick={onDeleteSelected}
      >
        Delete Datapoints
      </Button>
      <ButtonWithIcon
        size="sm"
        disabled={!actionsEnabled}
        onClick={onOpenCreateDatapoint}
        iconName="plus"
        label="Create Datapoint"
      />
    </div>
  );
};

export default DatapointsActionBar;
