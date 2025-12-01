import { useMemo, useState } from "react";
import { TemplateWizard } from "@/shared/components/organisms/templateWizard";
import AlarmFormMultiStep from "@/shared/components/organisms/alarmMaster/alarmFormMultiStep";
import type { AlarmRow, AlarmFormValues } from "@/shared/types/alarmMaster";
import { toast } from "sonner";
import {
  chipStringsToTags,
  tagsToChipStrings,
} from "@/shared/utils/tagHelpers";
import {
  MOCK_ALARM_TEMPLATES,
  MOCK_EDIT_CONDITIONS,
  MOCK_EDIT_OCCURRENCE_CONDITION,
  MOCK_EDIT_OCCURRENCE_CONDITION_ENABLED,
} from "@/shared/constants/alarmTemplate.constant";
import {
  alarmTableConfig,
  alarmHeaderConfig,
  alarmDeleteDialogConfig,
} from "@/shared/config/alarmTemplateWizard.config";
import type {
  TemplateHeaderConfig,
  TemplateTableConfig,
} from "@/shared/types/templateWizard";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import AttachAlarmTemplatesDialog from "@/shared/components/organisms/alarmMaster/attachAlarmTemplatesDialog";
import AlarmFilter from "@/shared/components/organisms/alarmMaster/alarmFilter";

/**
 * Props for AlarmTemplateModule
 * Allows parent modules to control data and behavior
 */
export interface AlarmTemplateModuleProps {
  /**
   * Initial alarm templates data
   * If not provided, uses mock data
   */
  initialData?: AlarmRow[];

  /**
   * Callback when an alarm is created
   */
  onAlarmCreated?: (alarm: AlarmRow) => void;

  /**
   * Callback when an alarm is updated
   */
  onAlarmUpdated?: (alarm: AlarmRow) => void;

  /**
   * Callback when an alarm is deleted
   */
  onAlarmDeleted?: (alarmId: number) => void;

  /**
   * Whether to show toast notifications
   * Default: true
   */
  showToasts?: boolean;

  /**
   * Custom success messages
   */
  messages?: {
    created?: string;
    updated?: string;
    deleted?: string;
  };

  /**
   * Enables multi-select delete and attach-by-tags features
   */
  enableBulkActions?: boolean;
  applyLayout?: boolean;

  /**
   * Optional override for the header config used by the template wizard.
   * If not provided, the default alarmHeaderConfig is used.
   */
  headerConfig?: TemplateHeaderConfig;

  /**
   * Optional override for the table config used by the template wizard.
   * If not provided, the default alarmTableConfig is used.
   */
  tableConfig?: TemplateTableConfig<AlarmRow>;
}

/**
 * AlarmTemplateModule - A complete, reusable alarm template management module
 *
 * This module can be used standalone or embedded in other modules (e.g., Machine Master).
 * It provides full CRUD functionality for alarm templates with a multi-step form wizard.
 *
 * @example
 * // Standalone usage
 * <AlarmTemplateModule />
 *
 * @example
 * // Embedded in Machine Master with custom callbacks
 * <AlarmTemplateModule
 *   initialData={machineAlarms}
 *   onAlarmCreated={(alarm) => handleMachineAlarmCreated(alarm)}
 *   onAlarmUpdated={(alarm) => handleMachineAlarmUpdated(alarm)}
 *   onAlarmDeleted={(id) => handleMachineAlarmDeleted(id)}
 * />
 */
const AlarmTemplateModule = ({
  initialData,
  onAlarmCreated,
  onAlarmUpdated,
  onAlarmDeleted,
  showToasts = true,
  messages = {},
  enableBulkActions = false,
  applyLayout = true,
  headerConfig,
  tableConfig,
}: AlarmTemplateModuleProps = {}) => {
  const [openForm, setOpenForm] = useState(false);
  const initialAlarms = useMemo<AlarmRow[]>(
    () => initialData ?? MOCK_ALARM_TEMPLATES,
    [initialData]
  );
  const [alarms, setAlarms] = useState<AlarmRow[]>(initialAlarms);
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmRow | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmRow[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [attachDialogOpen, setAttachDialogOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const effectiveHeaderConfig: TemplateHeaderConfig =
    headerConfig ?? alarmHeaderConfig;
  const effectiveTableConfig: TemplateTableConfig<AlarmRow> =
    tableConfig ?? alarmTableConfig;

  const handleCreateAlarm = () => {
    setSelectedAlarm(null);
    setOpenForm(true);
  };

  const handleEditAlarm = (row: AlarmRow) => {
    setSelectedAlarm(row);
    setOpenForm(true);
  };

  const handleDeleteAlarm = (row: AlarmRow) => {
    setAlarms((prev) => prev.filter((item) => item.srNo !== row.srNo));

    if (showToasts) {
      toast.success(messages.deleted ?? "Alarm template deleted successfully");
    }

    // Notify parent module
    if (onAlarmDeleted) {
      onAlarmDeleted(row.srNo);
    }
  };

  const onClickDeleteIcon = (row: AlarmRow) => {
    setSelectedAlarm(row);
    setDeleteDialogOpen(true);
  };

  const toggleDeleteDialog = () => {
    setDeleteDialogOpen((prev) => !prev);
  };

  const confirmDelete = () => {
    if (!selectedAlarm) return;
    handleDeleteAlarm(selectedAlarm);
    setDeleteDialogOpen(false);
    setSelectedAlarm(null);
    setSelectedAlarms([]);
  };

  const handleFormOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedAlarm(null);
    }
    setOpenForm(open);
  };

  const handleFormSubmit = (values: AlarmFormValues) => {
    const nextTags = chipStringsToTags(values.tags);

    if (selectedAlarm) {
      // Update existing alarm
      const updatedAlarm: AlarmRow = {
        ...selectedAlarm,
        name: values.name,
        description: values.description,
        text: values.text,
        level: values.level,
        tags: nextTags,
        isActive: selectedAlarm.isActive ?? true,
      };

      setAlarms((prev) =>
        prev.map((row) =>
          row.srNo === selectedAlarm.srNo ? updatedAlarm : row
        )
      );

      if (showToasts) {
        toast.success(
          messages.updated ?? "Alarm template updated successfully"
        );
      }

      // Notify parent module
      if (onAlarmUpdated) {
        onAlarmUpdated(updatedAlarm);
      }
    } else {
      // Create new alarm
      const nextSrNo =
        alarms.length > 0 ? Math.max(...alarms.map((row) => row.srNo)) + 1 : 1;

      const nextRow: AlarmRow = {
        srNo: nextSrNo,
        name: values.name,
        description: values.description,
        text: values.text,
        level: values.level,
        tags: nextTags,
        isActive: true,
      };

      setAlarms((prev) => [...prev, nextRow]);

      if (showToasts) {
        toast.success(messages.created ?? "Alarm template added successfully");
      }

      // Notify parent module
      if (onAlarmCreated) {
        onAlarmCreated(nextRow);
      }
    }
  };

  const toggleBulkDeleteDialog = () => {
    setBulkDeleteDialogOpen((prev) => !prev);
  };

  const handleConfirmBulkDelete = () => {
    if (!selectedAlarms.length) {
      setBulkDeleteDialogOpen(false);
      return;
    }

    const namesToDelete = new Set(selectedAlarms.map((alarm) => alarm.name));

    setAlarms((prev) => prev.filter((row) => !namesToDelete.has(row.name)));

    if (onAlarmDeleted) {
      selectedAlarms.forEach((row) => onAlarmDeleted(row.srNo));
    }

    if (showToasts) {
      toast.success(
        `Deleted ${selectedAlarms.length} alarm template${
          selectedAlarms.length > 1 ? "s" : ""
        } successfully`
      );
    }

    setSelectedAlarms([]);
    setBulkDeleteDialogOpen(false);
  };

  const handleFilterChange = (rows: AlarmRow[]) => {
    setAlarms(rows);
  };

  const handleFilterAppliedChange = (applied: boolean) => {
    setIsFilterApplied(applied);
  };

  const handleAttachSelectedAlarms = (templates: AlarmRow[]) => {
    let addedCount = 0;

    setAlarms((prev) => {
      const existingNames = new Set(prev.map((row) => row.name));

      let nextSrNo =
        prev.length > 0 ? Math.max(...prev.map((row) => row.srNo)) + 1 : 1;

      const newRows: AlarmRow[] = [];

      templates.forEach((template) => {
        if (existingNames.has(template.name)) return;

        newRows.push({
          ...template,
          srNo: nextSrNo++,
        });

        addedCount += 1;
      });

      return [...prev, ...newRows];
    });

    if (addedCount > 0 && showToasts) {
      toast.success(
        `Attached ${addedCount} alarm template${
          addedCount > 1 ? "s" : ""
        } successfully`
      );
    }

    setAttachDialogOpen(false);
  };

  return (
    <>
      <TemplateWizard<AlarmRow, AlarmFormValues>
        data={alarms}
        openForm={openForm}
        mode={selectedAlarm ? "edit" : "create"}
        initialValues={
          selectedAlarm
            ? {
                name: selectedAlarm.name,
                description: selectedAlarm.description,
                text: selectedAlarm.text,
                remedies: [""],
                level: selectedAlarm.level,
                tags: tagsToChipStrings(selectedAlarm.tags),
                // Mock data for other steps in edit mode (prototype)
                conditions: MOCK_EDIT_CONDITIONS,
                occurrenceConditionEnabled:
                  MOCK_EDIT_OCCURRENCE_CONDITION_ENABLED,
                occurrenceCondition: MOCK_EDIT_OCCURRENCE_CONDITION,
              }
            : undefined
        }
        onCreateTemplate={handleCreateAlarm}
        onFormOpenChange={handleFormOpenChange}
        onEditTemplate={handleEditAlarm}
        onDeleteTemplate={onClickDeleteIcon}
        onSubmit={handleFormSubmit}
        deleteDialogOpen={deleteDialogOpen}
        deleteDialogRow={selectedAlarm}
        toggleDeleteDialog={toggleDeleteDialog}
        confirmDelete={confirmDelete}
        tableConfig={effectiveTableConfig}
        headerConfig={effectiveHeaderConfig}
        deleteDialogConfig={alarmDeleteDialogConfig}
        FormComponent={AlarmFormMultiStep}
        applyLayout={applyLayout}
        enableSelection={enableBulkActions}
        selectedRows={enableBulkActions ? selectedAlarms : undefined}
        onSelectionChange={
          enableBulkActions ? (rows) => setSelectedAlarms(rows) : undefined
        }
        onDeleteSelected={
          enableBulkActions
            ? () => {
                if (!selectedAlarms.length) return;
                setBulkDeleteDialogOpen(true);
              }
            : undefined
        }
        onAttachTemplates={
          enableBulkActions ? () => setAttachDialogOpen(true) : undefined
        }
        filterComponent={
          <AlarmFilter
            data={alarms}
            initialData={initialAlarms}
            onFilterChange={handleFilterChange}
            onFilterAppliedChange={handleFilterAppliedChange}
          />
        }
        isFilterApplied={isFilterApplied}
      />

      {enableBulkActions && (
        <GenericDialog
          open={bulkDeleteDialogOpen}
          onOpenChange={toggleBulkDeleteDialog}
          onConfirm={handleConfirmBulkDelete}
          title="Delete Alarm Templates"
          description="You are about to delete"
          highlightText={`${selectedAlarms.length} alarm templates`}
        />
      )}

      {enableBulkActions && (
        <AttachAlarmTemplatesDialog
          open={attachDialogOpen}
          onOpenChange={setAttachDialogOpen}
          onAttach={handleAttachSelectedAlarms}
        />
      )}
    </>
  );
};

export default AlarmTemplateModule;
