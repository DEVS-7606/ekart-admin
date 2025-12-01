import type { TemplateMode } from "./index";
import type { ColumnDef } from "@tanstack/react-table";
import type {
  TypographyComponent,
  TypographyVariant,
  TypographyWeight,
} from "@/shared/components/atoms/Typography";
import type { ReactNode } from "react";

/**
 * Generic row type for template data tables
 * TData extends this base interface with module-specific fields
 */
export interface BaseTemplateRow {
  srNo: number;
  name: string;
  description?: string;
}

/**
 * Generic form values type for template wizards
 * TFormValues extends this base interface with module-specific fields
 */
export interface BaseTemplateFormValues {
  name: string;
  description?: string;
}

/**
 * Configuration for template wizard table columns
 */
export interface TemplateTableConfig<TRow extends BaseTemplateRow> {
  /**
   * Custom column definitions for the data table
   * Excludes the actions column which is handled automatically
   */
  columns: (
    onEdit?: (row: TRow) => void,
    onDelete?: (row: TRow) => void
  ) => ColumnDef<TRow>[];

  /**
   * Enable/disable sorting on the table
   */
  enableSorting?: boolean;

  /**
   * Enable/disable pagination on the table
   */
  enablePagination?: boolean;

  /**
   * Number of visible pages in pagination
   */
  visiblePages?: number;
  pageSizes?: number[];
  defaultPageSize?: number;
}

export interface TemplateHeaderTitleConfig {
  component?: TypographyComponent;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  className?: string;
  text?: string;
}

/**
 * Configuration for template wizard header section
 */
export interface TemplateHeaderConfig {
  /**
   * Main title for the template section (e.g., "Alarm Templates", "Report Templates")
   */
  title: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Label for the create button (e.g., "Create Alarm", "Add Report")
   */
  createButtonLabel: string;

  /**
   * Optional label for a header filter button (e.g., "Filters")
   */
  filterButtonLabel?: string;

  /**
   * Optional configuration for title typography and text
   */
  titleConfig?: TemplateHeaderTitleConfig;
}

/**
 * Configuration for template wizard delete dialog
 */
export interface TemplateDeleteDialogConfig {
  /**
   * Title for the delete confirmation dialog
   */
  title: string;

  /**
   * Optional custom description
   * If not provided, uses default "Are you sure you want to delete {name}?"
   */
  description?: string;

  /**
   * Field name to display in the delete confirmation (default: "name")
   */
  displayField?: string;
}

/**
 * Props for generic template wizard components
 */
export interface TemplateWizardProps<
  TRow extends BaseTemplateRow,
  TFormValues extends BaseTemplateFormValues
> {
  /**
   * Table data rows
   */
  data: TRow[];

  /**
   * Form open state
   */
  openForm: boolean;

  /**
   * Form mode (create or edit)
   */
  mode: TemplateMode;

  /**
   * Initial values for form (in edit mode)
   */
  initialValues?: Partial<TFormValues>;

  /**
   * Callback when create button is clicked
   */
  onCreateTemplate: () => void;

  /**
   * Callback when form open state changes
   */
  onFormOpenChange: (open: boolean) => void;

  /**
   * Callback when edit button is clicked
   */
  onEditTemplate: (row: TRow) => void;

  /**
   * Callback when delete button is clicked
   */
  onDeleteTemplate: (row: TRow) => void;

  /**
   * Callback when form is submitted
   */
  onSubmit: (values: TFormValues) => void;

  /**
   * Optional row selection and bulk action support
   */
  enableSelection?: boolean;
  selectedRows?: TRow[];
  onSelectionChange?: (rows: TRow[]) => void;
  onDeleteSelected?: () => void;
  onAttachTemplates?: () => void;

  /**
   * Delete dialog open state
   */
  deleteDialogOpen: boolean;

  /**
   * Row selected for deletion
   */
  deleteDialogRow: TRow | null;

  /**
   * Callback to toggle delete dialog
   */
  toggleDeleteDialog: () => void;

  /**
   * Callback to confirm deletion
   */
  confirmDelete: () => void;

  /**
   * Configuration for table display
   */
  tableConfig: TemplateTableConfig<TRow>;

  /**
   * Configuration for header section
   */
  headerConfig: TemplateHeaderConfig;

  /**
   * Configuration for delete dialog
   */
  deleteDialogConfig: TemplateDeleteDialogConfig;

  /**
   * Custom form component to render in the sheet
   */
  FormComponent: React.ComponentType<{
    open: boolean;
    mode: TemplateMode;
    initialValues?: Partial<TFormValues>;
    onSubmit: (values: TFormValues) => void;
    onCancel: () => void;
  }>;

  /** Optional filter component rendered in the header (e.g., alarm filter) */
  filterComponent?: ReactNode;

  /** Optional flag to indicate if filters are currently applied */
  isFilterApplied?: boolean;

  /** Flag to control whether the wizard is wrapped in MainLayout */
  applyLayout?: boolean;
}
