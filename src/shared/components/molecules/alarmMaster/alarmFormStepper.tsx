import { ChevronRight } from "lucide-react";
import { Typography } from "@/shared/components/atoms/Typography";
import {
  ALARM_FORM_STEPS,
  type AlarmFormStep,
} from "@/shared/constants/alarmFormSteps.constant";

type AlarmFormStepperProps = {
  currentStep: AlarmFormStep;
  onStepClick: (step: AlarmFormStep) => void;
};

const AlarmFormStepper = ({
  currentStep,
  onStepClick,
}: AlarmFormStepperProps) => {
  const currentStepNumber =
    ALARM_FORM_STEPS.find((s) => s.step === currentStep)?.stepNumber ?? 1;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {ALARM_FORM_STEPS.map((stepConfig, index) => {
        const isActive = stepConfig.step === currentStep;
        const isCompleted = stepConfig.stepNumber < currentStepNumber;
        const isClickable = true; // Allow navigation to any step

        return (
          <div key={stepConfig.step} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(stepConfig.step)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              } ${
                isActive
                  ? "bg-accent/40 text-primary"
                  : isCompleted
                  ? "text-foreground hover:bg-muted/80"
                  : "text-muted-foreground hover:bg-muted/80"
              }`}
              disabled={!isClickable}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stepConfig.stepNumber}
              </div>
              <Typography
                component="span"
                variant="sm"
                weight={isActive ? "semiBold" : "medium"}
                className={
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                {stepConfig.label}
              </Typography>
            </button>
            {index < ALARM_FORM_STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AlarmFormStepper;
