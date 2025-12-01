import type { ITag } from "@/pages/tags-master/type/tagMaster";
import type { IDataPointTemplateRow } from "@/pages/data-point-master/types";

export interface DeviceTemplateRow {
  srNo: number;
  name: string;
  code: string;
  description?: string;
  protocolType: string;
  attachedTags: ITag[];
  attachedDatapoints: IDataPointTemplateRow[];
}
