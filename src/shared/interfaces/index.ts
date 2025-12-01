export interface Country {
  code: string;
  countryCode: string;
  label: string;
  flag: string;
}

export type DatapointRow = {
  id: number;
  name: string;
  address: string;
  dataPoint: string;
  dataType: string;
  unit: string;
  registerType?: string;
  scaling?: string;
  registerLength?: string;
  pollingTime?: string;
};

export interface DatapointsTableSectionProps {
  open: boolean;
  datapoints?: DatapointRow[];
  onDatapointsChange?: (rows: DatapointRow[]) => void;
  actionsEnabled: boolean;
}

export interface DatapointsActionBarProps {
  actionsEnabled: boolean;
  hasSelectedRows: boolean;
  onDeleteSelected: () => void;
  onOpenCreateDatapoint: () => void;
  onOpenAttachDatapoint: () => void;
}
