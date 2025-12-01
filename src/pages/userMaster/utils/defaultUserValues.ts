import type { UserFormValues } from "@/pages/userMaster/utils/validation";

const defaultUserValues = (
  initial?: Partial<UserFormValues>
): UserFormValues => ({
  name: initial?.name ?? "",
  role: initial?.role ?? "",
  customer: initial?.customer ?? "",
  mobile: initial?.mobile ?? "",
  email: initial?.email ?? "",
  active: initial?.active ?? true,
  machineCodes: initial?.machineCodes ?? [],
});

export default defaultUserValues;
