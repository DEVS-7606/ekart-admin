import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/shared/components/atoms/Typography";
import { Form } from "@/shared/components/atoms/form";
import Button from "@/shared/components/atoms/button";
import { SheetFooter } from "@/shared/components/atoms/sheet";
import SubmitButton from "@/shared/components/molecules/submitButton";
import AlarmFormStepper from "@/shared/components/molecules/alarmMaster/alarmFormStepper";
import { AlarmFormStep } from "@/shared/constants/alarmFormSteps.constant";
// import { MOCK_TAGS } from "@/shared/constants/tagsMaster.constant";
import BasicDetailsStep from "./steps/BasicDetailsStep";
import ConfigureMessageStep from "./steps/ConfigureMessageStep";
import ConfigureActionsStep from "./steps/ConfigureActionsStep";
import AlarmConditionsSection from "./alarmConditionsSection";

type AlarmFormStepKey = (typeof AlarmFormStep)[keyof typeof AlarmFormStep];

const alarmSchema = z.object({
  name: z.string().min(1, "Alarm Name is required"),
  description: z.string().optional(),
  text: z.string().min(1, "Alarm Text is required"),
  remedies: z
    .array(z.string().url("Enter a valid URL"))
    .min(1, "At least one remedy URL is required"),
  level: z.enum(["Critical", "Major", "Minor", "Warning"]),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean(),
  conditions: z
    .array(
      z.object({
        datapointCode: z.string(),
        datapointName: z.string(),
        dataType: z.string(),
        operator: z.string(),
        threshold: z.string(),
        logicalOperator: z.enum(["AND", "OR"]).optional(),
      })
    )
    .optional(),
  occurrenceConditionEnabled: z.boolean().optional(),
  occurrenceCondition: z
    .object({
      type: z.enum(["period_and_count", "period", "count"]),
      count: z.number().min(1).optional(),
      period: z.number().min(1).optional(),
      periodUnit: z.enum(["Minutes", "Hours", "Days"]).optional(),
    })
    .optional(),
});

// Shape of all fields used in the multi-step alarm form, inferred from the Zod schema
export type AlarmFormValues = z.infer<typeof alarmSchema>;

export interface AlarmFormProps {
  open: boolean;
  mode?: "create" | "edit";
  initialValues?: Partial<AlarmFormValues>;
  onSubmit?: (values: AlarmFormValues) => void;
  onCancel: () => void;
}

const ALARM_LEVELS = ["Critical", "Major", "Minor", "Warning"] as const;

const AlarmFormMultiStep = ({
  open,
  mode = "create",
  initialValues,
  onSubmit,
  onCancel,
}: AlarmFormProps) => {
  const [currentStep, setCurrentStep] = useState<AlarmFormStepKey>(
    AlarmFormStep.BASIC_DETAILS
  );

  const form = useForm<AlarmFormValues>({
    resolver: zodResolver(alarmSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      text: initialValues?.text ?? "",
      remedies: initialValues?.remedies ?? [""],
      level: initialValues?.level ?? undefined,
      tags: initialValues?.tags ?? [],
      isActive: initialValues?.isActive ?? true,
      conditions: [],
      occurrenceConditionEnabled: false,
      occurrenceCondition: {
        type: "period_and_count",
        count: 2,
        period: 2,
        periodUnit: "Minutes",
      },
    },
  });

  // Prototype data flow:
  // - Basic Details: saved to index.tsx state and shown in table
  // - Other steps (Conditions, Message, Actions): stored here, reset on close
  // - Edit mode: uses mock data for non-Basic Details steps for demo purposes
  useEffect(() => {
    if (!open) return;
    form.reset({
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      text: initialValues?.text ?? "",
      remedies: initialValues?.remedies ?? [""],
      level: initialValues?.level ?? undefined,
      tags: initialValues?.tags ?? [],
      isActive: initialValues?.isActive ?? true,
      conditions: initialValues?.conditions ?? [],
      occurrenceConditionEnabled:
        initialValues?.occurrenceConditionEnabled ?? false,
      occurrenceCondition: initialValues?.occurrenceCondition ?? {
        type: "period_and_count",
        count: 2,
        period: 2,
        periodUnit: "Minutes",
      },
    });
    setCurrentStep(AlarmFormStep.BASIC_DETAILS);
  }, [form, initialValues, open]);

  const handleSubmit = (values: AlarmFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log("Alarm template saved", values);
    }
  };

  const handleStepClick = (
    step: (typeof AlarmFormStep)[keyof typeof AlarmFormStep]
  ) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep === AlarmFormStep.BASIC_DETAILS) {
      setCurrentStep(AlarmFormStep.SET_CONDITIONS);
    } else if (currentStep === AlarmFormStep.SET_CONDITIONS) {
      setCurrentStep(AlarmFormStep.CONFIGURE_MESSAGE);
    } else if (currentStep === AlarmFormStep.CONFIGURE_MESSAGE) {
      setCurrentStep(AlarmFormStep.CONFIGURE_ACTIONS);
    }
  };

  const handlePrevious = () => {
    if (currentStep === AlarmFormStep.SET_CONDITIONS) {
      setCurrentStep(AlarmFormStep.BASIC_DETAILS);
    } else if (currentStep === AlarmFormStep.CONFIGURE_MESSAGE) {
      setCurrentStep(AlarmFormStep.SET_CONDITIONS);
    } else if (currentStep === AlarmFormStep.CONFIGURE_ACTIONS) {
      setCurrentStep(AlarmFormStep.CONFIGURE_MESSAGE);
    }
  };

  // const tagOptions = MOCK_TAGS.map((tag) => ({
  //   labelName: tag.name,
  //   values: tag.values,
  // }));

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* Header with Title */}
        <div className="space-y-4">
          <Typography
            component="h2"
            variant="2xl"
            weight="semiBold"
            className="text-foreground"
          >
            Add / Update Alarm Rule Template
          </Typography>

          {/* Breadcrumb Stepper */}
          <AlarmFormStepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === AlarmFormStep.BASIC_DETAILS && (
            <BasicDetailsStep form={form} alarmLevels={ALARM_LEVELS} />
          )}

          {currentStep === AlarmFormStep.SET_CONDITIONS && (
            <AlarmConditionsSection form={form} />
          )}

          {currentStep === AlarmFormStep.CONFIGURE_MESSAGE && (
            <ConfigureMessageStep form={form} />
          )}

          {currentStep === AlarmFormStep.CONFIGURE_ACTIONS && (
            <ConfigureActionsStep />
          )}
        </div>

        {/* Footer with Navigation Buttons */}
        <SheetFooter className="flex-row justify-between gap-3 border-t pt-4">
          <div>
            {currentStep !== AlarmFormStep.BASIC_DETAILS && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="px-6"
              >
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            {currentStep === AlarmFormStep.CONFIGURE_ACTIONS ? (
              <SubmitButton
                type="submit"
                labelIdle={mode === "edit" ? "Save Changes" : "Finish"}
                className="w-auto px-6"
              />
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="px-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save & Next
              </Button>
            )}
          </div>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default AlarmFormMultiStep;
