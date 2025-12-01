import type { DatapointRow } from "@/shared/interfaces";
import { DATA_POINT_DATA_TYPES } from "@/shared/types";

export const MOCK_DATAPOINTS: DatapointRow[] = [
  {
    id: 1,
    name: "Temperature Sensor A1",
    address: "192.168.1.100",
    dataPoint: "Temperature Sensor A1",
    dataType: DATA_POINT_DATA_TYPES[0], // Assuming first type
    unit: "°C",
    registerType: "Holding Register",
    scaling: "1",
    registerLength: "1",
    pollingTime: "1s",
  },
  {
    id: 2,
    name: "Flow Rate D4",
    address: "192.168.1.101",
    dataPoint: "Flow Rate D4",
    dataType: DATA_POINT_DATA_TYPES[1] || DATA_POINT_DATA_TYPES[0], // Second type or fallback
    unit: "PSI",
    registerType: "Input Register",
    scaling: "1",
    registerLength: "2",
    pollingTime: "3s",
  },
  {
    id: 3,
    name: "Vibration Monitor E5",
    address: "192.168.1.102",
    dataPoint: "Vibration Monitor E5",
    dataType: DATA_POINT_DATA_TYPES[2] || DATA_POINT_DATA_TYPES[0], // Third type or fallback
    unit: "L/min",
    registerType: "Holding Register",
    scaling: "0.1",
    registerLength: "4",
    pollingTime: "onchange",
  },
];
