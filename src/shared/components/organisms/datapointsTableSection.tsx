import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography } from "@/shared/components/atoms/Typography";
import Button from "@/shared/components/atoms/button";
import { DataTable } from "@/shared/components/organisms/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { DATA_POINT_DATA_TYPES } from "@/shared/types";
import { MOCK_UNITS } from "@/shared/constants/unitMaster.constant";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import { toast } from "sonner";
import { EditableCell } from "@/shared/components/organisms/editableCell";
import { MOCK_DATAPOINTS } from "@/shared/constants/patchDatapoints.constant";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import CreateDatapointSheet, {
  type CreateDatapointFormValues,
} from "@/shared/components/organisms/createDatapointSheet";
import { TagFilteredAttachDialog } from "@/shared/components/organisms/tagFilteredAttachDialog";
import { MOCK_DATA_POINT_TEMPLATES } from "@/shared/constants/dataPointMaster.constant";
import { MOCK_TAGS } from "@/shared/constants/tagsMaster.constant";
import type {
  DatapointRow,
  DatapointsTableSectionProps,
} from "@/shared/interfaces";
import DatapointsActionBar from "@/shared/components/molecules/datapointsActionBar";
import type { IDataPointTemplateRow } from "@/pages/data-point-master/types";
import type { ITag, TagValue } from "@/pages/tags-master/type/tagMaster";

const POLLING_TIME_OPTIONS = [
  { label: "1s", value: "1s" },
  { label: "3s", value: "3s" },
  { label: "5s", value: "5s" },
  { label: "On Change", value: "onchange" },
];

const DatapointsTableSection = ({
  open,
  datapoints,
  onDatapointsChange,
  actionsEnabled,
}: DatapointsTableSectionProps) => {
  const [rows, setRows] = useState<DatapointRow[]>(
    () => datapoints ?? MOCK_DATAPOINTS
  );
  const [selectedRows, setSelectedRows] = useState<DatapointRow[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDatapointOpen, setCreateDatapointOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<DatapointRow | null>(null);
  const [attachDialogOpen, setAttachDialogOpen] = useState(false);

  useEffect(() => {
    if (datapoints) {
      setRows(datapoints);
    }
  }, [datapoints]);

  useEffect(() => {
    if (!open) {
      setSelectedRows([]);
      setDeleteDialogOpen(false);
      setCreateDatapointOpen(false);
      setEditingRow(null);
      setAttachDialogOpen(false);
    }
  }, [open]);

  const handleOpenCreateDatapoint = () => {
    if (!actionsEnabled) return;
    setEditingRow(null);
    setCreateDatapointOpen(true);
  };

  const handleOpenAttachDatapoint = () => {
    if (!actionsEnabled) return;
    setAttachDialogOpen(true);
  };

  const handleCreateDatapointSave = (values: CreateDatapointFormValues) => {
    const trimmedName = values.name.trim();
    if (!trimmedName) {
      return;
    }

    if (editingRow) {
      setRows((currentRows) => {
        const updatedRow: DatapointRow = {
          ...editingRow,
          name: trimmedName,
          address: values.address.trim(),
          dataPoint: values.dataPoint?.trim() || trimmedName,
          dataType: values.dataType || DATA_POINT_DATA_TYPES[0],
          unit: values.unit || (MOCK_UNITS[0]?.code ?? ""),
          registerType: values.registerType || undefined,
          scaling: values.scaling || undefined,
          registerLength: values.registerLength || undefined,
          pollingTime: values.pollingTime || undefined,
        };

        const next = currentRows.map((r) =>
          r.id === editingRow.id ? updatedRow : r
        );

        if (onDatapointsChange) onDatapointsChange(next);
        return next;
      });
      setEditingRow(null);
      toast.success("Datapoint updated successfully");
      return;
    }

    setRows((currentRows) => {
      const nextId = currentRows.length
        ? Math.max(...currentRows.map((r) => r.id)) + 1
        : 1;

      const newRow: DatapointRow = {
        id: nextId,
        name: trimmedName,
        address: values.address.trim(),
        dataPoint: values.dataPoint?.trim() || trimmedName,
        dataType: values.dataType || DATA_POINT_DATA_TYPES[0],
        unit: values.unit || (MOCK_UNITS[0]?.code ?? ""),
        registerType: values.registerType || undefined,
        scaling: values.scaling || undefined,
        registerLength: values.registerLength || undefined,
        pollingTime: values.pollingTime || undefined,
      };

      const next = [...currentRows, newRow];

      if (onDatapointsChange) onDatapointsChange(next);
      return next;
    });
    toast.success("Datapoint created successfully");
  };

  const handleEditDatapoint = useCallback((row: DatapointRow) => {
    setEditingRow(row);
    setCreateDatapointOpen(true);
  }, []);

  const updateRow = useCallback(
    (id: DatapointRow["id"], partial: Partial<DatapointRow>) => {
      setRows((currentRows) => {
        const next = currentRows.map((r) =>
          r.id === id ? { ...r, ...partial } : r
        );
        if (onDatapointsChange) onDatapointsChange(next);
        return next;
      });
    },
    [onDatapointsChange]
  );

  const deleteRow = useCallback(
    (id: DatapointRow["id"]) => {
      setRows((currentRows) => {
        const next = currentRows.filter((r) => r.id !== id);
        if (onDatapointsChange) onDatapointsChange(next);
        return next;
      });
    },
    [onDatapointsChange]
  );

  const handleDeleteSelected = () => {
    if (!actionsEnabled || !selectedRows.length) return;
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen((prev) => !prev);
  };

  const handleConfirmDelete = () => {
    if (!selectedRows.length) {
      setDeleteDialogOpen(false);
      return;
    }

    const selectedIds = new Set(selectedRows.map((r) => r.id));

    setRows((currentRows) => {
      const next = currentRows.filter((r) => !selectedIds.has(r.id));
      if (onDatapointsChange) onDatapointsChange(next);
      return next;
    });

    setSelectedRows([]);
    setDeleteDialogOpen(false);
    toast.success(
      `Deleted ${selectedIds.size} datapoint${
        selectedIds.size > 1 ? "s" : ""
      } successfully`
    );
  };

  const handleAttachSelectedDatapoints = (
    selectedTemplates: IDataPointAttachDialog[]
  ) => {
    let attachedCount = 0;
    setRows((currentRows) => {
      const existingCodes = new Set(currentRows.map((r) => r.dataPoint));
      let nextId = currentRows.length
        ? Math.max(...currentRows.map((r) => r.id)) + 1
        : 1;

      const newRows: DatapointRow[] = [];

      selectedTemplates.forEach((template) => {
        if (existingCodes.has(template.code)) return;

        const row: DatapointRow = {
          id: nextId++,
          name: template.name,
          address: "",
          dataPoint: template.name,
          dataType: template.dataType,
          unit: template.unit,
          registerType: undefined,
          scaling: undefined,
          registerLength: undefined,
          pollingTime: template.pollingTime || undefined,
        };

        newRows.push(row);
        attachedCount += 1;
      });

      const next = [...currentRows, ...newRows];

      if (onDatapointsChange) onDatapointsChange(next);
      return next;
    });

    if (attachedCount > 0) {
      toast.success(
        `Attached ${attachedCount} datapoint${
          attachedCount > 1 ? "s" : ""
        } successfully`
      );
    } else {
      toast.info("All selected datapoints are already attached");
    }

    setAttachDialogOpen(false);
  };

  const columns = useMemo<ColumnDef<DatapointRow>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: () => <div className="">Datapoint Name</div>,
        cell: ({ row }) => {
          const originalRow = row.original;
          return (
            <EditableCell
              value={originalRow.name}
              onChange={(newValue) => {
                updateRow(originalRow.id, { name: newValue });
              }}
              placeholder="Enter name"
              className="flex-1"
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "address",
        header: () => <div className="">Address</div>,
        cell: ({ row }) => {
          const originalRow = row.original;

          return (
            <EditableCell
              value={originalRow.address}
              onChange={(newValue) => {
                updateRow(originalRow.id, { address: newValue });
              }}
              placeholder="Enter address"
              className="flex-1"
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "dataPoint",
        header: () => <div className="">Datapoint Template</div>,
        cell: ({ row }) => {
          const originalRow = row.original;

          return (
            <SelectField
              placeholder="Select datapoint"
              options={MOCK_DATA_POINT_TEMPLATES.map((template) => ({
                label: template.name,
                value: template.name,
              }))}
              value={originalRow.dataPoint}
              onChange={(val) => {
                // Find the selected template to update dataType, unit, and pollingTime
                const selectedTemplate = MOCK_DATA_POINT_TEMPLATES.find(
                  (t) => t.name === val
                );
                if (selectedTemplate) {
                  updateRow(originalRow.id, {
                    dataPoint: val,
                    dataType: selectedTemplate.dataType,
                    unit: selectedTemplate.unit,
                    pollingTime: selectedTemplate.pollingTime || undefined,
                  });
                } else {
                  updateRow(originalRow.id, { dataPoint: val });
                }
              }}
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "pollingTime",
        header: () => <div className="text-center">Polling Time</div>,
        cell: ({ row }) => {
          const originalRow = row.original;

          return (
            <SelectField
              placeholder="Select polling time"
              options={POLLING_TIME_OPTIONS}
              value={originalRow.pollingTime || undefined}
              onChange={(val) => {
                updateRow(originalRow.id, { pollingTime: val });
              }}
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "dataType",
        header: () => <div className="text-center">Data Type</div>,
        cell: ({ row }) => {
          const originalRow = row.original;

          return (
            <SelectField
              placeholder="Select data type"
              options={DATA_POINT_DATA_TYPES.map((type) => ({
                label: type,
                value: type,
              }))}
              disabled
              value={originalRow.dataType}
              onChange={(val) => {
                updateRow(originalRow.id, { dataType: val });
              }}
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "unit",
        header: () => <div className="text-center">Units</div>,
        cell: ({ row }) => {
          const originalRow = row.original;

          return (
            <SelectField
              placeholder="Select unit"
              options={MOCK_UNITS.map((unit) => ({
                label: unit.code,
                value: unit.code,
              }))}
              disabled
              value={originalRow.unit}
              onChange={(val) => {
                updateRow(originalRow.id, { unit: val });
              }}
            />
          );
        },
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit row ${row.original.id}`}
              className="text-primary"
              onClick={() => handleEditDatapoint(row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete row ${row.original.id}`}
              className="text-destructive"
              onClick={() => deleteRow(row.original.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ];
  }, [updateRow, deleteRow, handleEditDatapoint]);

  const attachColumns = useMemo<ColumnDef<IDataPointAttachDialog>[]>(
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
        accessorKey: "code",
        header: () => <div className="text-left">Code</div>,
        cell: ({ row }) => (
          <Typography component="p" className="text-sm text-foreground">
            {row.original.code}
          </Typography>
        ),
      },
      {
        accessorKey: "dataType",
        header: () => <div className="text-left">Data Type</div>,
        cell: ({ row }) => (
          <Typography
            component="p"
            className="text-left text-sm text-foreground"
          >
            {row.original.dataType}
          </Typography>
        ),
      },
      {
        accessorKey: "unit",
        header: () => <div className="text-left">Units</div>,
        cell: ({ row }) => (
          <Typography
            component="p"
            className="text-left text-sm text-foreground"
          >
            {row.original.unit}
          </Typography>
        ),
      },
    ],
    []
  );

  interface IDataPointAttachDialog extends IDataPointTemplateRow {
    tags?: (ITag & { label: string; value: TagValue })[];
  }

  const renderTagFilteredAttachDialog = () => {
    const datapoint: IDataPointAttachDialog[] = MOCK_DATA_POINT_TEMPLATES.map(
      (dataPoint) => ({
        ...dataPoint,
        tags:
          dataPoint.tags &&
          dataPoint.tags.map((tag) => ({
            ...tag,
            label: tag.name,
            value: tag.values,
          })),
      })
    );

    return (
      <TagFilteredAttachDialog<IDataPointAttachDialog>
        open={attachDialogOpen}
        onOpenChange={setAttachDialogOpen}
        onAttach={handleAttachSelectedDatapoints}
        title="Attach Datapoints to Device Template"
        items={datapoint}
        columns={attachColumns}
        tagOptions={MOCK_TAGS}
        tagFilterPlaceholder="Search and filter datapoints by attached tags"
        attachButtonLabel="Attach Selected Datapoints"
      />
    );
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography component="h3" variant="xl" weight="bold">
            Datapoints
          </Typography>
          <DatapointsActionBar
            actionsEnabled={actionsEnabled}
            hasSelectedRows={!!selectedRows.length}
            onDeleteSelected={handleDeleteSelected}
            onOpenCreateDatapoint={handleOpenCreateDatapoint}
            onOpenAttachDatapoint={handleOpenAttachDatapoint}
          />
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border rounded-lg bg-muted">
            <Typography
              component="p"
              variant="base"
              weight="medium"
              className="text-muted-foreground mb-2"
            >
              No datapoints attached yet
            </Typography>
            <Typography
              component="p"
              variant="sm"
              className="text-muted-foreground"
            >
              Click "Attach Datapoint" or "Create Datapoint" to get started
            </Typography>
          </div>
        ) : (
          <DataTable<DatapointRow>
            key={rows.length}
            data={rows}
            columns={columns}
            options={{
              enableSorting: false,
              enablePagination: true,
              enableSelection: true,
              enableSearching: false,
              pageSizes: [5, 10, 20],
              visiblePages: 5,
            }}
            onRowSelectionChange={(selected) => {
              console.log(
                "Selection changed:",
                selected.length,
                "rows selected"
              );
              setSelectedRows(selected);
            }}
            headerClassName="justify-start"
          />
        )}
      </div>

      <GenericDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
        title="Delete Datapoints"
        description="You are about to delete"
        highlightText={`${selectedRows.length} datapoints`}
      />

      {renderTagFilteredAttachDialog()}

      <CreateDatapointSheet
        open={createDatapointOpen}
        onOpenChange={(nextOpen) => {
          setCreateDatapointOpen(nextOpen);
          if (!nextOpen) {
            setEditingRow(null);
          }
        }}
        onSubmit={handleCreateDatapointSave}
        mode={editingRow ? "edit" : "create"}
        initialValues={
          editingRow
            ? {
                name: editingRow.name,
                dataPoint: editingRow.dataPoint,
                registerType: editingRow.registerType ?? "",
                dataType: editingRow.dataType,
                address: editingRow.address,
                scaling: editingRow.scaling ?? "",
                registerLength: editingRow.registerLength ?? "",
                unit: editingRow.unit,
                pollingTime: editingRow.pollingTime ?? "",
                templateCode: editingRow.dataPoint,
              }
            : undefined
        }
      />
    </>
  );
};

export default DatapointsTableSection;
