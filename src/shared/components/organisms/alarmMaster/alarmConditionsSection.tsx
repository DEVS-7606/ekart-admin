import { useMemo } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Typography } from "@/shared/components/atoms/Typography";
import { MOCK_DATA_POINT_TEMPLATES } from "@/shared/constants/dataPointMaster.constant";
import type { AlarmFormValues } from "./alarmFormMultiStep";
import PrimaryConditionSection from "./primaryConditionSection";
import OccurrenceConditionSection from "./occurrenceConditionSection";
import type { IDataPointTemplateRow } from "@/shared/types";

export type AlarmConditionsSectionProps = {
  form: UseFormReturn<AlarmFormValues>;
};

const AlarmConditionsSection = ({ form }: AlarmConditionsSectionProps) => {
  const dataPoints: IDataPointTemplateRow[] = useMemo(
    () => MOCK_DATA_POINT_TEMPLATES,
    []
  );

  return (
    <div className="space-y-6">
      <Typography component="p" variant="sm" className="text-muted-foreground">
        Set the primary conditions for alarm creation. The Occurrence Condition
        and Noise Reduction are also configured here.
      </Typography>

      <PrimaryConditionSection form={form} dataPoints={dataPoints} />
      <OccurrenceConditionSection form={form} />
    </div>
  );
};

export default AlarmConditionsSection;
