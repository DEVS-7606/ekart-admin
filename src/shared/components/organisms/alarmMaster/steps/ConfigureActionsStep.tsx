import { useState } from "react";
import { Typography } from "@/shared/components/atoms/Typography";
import Button from "@/shared/components/atoms/button";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import { Pencil, Trash2 } from "lucide-react";

type ActionTypeId = "email" | "custom" | "webhook" | "command";

type AlarmAction = {
  id: number;
  type: ActionTypeId;
};

const ACTION_TYPES: { id: ActionTypeId; label: string; description: string }[] =
  [
    {
      id: "email",
      label: "Email Notification",
      description:
        "Send an email notification to selected recipients when the alarm triggers.",
    },
    {
      id: "custom",
      label: "Custom Function",
      description:
        "Invoke a custom function in your application when the alarm is generated.",
    },
    {
      id: "webhook",
      label: "Webhook",
      description: "Call an external HTTP endpoint with alarm details.",
    },
    {
      id: "command",
      label: "Execute Command",
      description: "Run a predefined command or script in your environment.",
    },
  ];

const ConfigureActionsStep = () => {
  const [actions, setActions] = useState<AlarmAction[]>([]);
  const [isAddActionOpen, setIsAddActionOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleAddAction = (type: ActionTypeId) => {
    setActions((previous) => [
      ...previous,
      {
        id: Date.now(),
        type,
      },
    ]);
    setIsAddActionOpen(false);
  };

  const handleDeleteAction = (id: number) => {
    setActions((previous) => previous.filter((action) => action.id !== id));
  };

  const openDeleteDialog = (id: number) => {
    setPendingDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((previous) => !previous);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      handleDeleteAction(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const getActionMeta = (type: ActionTypeId) =>
    ACTION_TYPES.find((actionType) => actionType.id === type) ??
    ACTION_TYPES[0];

  const actionPendingDelete =
    pendingDeleteId !== null
      ? actions.find((action) => action.id === pendingDeleteId)
      : undefined;

  return (
    <>
      <div className="space-y-6">
        <Typography
          component="p"
          variant="sm"
          className="text-muted-foreground"
        >
          Configure the action to be performed when the alarm is generated.
        </Typography>

        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Typography
              component="h3"
              variant="sm"
              className="text-foreground"
              weight="semiBold"
            >
              Configure Actions
            </Typography>

            <PopoverWrapper
              trigger={
                <ButtonWithIcon
                  size="sm"
                  variant="outline"
                  iconName="plus"
                  label="Add Action"
                  className="border-primary text-primary hover:bg-accent/40"
                />
              }
              align="start"
              side="bottom"
              contentClassName="p-2 space-y-1"
              open={isAddActionOpen}
              onOpenChange={setIsAddActionOpen}
            >
              {ACTION_TYPES.map((actionType) => (
                <button
                  key={actionType.id}
                  type="button"
                  className="flex w-full flex-col rounded-md px-3 py-2 text-left text-sm hover:bg-muted/80"
                  onClick={() => handleAddAction(actionType.id)}
                >
                  <span className="font-medium text-foreground">
                    {actionType.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {actionType.description}
                  </span>
                </button>
              ))}
            </PopoverWrapper>
          </div>

          {actions.length === 0 ? (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-10">
              <Typography
                component="p"
                variant="sm"
                className="text-muted-foreground"
              >
                No actions configured yet. Use "Add Action" to define what
                should happen when this alarm triggers.
              </Typography>
            </div>
          ) : (
            <div className="space-y-3">
              {actions.map((action) => {
                const meta = getActionMeta(action.type);
                return (
                  <div
                    key={action.id}
                    className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted p-4"
                  >
                    <div className="space-y-1">
                      <Typography
                        component="h4"
                        variant="sm"
                        className="text-foreground"
                        weight="semiBold"
                      >
                        {meta.label}
                      </Typography>
                      <Typography
                        component="p"
                        variant="xs"
                        className="text-muted-foreground"
                      >
                        {meta.description}
                      </Typography>
                      <Typography
                        component="p"
                        variant="xs"
                        className="text-muted-foreground"
                      >
                        Action details configuration will be added in a later
                        iteration.
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-primary"
                        type="button"
                        aria-label="Edit action"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive"
                        type="button"
                        aria-label="Delete action"
                        onClick={() => openDeleteDialog(action.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <GenericDialog
        open={isDeleteDialogOpen}
        onOpenChange={toggleDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Action"
        description="Are you sure you want to delete this "
        highlightText={
          actionPendingDelete
            ? getActionMeta(actionPendingDelete.type).label
            : undefined
        }
      />
    </>
  );
};

export default ConfigureActionsStep;
