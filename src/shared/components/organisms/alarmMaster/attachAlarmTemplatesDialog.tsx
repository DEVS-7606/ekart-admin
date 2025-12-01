import { useMemo } from "react";
import { Typography } from "@/shared/components/atoms/Typography";
import type { ColumnDef } from "@tanstack/react-table";
import { TagFilteredAttachDialog } from "@/shared/components/organisms/tagFilteredAttachDialog";
import type { AlarmRow } from "@/shared/types/alarmMaster";
import { MOCK_ALARM_TEMPLATES } from "@/shared/constants/alarmTemplate.constant";
import { MOCK_TAGS } from "@/shared/constants/tagsMaster.constant";

interface AttachAlarmTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttach: (templates: AlarmRow[]) => void;
}

const AttachAlarmTemplatesDialog = ({
  open,
  onOpenChange,
  onAttach,
}: AttachAlarmTemplatesDialogProps) => {
  const columns = useMemo<ColumnDef<AlarmRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-left">Name</div>,
        cell: ({ row }) => (
          <Typography component="p" className="text-sm text-foreground">
            {row.original.name}
          </Typography>
        ),
      },
      {
        accessorKey: "text",
        header: () => <div className="text-left">Text</div>,
        cell: ({ row }) => (
          <Typography component="p" className="text-sm text-foreground">
            {row.original.text}
          </Typography>
        ),
      },
    ],
    []
  );

  return (
    <TagFilteredAttachDialog<AlarmRow>
      open={open}
      onOpenChange={onOpenChange}
      onAttach={onAttach}
      title="Attach Alarm Templates"
      items={MOCK_ALARM_TEMPLATES}
      columns={columns}
      tagOptions={MOCK_TAGS}
      tagFilterPlaceholder="Search and filter alarm templates by attached tags"
      attachButtonLabel="Attach Selected Templates"
    />
  );
};

export default AttachAlarmTemplatesDialog;
