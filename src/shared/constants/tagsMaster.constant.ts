import type { ITag } from "@/pages/tags-master/type/tagMaster";

export const MOCK_TAGS: ITag[] = [
  {
    name: "Device Location",
    code: "001",
    datatype: "string[]",
    isMultiSelect: false,
    description: "Physical location of the asset",
    values: ["Ahmedabad", "Surat", "Rajkot"],
  },
  {
    name: "Company",
    code: "002",
    datatype: "string[]",
    isMultiSelect: true,
    description: "Company to which the asset belongs",
    values: ["Navneet", "Linomatic"],
  },
  {
    name: "Machine Category",
    code: "003",
    datatype: "string",
    isMultiSelect: false,
    description: "Category of the machine",
    values: "Production",
  },
  {
    name: "Priority Level",
    code: "004",
    datatype: "number",
    isMultiSelect: false,
    description: "Priority level of the asset (1-10)",
    values: 5,
  },
  {
    name: "Asset Phase",
    code: "005",
    datatype: "string[]",
    isMultiSelect: true,
    description: "Lifecycle phases of the asset",
    values: [
      "Installation",
      "Production",
      "Active",
      "Maintenance",
      "Repair",
      "Decommission",
    ],
  },
  {
    name: "Temperature Thresholds",
    code: "006",
    datatype: "number[]",
    isMultiSelect: false,
    description: "Temperature threshold ranges",
    values: [0, 50, 100, 150, 200],
  },
  {
    name: "Is Active",
    code: "007",
    datatype: "boolean",
    isMultiSelect: false,
    description: "Whether the asset is currently active",
    values: true,
  },
  {
    name: "Device Status",
    code: "008",
    datatype: "string",
    isMultiSelect: true,
    description: "Current status of asset",
    values: "Running",
  },
];

export const TAG_MASTER_DATATYPES = [
  { label: "string", value: "string" },
  { label: "string[]", value: "string[]" },
  { label: "number", value: "number" },
  { label: "number[]", value: "number[]" },
  { label: "boolean", value: "boolean" },
];
