export type DataPointTagOption = {
  labelName: string;
  values: string[];
};

export const DATA_POINT_TAG_OPTIONS: DataPointTagOption[] = [
  {
    labelName: "Location",
    values: ["Factory A", "Factory B", "Factory C"],
  },
  {
    labelName: "Sensor Type",
    values: ["Temperature", "Pressure", "Vibration"],
  },
  {
    labelName: "Interval",
    values: ["60s", "5m", "15m"],
  },
];
