import { useState } from "react";
import { toast } from "sonner";

import CustomerGroupMasterTemplate from "@/pages/customer-groups/components/template/customerGroupMasterTemplate";
import type { ICustomerGroup } from "@/pages/customer-groups/type/customerGroupMaster";
import { MOCK_CUSTOMER_GROUPS } from "@/shared/constants/customerGroupMaster.constant";

const CustomerGroups = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerGroups, setCustomerGroups] =
    useState<ICustomerGroup[]>(MOCK_CUSTOMER_GROUPS);
  const [selectedCustomerGroup, setSelectedCustomerGroup] =
    useState<ICustomerGroup | null>(null);

  const handleSetCustomerGroups = (updatedGroups: ICustomerGroup[]) => {
    setCustomerGroups(updatedGroups);
  };

  const handleSetSelectedCustomerGroup = (
    customerGroup: ICustomerGroup | null
  ) => {
    setSelectedCustomerGroup(customerGroup);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditCustomerGroup = (values: ICustomerGroup) => {
    setCustomerGroups((previousGroups) => {
      if (selectedCustomerGroup) {
        return previousGroups.map((group) =>
          group.code === selectedCustomerGroup.code ? { ...values } : group
        );
      }

      return [{ ...values }, ...previousGroups];
    });
    toast.success(
      `Customer group ${
        selectedCustomerGroup ? "updated" : "added"
      } successfully`
    );
    setSelectedCustomerGroup(null);
    setIsModalOpen(false);
  };

  const onDeleteCustomerGroup = () => {
    if (selectedCustomerGroup) {
      setCustomerGroups((previousGroups) =>
        previousGroups.filter(
          (group) => group.code !== selectedCustomerGroup.code
        )
      );
      toast.success("Customer group deleted successfully");
      setSelectedCustomerGroup(null);
    }
  };

  return (
    <CustomerGroupMasterTemplate
      customerGroups={customerGroups}
      selectedCustomerGroup={selectedCustomerGroup}
      isModalOpen={isModalOpen}
      handleSetSelectedCustomerGroup={handleSetSelectedCustomerGroup}
      handleSetCustomerGroups={handleSetCustomerGroups}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditCustomerGroup={onAddEditCustomerGroup}
      onDeleteCustomerGroup={onDeleteCustomerGroup}
    />
  );
};

export default CustomerGroups;
