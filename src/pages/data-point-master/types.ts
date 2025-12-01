import type { ITag } from "@/pages/tags-master/type/tagMaster";
import type { DataPointDataType } from "@/shared/types";

export interface IDataPointTemplateRow {
  srNo: number;
  name: string;
  code: string;
  dataType: DataPointDataType;
  unit: string;
  pollingTime?: string;
  tags?: ITag[];
}
