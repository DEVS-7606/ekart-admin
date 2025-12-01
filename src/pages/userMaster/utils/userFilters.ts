import type { User } from "@/pages/userMaster/components/organism/userDataTable";
import type { UserFilters } from "@/pages/userMaster/components/organism/userMasterFilterPopover";

export const matchesFilters = (user: User, filters: UserFilters) => {
    if (filters.role !== "all" && user.role !== filters.role) return false;

    if (
        filters.customer &&
        !user.customer.toLowerCase().includes(filters.customer.toLowerCase())
    ) {
        return false;
    }

    return true;
};
