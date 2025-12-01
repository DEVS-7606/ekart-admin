import { type UseFormReturn } from "react-hook-form";
import { Typography } from "@/shared/components/atoms/Typography";
import Textarea from "@/shared/components/atoms/textarea";
import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import InputField from "@/shared/components/molecules/InputField";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import { InfoIcon, Plus } from "lucide-react";
import type { AlarmFormValues } from "../alarmFormMultiStep";

type ConfigureMessageStepProps = {
  form: UseFormReturn<AlarmFormValues>;
};

const ConfigureMessageStep = ({ form }: ConfigureMessageStepProps) => {
  const { control, watch, trigger, setValue } = form;
  const formValues = watch();
  const remedies = watch("remedies") ?? [];

  const handleAddRemedy = () => {
    const last = remedies[remedies.length - 1];
    if (remedies.length === 0 || (last && last.trim().length > 0)) {
      setValue("remedies", [...remedies, ""]);
    }
  };

  const hasAtLeastOneUrl = remedies.some(
    (url) => (url ?? "").trim().length > 0
  );

  return (
    <div className="space-y-6">
      <Typography component="p" variant="sm" className="text-muted-foreground">
        Configure the message to be used in the alarm when the conditions are
        met and the alarm is generated.
      </Typography>

      {/* Message Input */}
      <div className="space-y-2">
        <Typography
          component="span"
          variant="sm"
          className="text-foreground block"
        >
          Message
        </Typography>
        <InputField className="w-full" control={form.control} name="text">
          {({ field }) => (
            <Textarea
              {...field}
              rows={4}
              placeholder="Example: %{sensor_name} reported %{current_value} which is less than the threshold %{threshold_value}. The current state is: %{state}."
              className="resize-none"
            />
          )}
        </InputField>
        <Typography
          component="p"
          variant="xs"
          className="text-muted-foreground"
        >
          Type # in the text area to see the list of placeholders.
        </Typography>
      </div>

      {/* Information Box */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex gap-2">
          <InfoIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <Typography
              component="p"
              variant="xs"
              weight="semiBold"
              className="text-foreground mb-1"
            >
              Information
            </Typography>
            <Typography
              component="p"
              variant="xs"
              className="text-muted-foreground"
            >
              The alarm message field has maximum limit of 500 characters. The
              text will be shorten automatically if it exceeds the limit after
              replacing the placeholder values.
            </Typography>
          </div>
        </div>
      </div>

      {/* Remedies Section */}
      <div className="space-y-3 border-t border-border pt-6">
        <TitleAndSubtitle
          className="mb-2"
          title={{
            component: "h3",
            variant: "sm",
            weight: "semiBold",
            className: "text-foreground",
            text: "Remedies",
          }}
          subtitle={{
            component: "p",
            variant: "xs",
            className: "text-muted-foreground",
            text: "Add one or more URLs that describe how to resolve this alarm.",
          }}
        />

        <div className="space-y-2">
          {remedies.map((_, index) => (
            <div key={index} className="flex items-baseline gap-3">
              <InputField
                control={control}
                name={`remedies.${index}` as `remedies.${number}`}
                className="flex-1"
              >
                {({ field }) => (
                  <Input {...field} type="url" placeholder="Enter remedy URL" />
                )}
              </InputField>

              {index === remedies.length - 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-1 h-10 w-10 rounded-full border border-dashed text-muted-foreground hover:text-primary"
                  onClick={handleAddRemedy}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {hasAtLeastOneUrl && (
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="px-4"
              onClick={() => trigger("remedies")}
            >
              Save Remedies
            </Button>
          </div>
        )}
      </div>

      {/* Other Alarm Properties */}
      <div className="space-y-4 border-t border-border pt-6">
        <Typography
          component="h3"
          variant="sm"
          weight="semiBold"
          className="text-foreground"
        >
          Other Alarm Properties
        </Typography>

        <div className="space-y-3">
          {/* Alarm Name */}
          {formValues.name && (
            <div className="flex items-start gap-4">
              <Typography
                component="span"
                variant="sm"
                className="text-muted-foreground w-32 shrink-0"
              >
                Alarm Name
              </Typography>
              <Typography
                component="span"
                variant="sm"
                className="text-foreground"
              >
                {formValues.name}
              </Typography>
            </div>
          )}

          {/* Source */}
          {formValues.description && (
            <div className="flex items-start gap-4">
              <Typography
                component="span"
                variant="sm"
                className="text-muted-foreground w-32 shrink-0"
              >
                Description
              </Typography>
              <Typography
                component="span"
                variant="sm"
                className="text-foreground"
              >
                {formValues.description}
              </Typography>
            </div>
          )}

          {/* Severity */}
          {formValues.level && (
            <div className="flex items-start gap-4">
              <Typography
                component="span"
                variant="sm"
                className="text-muted-foreground w-32 shrink-0"
              >
                Severity
              </Typography>
              <Typography
                component="span"
                variant="sm"
                weight="semiBold"
                className="text-foreground"
              >
                {formValues.level}
              </Typography>
            </div>
          )}

          {/* Tags */}
          {formValues.tags && (
            <div className="flex items-start gap-4">
              <Typography
                component="span"
                variant="sm"
                className="text-muted-foreground w-32 shrink-0"
              >
                Tags
              </Typography>
              <div className="flex flex-wrap gap-2">
                {formValues.tags &&
                  formValues.tags.length > 0 &&
                  formValues.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigureMessageStep;
