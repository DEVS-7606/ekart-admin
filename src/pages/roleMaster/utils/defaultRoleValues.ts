import type { RoleFormValues } from "@/pages/roleMaster/utils/validation";

const defaultRoleValues = (
  initial?: Partial<RoleFormValues>
): RoleFormValues => ({
  name: initial?.name ?? "",
  description: initial?.description ?? "",
  policyIds: initial?.policyIds ?? [],
});

export default defaultRoleValues;
