import { Controller, type UseFormReturn } from "react-hook-form";
import { Typography } from "@/shared/components/atoms/Typography";
import Input from "@/shared/components/atoms/input";
import Textarea from "@/shared/components/atoms/textarea";
import Switch from "@/shared/components/atoms/switch";
import InputField from "@/shared/components/molecules/InputField";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import TagSelection from "@/shared/components/organisms/tagSelection";
import { MOCK_TAGS } from "@/shared/constants/tagsMaster.constant";
import type { ITag } from "@/shared/types";
import type { AlarmFormValues } from "../alarmFormMultiStep";

type BasicDetailsStepProps = {
  form: UseFormReturn<AlarmFormValues>;
  alarmLevels: readonly string[];
};

const BasicDetailsStep = ({ form, alarmLevels }: BasicDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <Typography component="p" variant="sm" className="text-muted-foreground">
        Provide basic information for your new alarm template.
      </Typography>

      <InputField
        control={form.control}
        name="name"
        label={{
          component: (
            <Typography
              component="span"
              variant="sm"
              className="text-foreground"
            >
              Alarm Template Name
              <Typography
                component="span"
                variant="sm"
                className="text-destructive ml-0.5"
              >
                *
              </Typography>
            </Typography>
          ),
        }}
      >
        {({ field }) => (
          <Input {...field} placeholder="e.g., High CPU Utilization Alert" />
        )}
      </InputField>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3">
        <div className="space-y-1">
          <Typography
            component="p"
            variant="sm"
            weight="semiBold"
            className="text-foreground"
          >
            Alarm Status
          </Typography>
          <Typography
            component="p"
            variant="xs"
            className="text-muted-foreground"
          >
            Toggle to mark this alarm as active or inactive.
          </Typography>
        </div>
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => {
            const checked = field.value ?? true;
            return (
              <div className="flex items-center gap-2">
                <Switch
                  checked={checked}
                  onCheckedChange={(next) => field.onChange(next)}
                  className={`${checked ? "bg-primary!" : ""}`}
                />
                <Typography
                  component="span"
                  variant="xs"
                  className="text-muted-foreground"
                >
                  {checked ? "Active" : "Inactive"}
                </Typography>
              </div>
            );
          }}
        />
      </div>

      <InputField
        control={form.control}
        name="level"
        label={{
          component: (
            <Typography
              component="span"
              variant="sm"
              className="text-foreground"
            >
              Severity / Alarm Level
              <Typography
                component="span"
                variant="sm"
                className="text-destructive ml-0.5"
              >
                *
              </Typography>
            </Typography>
          ),
        }}
      >
        {() => (
          <Controller
            control={form.control}
            name="level"
            render={({ field }) => (
              <SelectField
                options={alarmLevels as string[]}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select severity"
              />
            )}
          />
        )}
      </InputField>

      <InputField
        className="w-full"
        control={form.control}
        name="description"
        label={{
          component: (
            <Typography
              component="span"
              variant="sm"
              className="text-foreground"
            >
              Description
            </Typography>
          ),
        }}
      >
        {({ field }) => (
          <Textarea
            {...field}
            rows={4}
            placeholder="A brief explanation of the alarm's purpose, scope, and expected behavior."
          />
        )}
      </InputField>

      <div className="space-y-3">
        <InputField
          control={form.control}
          name="tags"
          formItem={{ className: "space-y-3" }}
        >
          {({ field }) => {
            const currentChipValues =
              (field.value as string[] | undefined) ?? [];

            const defaultTags: ITag[] = currentChipValues
              .map((chip) => {
                const [rawLabel, ...rawValueParts] = chip.split(":");
                const label = rawLabel?.trim();
                const valueString = rawValueParts.join(":").trim();
                if (!label || !valueString) return null;

                const baseTag = MOCK_TAGS.find((tag) => tag.name === label);
                if (!baseTag) return null;

                return {
                  ...baseTag,
                  values: valueString,
                } as ITag;
              })
              .filter((tag): tag is ITag => tag !== null);

            return (
              <TagSelection
                options={MOCK_TAGS}
                placeholder="Search Label to attach"
                defaultValue={defaultTags}
                onChange={(selectedTags) => {
                  const chips = selectedTags.map((tag) => {
                    const value = Array.isArray(tag.values)
                      ? tag.values.join(", ")
                      : String(tag.values);
                    return `${tag.name}: ${value}`;
                  });
                  field.onChange(chips);
                }}
                label={{
                  label: "Labels Attachments",
                  component: "p",
                  variant: "2xl",
                }}
                needAttachmentLabel={true}
              />
            );
          }}
        </InputField>
      </div>
    </div>
  );
};

export default BasicDetailsStep;
