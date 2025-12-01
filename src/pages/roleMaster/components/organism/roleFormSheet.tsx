import { useEffect } from "react";
import type { RoleFormValues } from "@/pages/roleMaster/utils/validation";
import { roleFormSchema } from "@/pages/roleMaster/utils/validation";
import type { TemplateMode } from "@/shared/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/atoms/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import Textarea from "@/shared/components/atoms/textarea";
import LabelWithRequired from "@/shared/components/molecules/labelWithRequired";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/atoms/sheet";
import RolePolicySection from "@/pages/roleMaster/components/organism/rolePolicySection";
import defaultRoleValues from "@/pages/roleMaster/utils/defaultRoleValues";
import { MOCK_ROLE_POLICIES } from "@/shared/constants/roleMaster.constant";
import type { RolePolicy } from "@/pages/roleMaster/components/organism/rolePolicyDataTable";

interface RoleFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: TemplateMode;
  initialValues?: Partial<RoleFormValues>;
  canEditPolicies: boolean;
  onRoleFormChange: (values: RoleFormValues) => void;
  onSubmit: (values: RoleFormValues) => void;
}

const RoleFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  canEditPolicies,
  onRoleFormChange,
  onSubmit,
}: RoleFormSheetProps) => {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: defaultRoleValues(initialValues),
  });

  useEffect(() => {
    form.reset(defaultRoleValues(initialValues));
  }, [form, initialValues, open]);

  const selectedPolicyIds = form.watch("policyIds") ?? [];

  const selectedPolicies: RolePolicy[] = MOCK_ROLE_POLICIES.filter((policy) =>
    selectedPolicyIds.includes(policy.id)
  );

  const renderHeader = () => (
    <SheetHeader>
      <SheetTitle>{mode === "edit" ? "Edit Role" : "Add Role"}</SheetTitle>
    </SheetHeader>
  );

  const renderNameField = () => (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <LabelWithRequired text="Name" required />
          </FormLabel>
          <FormControl>
            <Input placeholder="Enter Role name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderDescriptionField = () => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter description"
              className="min-h-[96px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const handlePoliciesChange = (policies: RolePolicy[]) => {
    form.setValue(
      "policyIds",
      policies.map((p) => p.id)
    );
    const currentValues = form.getValues();
    onRoleFormChange(currentValues);
  };

  const renderPolicySection = () => (
    <RolePolicySection
      policies={selectedPolicies}
      canAddPolicies={canEditPolicies}
      onChange={handlePoliciesChange}
    />
  );

  const renderFooter = () => (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>
      <Button type="submit">{mode === "edit" ? "Update" : "Save"}</Button>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-7xl"
        aria-describedby={undefined}
      >
        {renderHeader()}
        <Form {...form}>
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={form.handleSubmit((vals) => onSubmit(vals))}
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 lg:max-w-md flex flex-col gap-4">
                {renderNameField()}
                {renderDescriptionField()}
                {renderFooter()}
              </div>

              <div className="flex-[1.5]">{renderPolicySection()}</div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default RoleFormSheet;
