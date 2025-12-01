import { useMemo } from "react";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import { DataTable } from "@/shared/components/organisms/dataTable";
import { EditableCell } from "@/shared/components/organisms/editableCell";
import type { ColumnDef } from "@tanstack/react-table";
import type { LanguageLabelRow } from "../../types";
import type { LanguageLabelsProps } from "../../interfaces";
import { toast } from "sonner";

const useLanguageLabelColumns = (
  onChangeLabelTag: (id: number, labelTag: string) => void
) =>
  useMemo<ColumnDef<LanguageLabelRow>[]>(
    () => [
      {
        accessorKey: "labelName",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Language Label
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.labelName}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "labelKey",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Label Key
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.labelKey}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "labelTag",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Label Tag
          </Typography>
        ),
        cell: ({ row }) => (
          <EditableCell
            value={row.original.labelTag}
            onChange={(newValue) => onChangeLabelTag(row.original.id, newValue)}
          />
        ),
        enableSorting: false,
      },
    ],
    [onChangeLabelTag]
  );

const LanguageLabels = ({ labels, onChangeLabelTag }: LanguageLabelsProps) => {
  const columns = useLanguageLabelColumns(onChangeLabelTag);

  const renderButtons = () => {
    return (
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <ButtonWithIcon
            iconName="upload"
            label="Export"
            variant="outline"
            width="4"
            height="4"
            onClick={() => {
              toast.success("Exported successfully");
            }}
          />
          <ButtonWithIcon
            iconName="download"
            iconPosition="right"
            label="Import"
            variant="outline"
            width="4"
            height="4"
            onClick={() => {
              toast.success("Imported successfully");
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {renderButtons()}
      <DataTable<LanguageLabelRow> data={labels} columns={columns} />
    </div>
  );
};

export default LanguageLabels;
