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

export type TagValue = string | number | boolean | string[] | number[];

export interface ITag {
  name: string;
  code: string;
  datatype: string;
  isMultiSelect: boolean;
  description?: string;
  values: TagValue;
}

export interface IDataPointTemplateRow {
  srNo: number;
  name: string;
  code: string;
  dataType: DataPointDataType;
  unit: string;
  pollingTime?: string;
  tags?: ITag[];
}

export interface DeviceTemplateRow {
  srNo: number;
  name: string;
  code: string;
  description?: string;
  protocolType: string;
  attachedTags: ITag[];
  attachedDatapoints: IDataPointTemplateRow[];
}

// Template Wizard types
export type {
  BaseTemplateRow,
  BaseTemplateFormValues,
  TemplateTableConfig,
  TemplateHeaderConfig,
  TemplateDeleteDialogConfig,
  TemplateWizardProps,
} from "./templateWizard";
