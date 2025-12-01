import { useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Typography } from "@/shared/components/atoms/Typography";
import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import InputField from "@/shared/components/molecules/InputField";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type { AlarmFormValues } from "./alarmFormMultiStep";
import type { IDataPointTemplateRow } from "@/shared/types";

export type PrimaryConditionSectionProps = {
  form: UseFormReturn<AlarmFormValues>;
  dataPoints: IDataPointTemplateRow[];
};

type BaseType = "number" | "boolean" | "string";

// Available comparison operators for numeric data types
const NUMBER_OPERATORS = ["<", "<=", "=", "!=", ">=", ">"] as const;

// Available comparison operators for boolean and string data types
const EQUALITY_OPERATORS = ["=", "!="] as const;

/**
 * Determines the base type (number, boolean, or string) from a datapoint's data type string.
 * Used to decide which operators are valid and how to render the threshold input.
 */
const getBaseType = (dataType: string): BaseType => {
  const normalizedType = dataType.toLowerCase();

  if (
    normalizedType.includes("int") ||
    normalizedType.includes("float") ||
    normalizedType.includes("real")
  ) {
    return "number";
  }

  if (normalizedType.includes("bool")) {
    return "boolean";
  }

  return "string";
};

/**
 * Returns the list of valid comparison operators for a given data type.
 * Numeric types get full comparison operators (<, <=, =, !=, >=, >).
 * Boolean and string types only get equality operators (=, !=).
 */
const getOperatorsForType = (dataType: string) => {
  const baseType = getBaseType(dataType);
  return baseType === "number" ? NUMBER_OPERATORS : EQUALITY_OPERATORS;
};

/**
 * Formats a threshold value for display in the criteria expression preview.
 * String values are wrapped in quotes, while numbers and booleans are shown as-is.
 */
const formatThresholdForPreview = (threshold: string, dataType: string) => {
  const baseType = getBaseType(dataType);
  return baseType === "string" ? `"${threshold}"` : threshold;
};

const PrimaryConditionSection = ({
  form,
  dataPoints,
}: PrimaryConditionSectionProps) => {
  const { control, watch, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    name: "conditions",
    control,
  });

  const conditions = watch("conditions") ?? [];

  // Track which condition indices have validation errors
  const [validationErrors, setValidationErrors] = useState<Set<number>>(
    new Set()
  );

  /**
   * Checks if a condition has all required fields filled (datapoint, operator, threshold).
   */
  const isConditionComplete = (
    condition:
      | {
          datapointCode?: string;
          operator?: string;
          threshold?: string;
        }
      | undefined
  ): boolean => {
    if (!condition) return false;

    return Boolean(
      condition.datapointCode && condition.operator && condition.threshold
    );
  };

  /**
   * Validates all existing conditions and marks incomplete ones with errors.
   * Returns true if all conditions are complete, false otherwise.
   */
  const validateAllConditions = (): boolean => {
    if (fields.length === 0) return true;

    const errors = new Set<number>();
    conditions.forEach((condition, index) => {
      if (!isConditionComplete(condition)) {
        errors.add(index);
      }
    });

    setValidationErrors(errors);
    return errors.size === 0;
  };

  /**
   * Adds a new empty condition to the conditions array.
   * First validates all existing conditions. Only adds if all are complete.
   */
  const handleAddCondition = () => {
    if (!validateAllConditions()) {
      return;
    }

    setValidationErrors(new Set());
    append({
      datapointCode: "",
      datapointName: "",
      dataType: "",
      operator: "",
      threshold: "",
      logicalOperator: fields.length > 0 ? "AND" : undefined,
    });
  };

  /**
   * Handles the selection of a datapoint for a specific condition.
   * Automatically populates the datapoint name, data type, and sets a default operator.
   */
  const handleDatapointChange = (index: number, datapointCode: string) => {
    const selectedDataPoint = dataPoints.find(
      (dp) => dp.code === datapointCode
    );
    if (!selectedDataPoint) return;

    const availableOperators = getOperatorsForType(selectedDataPoint.dataType);
    const defaultOperator = availableOperators[0] ?? "=";

    setValue(`conditions.${index}.datapointCode`, selectedDataPoint.code);
    setValue(`conditions.${index}.datapointName`, selectedDataPoint.name);
    setValue(`conditions.${index}.dataType`, selectedDataPoint.dataType);
    setValue(`conditions.${index}.operator`, defaultOperator);
    setValue(`conditions.${index}.threshold`, "");

    if (validationErrors.has(index)) {
      const newErrors = new Set(validationErrors);
      newErrors.delete(index);
      setValidationErrors(newErrors);
    }
  };

  /**
   * Builds a human-readable criteria expression from all valid conditions.
   */
  const buildCriteriaExpression = (): string => {
    if (!conditions.length) return "";

    const validConditions = conditions.filter(
      (condition) =>
        condition &&
        condition.datapointName &&
        condition.operator &&
        condition.threshold
    );

    if (!validConditions.length) return "";

    return validConditions
      .map((condition, index) => {
        const formattedThreshold = formatThresholdForPreview(
          condition.threshold,
          condition.dataType || ""
        );
        const conditionClause = `${condition.datapointName} ${condition.operator} ${formattedThreshold}`;

        if (index === 0) return conditionClause;

        const logicalConnector = condition.logicalOperator ?? "AND";
        return `${logicalConnector} ${conditionClause}`;
      })
      .join(" ");
  };

  const criteriaExpression = buildCriteriaExpression();

  return (
    <div className="space-y-4">
      <Typography
        component="h3"
        variant="sm"
        weight="semiBold"
        className="text-foreground"
      >
        Primary Condition
      </Typography>

      <div className="space-y-3">
        {fields.map((field, index) => {
          const condition = conditions[index] ?? {};
          const availableOperators = getOperatorsForType(
            condition.dataType || ""
          );
          const baseType = getBaseType(condition.dataType || "");
          const nextCondition = conditions[index + 1];
          const hasValidationError = validationErrors.has(index);

          const fieldErrors = {
            datapoint: hasValidationError && !condition.datapointCode,
            operator: hasValidationError && !condition.operator,
            threshold: hasValidationError && !condition.threshold,
          };

          return (
            <>
              <div
                key={field.id}
                className={`flex flex-col gap-2 rounded-lg border bg-card p-3 ${
                  hasValidationError
                    ? "border-destructive bg-destructive/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-foreground">
                    {index + 1}
                  </span>
                  <span>Condition #{index + 1}</span>
                </div>

                <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)_auto] gap-3 items-center">
                  {/* Datapoint */}
                  <div>
                    <Typography
                      component="span"
                      variant="xs"
                      className="mb-1 block text-muted-foreground"
                    >
                      Datapoint
                    </Typography>
                    <SelectField
                      value={condition.datapointCode || ""}
                      onChange={(code) => handleDatapointChange(index, code)}
                      placeholder="Select datapoint"
                      options={dataPoints.map((dp) => ({
                        label: dp.name,
                        value: dp.code,
                      }))}
                      className="w-full"
                    />
                    <div className="h-4 mt-1">
                      <Typography
                        component="p"
                        variant="xs"
                        className={
                          fieldErrors.datapoint
                            ? "text-destructive"
                            : "invisible"
                        }
                      >
                        Datapoint is required
                      </Typography>
                    </div>
                  </div>

                  {/* Operator */}
                  <div>
                    <Typography
                      component="span"
                      variant="xs"
                      className="mb-1 block text-slate-500"
                    >
                      Operator
                    </Typography>
                    <SelectField
                      value={condition.operator || ""}
                      onChange={(operator) => {
                        setValue(`conditions.${index}.operator`, operator);
                        if (validationErrors.has(index)) {
                          const newErrors = new Set(validationErrors);
                          newErrors.delete(index);
                          setValidationErrors(newErrors);
                        }
                      }}
                      disabled={!condition.dataType}
                      placeholder="---"
                      options={Array.from(availableOperators)}
                      className="w-full"
                    />
                    <div className="h-4 mt-1">
                      <Typography
                        component="p"
                        variant="xs"
                        className={
                          fieldErrors.operator
                            ? "text-destructive"
                            : "invisible"
                        }
                      >
                        Operator is required
                      </Typography>
                    </div>
                  </div>

                  {/* Threshold */}
                  <div>
                    <Typography
                      component="span"
                      variant="xs"
                      className="mb-1 block text-slate-500"
                    >
                      Threshold
                    </Typography>
                    {baseType === "boolean" ? (
                      <SelectField
                        value={condition.threshold || ""}
                        onChange={(val) =>
                          setValue(`conditions.${index}.threshold`, val)
                        }
                        disabled={!condition.dataType}
                        placeholder="Select value"
                        options={[
                          { label: "True", value: "true" },
                          { label: "False", value: "false" },
                        ]}
                        className="w-full"
                      />
                    ) : (
                      <InputField
                        control={control}
                        name={
                          `conditions.${index}.threshold` as `conditions.${number}.threshold`
                        }
                      >
                        {({ field }) => (
                          <Input
                            {...field}
                            type={baseType === "number" ? "number" : "text"}
                            className=""
                            placeholder={
                              baseType === "number"
                                ? "Enter numeric value"
                                : "Enter value"
                            }
                            value={field.value ?? ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              if (validationErrors.has(index)) {
                                const newErrors = new Set(validationErrors);
                                newErrors.delete(index);
                                setValidationErrors(newErrors);
                              }
                            }}
                            disabled={!condition.dataType}
                          />
                        )}
                      </InputField>
                    )}
                    <div className="h-4 mt-1">
                      <Typography
                        component="p"
                        variant="xs"
                        className={
                          fieldErrors.threshold
                            ? "text-destructive"
                            : "invisible"
                        }
                      >
                        Threshold is required
                      </Typography>
                    </div>
                  </div>

                  {/* Remove button */}
                  <div className="flex items-center justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 px-2 text-xs text-destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Logical operator between conditions */}
                {index < fields.length - 1 && (
                  <div className="flex items-center justify-center py-2">
                    <SelectField
                      value={nextCondition?.logicalOperator ?? "AND"}
                      onChange={(operator) =>
                        setValue(
                          `conditions.${index + 1}.logicalOperator`,
                          operator as "AND" | "OR"
                        )
                      }
                      options={["AND", "OR"]}
                      className="w-24"
                    />
                  </div>
                )}
              </div>
            </>
          );
        })}

        {fields.length === 0 && (
          <Typography
            component="p"
            variant="xs"
            className="text-muted-foreground"
          >
            No conditions added yet. Add at least one condition to proceed.
          </Typography>
        )}

        <div className="space-y-2">
          <Button type="button" variant="outline" onClick={handleAddCondition}>
            Add Condition
          </Button>
        </div>
      </div>

      {/* Criteria pattern preview */}
      <div className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Criteria Pattern:</span>{" "}
        {criteriaExpression || "(no valid conditions yet)"}
      </div>
    </div>
  );
};

export default PrimaryConditionSection;
