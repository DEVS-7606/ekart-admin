export type TagValue = string | number | boolean | string[] | number[];

export interface ITag {
  name: string;
  code: string;
  datatype: string;
  isMultiSelect: boolean;
  description?: string;
  values: TagValue;
}
