import { useState } from "react";
import CustomerMasterTemplate from "@/pages/customer-master/components/template/customerMasterTemplate";
import type {
  CustomerLocationRow,
  CustomerRow,
} from "@/pages/customer-master/type/customerMaster";
import { customerMasterMockData } from "@/shared/constants/customerMaster.constant";
import { toast } from "sonner";

const CustomerMaster = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerRow[]>(
    customerMasterMockData
  );
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRow | null>(
    null
  );

  const handleSetSelectedCustomer = (selectedCustomer: CustomerRow | null) => {
    setSelectedCustomer(selectedCustomer);
  };

  const handleSetCustomers = (selectedCustomer: CustomerRow[]) => {
    setCustomers(selectedCustomer);
  };

  const handleSetIsCustomerModalOpen = (value: boolean) => {
    setIsCustomerModalOpen(value);
  };

  const onAddEditCustomer = (values: CustomerRow) => {
    setCustomers((previousCustomers) => {
      if (selectedCustomer) {
        return previousCustomers.map((customer) =>
          customer.code === selectedCustomer.code ? { ...values } : customer
        );
      }

      return [{ ...values }, ...previousCustomers];
    });
    toast.success(
      `Customer ${selectedCustomer ? "updated" : "added"} successfully`
    );
    setSelectedCustomer(null);
  };

  const onChangeLocations = (updatedLocations: CustomerLocationRow[]) => {
    setCustomers((previousCustomers) => {
      if (selectedCustomer) {
        return previousCustomers.map((customer) =>
          customer.code === selectedCustomer.code
            ? { ...customer, locations: updatedLocations }
            : customer
        );
      }
      return previousCustomers;
    });
  };

  const onDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers((previousCustomers) =>
        previousCustomers.filter(
          (customer) => customer.code !== selectedCustomer.code
        )
      );
      toast.success("Customer deleted successfully");
    }
  };

  return (
    <CustomerMasterTemplate
      customers={customers}
      selectedCustomer={selectedCustomer}
      isCustomerModalOpen={isCustomerModalOpen}
      handleSetSelectedCustomer={handleSetSelectedCustomer}
      handleSetCustomers={handleSetCustomers}
      handleSetIsCustomerModalOpen={handleSetIsCustomerModalOpen}
      onAddEditCustomer={onAddEditCustomer}
      onChangeLocations={onChangeLocations}
      onDeleteCustomer={onDeleteCustomer}
    />
  );
};

export default CustomerMaster;
