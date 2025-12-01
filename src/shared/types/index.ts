export const DATA_POINT_DATA_TYPES = [
  "String",
  "Boolean",
  "Integer",
  "Float",
  "Real",
  "BooleanArray",
] as const;

export type TemplateMode = "create" | "edit";

export type DataPointDataType = (typeof DATA_POINT_DATA_TYPES)[number];

// Template Wizard types
export type {
  BaseTemplateRow,
  BaseTemplateFormValues,
  TemplateTableConfig,
  TemplateHeaderConfig,
  TemplateDeleteDialogConfig,
  TemplateWizardProps,
} from "./templateWizard";
