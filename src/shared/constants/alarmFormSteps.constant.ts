export const AlarmFormStep = {
  BASIC_DETAILS: "BASIC_DETAILS",
  SET_CONDITIONS: "SET_CONDITIONS",
  CONFIGURE_MESSAGE: "CONFIGURE_MESSAGE",
  CONFIGURE_ACTIONS: "CONFIGURE_ACTIONS",
} as const;

export type AlarmFormStep = (typeof AlarmFormStep)[keyof typeof AlarmFormStep];

export type AlarmFormStepConfig = {
  step: AlarmFormStep;
  label: string;
  stepNumber: number;
};

export const ALARM_FORM_STEPS: AlarmFormStepConfig[] = [
  {
    step: AlarmFormStep.BASIC_DETAILS,
    label: "Basic Details",
    stepNumber: 1,
  },
  {
    step: AlarmFormStep.SET_CONDITIONS,
    label: "Set Conditions",
    stepNumber: 2,
  },
  {
    step: AlarmFormStep.CONFIGURE_MESSAGE,
    label: "Configure Message",
    stepNumber: 3,
  },
  {
    step: AlarmFormStep.CONFIGURE_ACTIONS,
    label: "Configure Actions",
    stepNumber: 4,
  },
];
