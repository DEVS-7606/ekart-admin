import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";

import CustomerFilter from "@/pages/customer-master/components/organisms/customerFilter";
import type {
  CustomerLocationRow,
  CustomerRow,
} from "@/pages/customer-master/type/customerMaster";
import CustomerDatatable from "@/pages/customer-master/components/organisms/customerDatatable";
import CustomerFormSheet from "@/pages/customer-master/components/organisms/customerFormSheet";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

interface CustomerMasterTemplateProps {
  customers: CustomerRow[];
  selectedCustomer: CustomerRow | null;
  isCustomerModalOpen: boolean;
  onAddEditCustomer: (values: CustomerRow) => void;
  handleSetIsCustomerModalOpen: (value: boolean) => void;
  handleSetCustomers: (value: CustomerRow[]) => void;
  handleSetSelectedCustomer: (value: CustomerRow | null) => void;
  onChangeLocations: (updatedLocations: CustomerLocationRow[]) => void;
  onDeleteCustomer: () => void;
}

const CustomerMasterTemplate = ({
  customers,
  selectedCustomer,
  isCustomerModalOpen,
  onAddEditCustomer,
  handleSetIsCustomerModalOpen,
  handleSetCustomers,
  handleSetSelectedCustomer,
  onChangeLocations,
  onDeleteCustomer,
}: CustomerMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Customer Master",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <CustomerFilter data={customers} onFilterChange={handleSetCustomers} />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Customer"
          onClick={() => {
            handleSetIsCustomerModalOpen(true);
            handleSetSelectedCustomer(null);
          }}
        />
      </div>
    );
  };

  const renderCustomerDatatable = () => {
    return (
      <CustomerDatatable
        customersData={customers}
        handleSetIsCustomerModalOpen={handleSetIsCustomerModalOpen}
        handleSetSelectedCustomer={handleSetSelectedCustomer}
        onDeleteCustomer={onDeleteCustomer}
        selectedCustomer={selectedCustomer}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <CustomerFormSheet
        isCustomerModalOpen={isCustomerModalOpen}
        handleSetIsCustomerModalOpen={handleSetIsCustomerModalOpen}
        onSave={onAddEditCustomer}
        initialValues={selectedCustomer}
        handleSetSelectedCustomer={handleSetSelectedCustomer}
        onChangeLocations={onChangeLocations}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderCustomerDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default CustomerMasterTemplate;
