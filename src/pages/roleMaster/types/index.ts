export type Role = {
    id: number;
    name: string;
    description?: string;
    policies?: number; // count of attached policies
    policyIds?: number[]; // selected policy IDs for this role
};

export type { RoleFormValues } from "@/pages/roleMaster/utils/validation";
