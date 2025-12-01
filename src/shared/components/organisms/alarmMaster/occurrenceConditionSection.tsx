import { type UseFormReturn } from "react-hook-form";
import { Typography } from "@/shared/components/atoms/Typography";
import Input from "@/shared/components/atoms/input";
import Switch from "@/shared/components/atoms/switch";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type { AlarmFormValues } from "./alarmFormMultiStep";

export type OccurrenceConditionSectionProps = {
  form: UseFormReturn<AlarmFormValues>;
};

const OccurrenceConditionSection = ({
  form,
}: OccurrenceConditionSectionProps) => {
  const { watch, setValue } = form;

  const occurrenceType =
    watch("occurrenceCondition.type") || "period_and_count";
  const enabled = watch("occurrenceConditionEnabled") ?? false;

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography
            component="h3"
            variant="sm"
            weight="semiBold"
            className="text-foreground"
          >
            Occurrence Condition
          </Typography>
          <Typography
            component="p"
            variant="xs"
            className="text-muted-foreground"
          >
            Primary condition matches more than one time
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={enabled}
            onCheckedChange={(checked) =>
              setValue("occurrenceConditionEnabled", checked)
            }
          />
          <Typography
            component="span"
            variant="xs"
            className="text-muted-foreground"
          >
            {enabled ? "ON" : "OFF"}
          </Typography>
        </div>
      </div>

      {enabled && (
        <div className="space-y-3">
          {/* Occurrence Type Selector */}
          <div>
            <SelectField
              value={occurrenceType}
              onChange={(val) =>
                setValue(
                  "occurrenceCondition.type",
                  val as "period_and_count" | "period" | "count"
                )
              }
              options={[
                {
                  label: "Occurrence by period & count",
                  value: "period_and_count",
                },
                { label: "Occurrence by period", value: "period" },
                { label: "Occurrence by count", value: "count" },
              ]}
              className="w-full max-w-md"
            />
          </div>

          {/* Dynamic fields based on type */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">
              Match the above condition for
            </span>

            {/* Count field - shown for period_and_count and count types */}
            {(occurrenceType === "period_and_count" ||
              occurrenceType === "count") && (
              <>
                <Input
                  type="number"
                  min="1"
                  className="h-9 w-20"
                  value={watch("occurrenceCondition.count") ?? 2}
                  onChange={(e) =>
                    setValue(
                      "occurrenceCondition.count",
                      parseInt(e.target.value) || 2
                    )
                  }
                />
                {occurrenceType === "period_and_count" && (
                  <span className="text-muted-foreground">times(s) within</span>
                )}
                {occurrenceType === "count" && (
                  <span className="text-muted-foreground">
                    times consecutively
                  </span>
                )}
              </>
            )}

            {/* Period fields - shown for period_and_count and period types */}
            {(occurrenceType === "period_and_count" ||
              occurrenceType === "period") && (
              <>
                <Input
                  type="number"
                  min="1"
                  className="h-9 w-20"
                  value={watch("occurrenceCondition.period") ?? 2}
                  onChange={(e) =>
                    setValue(
                      "occurrenceCondition.period",
                      parseInt(e.target.value) || 2
                    )
                  }
                />
                <SelectField
                  value={watch("occurrenceCondition.periodUnit") || "Minutes"}
                  onChange={(val) =>
                    setValue(
                      "occurrenceCondition.periodUnit",
                      val as "Minutes" | "Hours" | "Days"
                    )
                  }
                  options={["Minutes", "Hours", "Days"]}
                  className="w-32"
                />
                <span className="text-muted-foreground">continuously</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OccurrenceConditionSection;
