import Badge from "@/shared/components/atoms/badge";
import { Typography } from "@/shared/components/atoms/Typography";
import type { ColumnDef } from "@tanstack/react-table";
import type { AlarmRow } from "@/shared/types/alarmMaster";
import type {
  TemplateTableConfig,
  TemplateHeaderConfig,
  TemplateDeleteDialogConfig,
} from "@/shared/types/templateWizard";

/**
 * Function to generate alarm-specific table columns (default with Text column)
 */
export const getAlarmTableColumns = (): ColumnDef<AlarmRow>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium text-foreground">
        {row.original.name}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "text",
    header: () => <div className="text-center">Text</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.text}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "level",
    header: () => <div className="text-center">Level</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className="rounded-full border-border bg-muted text-foreground px-3 py-1 text-xs"
        >
          {row.original.level}
        </Badge>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "tags",
    header: () => <div className="text-center">Attached Labels</div>,
    cell: ({ row }) => (
      <div className="flex flex-wrap justify-center gap-2">
        {row.original.tags.map((tag) => (
          <Badge
            key={`${row.original.srNo}-${tag.label}-${tag.value}`}
            variant="outline"
            className="rounded-full border-border bg-muted text-muted-foreground px-3 py-1 text-xs"
          >
            <Typography
              component="span"
              weight="semiBold"
              className="text-foreground"
              variant="xs"
            >
              {tag.label}:
            </Typography>
            <Typography variant="xs" component="span" className="ml-1">
              {tag.value}
            </Typography>
          </Badge>
        ))}
      </div>
    ),
    enableSorting: false,
  },
];

/**
 * Function to generate alarm table columns with Active Status instead of Text
 * Used in embedded contexts like Machine Master and Device Master
 */
export const getAlarmTableColumnsWithStatus = (): ColumnDef<AlarmRow>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium text-foreground">
        {row.original.name}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Active Status</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.isActive ? "Active" : "Inactive"}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "level",
    header: () => <div className="text-center">Level</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className="rounded-full border-border bg-muted text-foreground px-3 py-1 text-xs"
        >
          {row.original.level}
        </Badge>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "tags",
    header: () => <div className="text-center">Attached Labels</div>,
    cell: ({ row }) => (
      <div className="flex flex-wrap justify-center gap-4">
        {row.original.tags.map((tag) => (
          <Badge
            key={`${row.original.srNo}-${tag.label}-${tag.value}`}
            variant="outline"
            className="rounded-full border-border bg-muted text-muted-foreground px-3 py-1 text-xs"
          >
            <Typography
              component="span"
              weight="semiBold"
              className="text-foreground"
              variant="xs"
            >
              {tag.label}:
            </Typography>
            <Typography variant="xs" component="span" className="ml-1">
              {tag.value}
            </Typography>
          </Badge>
        ))}
      </div>
    ),
    enableSorting: false,
  },
];

/**
 * Table configuration for alarm templates (default with Text column)
 */
export const alarmTableConfig: TemplateTableConfig<AlarmRow> = {
  columns: getAlarmTableColumns,
  enableSorting: true,
  enablePagination: true,
  visiblePages: 5,
  pageSizes: [5, 10, 20],
  defaultPageSize: 5,
};

/**
 * Table configuration for alarm templates with Active Status column
 * Used in embedded contexts like Machine Master and Device Master
 */
export const alarmTableConfigWithStatus: TemplateTableConfig<AlarmRow> = {
  columns: getAlarmTableColumnsWithStatus,
  enableSorting: true,
  enablePagination: true,
  visiblePages: 5,
  pageSizes: [5, 10, 20],
  defaultPageSize: 5,
};

/**
 * Header configuration for alarm templates section
 */
export const alarmHeaderConfig: TemplateHeaderConfig = {
  title: "Alarm Templates",
  createButtonLabel: "Create Alarm Template",
  filterButtonLabel: "Filters",
};

/**
 * Delete dialog configuration for alarm templates
 */
export const alarmDeleteDialogConfig: TemplateDeleteDialogConfig = {
  title: "Delete Alarm Template",
  displayField: "name",
};
