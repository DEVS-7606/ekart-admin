export type AlarmSeverity = "Critical" | "Major" | "Minor" | "Warning";

export type AlarmTemplate = {
  srNo: number;
  name: string;
  description?: string;
  text: string;
  level: AlarmSeverity;
  tags: { label: string; value: string }[];
  isActive: boolean;
  // Will be extended with conditions, timeWindow, etc. in future steps
};

export const MOCK_ALARM_TEMPLATES: AlarmTemplate[] = [
  {
    srNo: 1,
    name: "Motor RPM",
    text: "Turn off the motor",
    level: "Critical",
    tags: [
      { label: "Type", value: "Production" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: true,
  },
  {
    srNo: 2,
    name: "Temperature",
    text: "Turn off the machine",
    level: "Major",
    tags: [
      { label: "Type", value: "On-Off" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: false,
  },
  {
    srNo: 3,
    name: "Motor RPM",
    text: "Reduce RPM of motor",
    level: "Minor",
    tags: [
      { label: "Type", value: "Production" },
      { label: "Model", value: "Nova" },
    ],
    isActive: true,
  },
  {
    srNo: 4,
    name: "BOLT RB MAX",
    text: "Diesel level low",
    level: "Warning",
    tags: [
      { label: "Type", value: "Alert" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: true,
  },
  {
    srNo: 5,
    name: "Temperature",
    text: "Turn off the machine",
    level: "Critical",
    tags: [
      { label: "Type", value: "Production" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: false,
  },
  {
    srNo: 6,
    name: "BOLT RB MAX",
    text: "Diesel level low",
    level: "Warning",
    tags: [
      { label: "Type", value: "Production" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: true,
  },
  {
    srNo: 7,
    name: "Pressure High",
    text: "Reduce line pressure",
    level: "Major",
    tags: [
      { label: "Type", value: "Process" },
      { label: "Model", value: "Nova" },
    ],
    isActive: false,
  },
  {
    srNo: 8,
    name: "Voltage Surge",
    text: "Isolate power supply",
    level: "Critical",
    tags: [
      { label: "Type", value: "Electrical" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: true,
  },
  {
    srNo: 9,
    name: "Low Lubricant",
    text: "Refill lubricant reservoir",
    level: "Minor",
    tags: [
      { label: "Type", value: "Maintenance" },
      { label: "Model", value: "Nova" },
    ],
    isActive: true,
  },
  {
    srNo: 10,
    name: "Door Open",
    text: "Close panel door",
    level: "Warning",
    tags: [
      { label: "Type", value: "Safety" },
      { label: "Model", value: "Bolt" },
    ],
    isActive: false,
  },
];

// Mock data for alarm form steps (conditions, messages, actions)
// Used in edit mode to demonstrate the prototype functionality

export const MOCK_EDIT_CONDITIONS = [
  {
    datapointCode: "TEMP_A1",
    datapointName: "Temperature Sensor A1",
    dataType: "String",
    operator: "=",
    threshold: "High",
    logicalOperator: "AND" as const,
  },
  {
    datapointCode: "PRES_B2",
    datapointName: "Pressure Gauge B2",
    dataType: "Boolean",
    operator: "=",
    threshold: "false",
    logicalOperator: undefined,
  },
];

export const MOCK_EDIT_OCCURRENCE_CONDITION_ENABLED = true;

export const MOCK_EDIT_OCCURRENCE_CONDITION = {
  type: "period_and_count" as const,
  count: 3,
  period: 5,
  periodUnit: "Minutes" as const,
};

export const MOCK_EDIT_MESSAGE = {
  text: "Critical alarm: Temperature exceeded threshold and pressure is below minimum",
};

export const MOCK_EDIT_ACTIONS = {
  // Placeholder for future action configuration
  notifyUsers: ["admin@example.com", "operator@example.com"],
  escalationLevel: "high",
};
