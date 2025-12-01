import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { ICustomerGroup } from "@/pages/customer-groups/type/customerGroupMaster";
import CustomerGroupDatatable from "@/pages/customer-groups/components/organisms/customerGroupDatatable";
import CustomerGroupFormSheet from "@/pages/customer-groups/components/organisms/customerGroupFormSheet";
import CustomerGroupFilter from "@/pages/customer-groups/components/organisms/customerGroupFilter";

interface CustomerGroupMasterTemplateProps {
  customerGroups: ICustomerGroup[];
  selectedCustomerGroup: ICustomerGroup | null;
  isModalOpen: boolean;
  onAddEditCustomerGroup: (values: ICustomerGroup) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetCustomerGroups: (value: ICustomerGroup[]) => void;
  handleSetSelectedCustomerGroup: (value: ICustomerGroup | null) => void;
  onDeleteCustomerGroup: () => void;
}

const CustomerGroupMasterTemplate = ({
  customerGroups,
  selectedCustomerGroup,
  isModalOpen,
  handleSetSelectedCustomerGroup,
  handleSetCustomerGroups,
  handleSetIsModalOpen,
  onAddEditCustomerGroup,
  onDeleteCustomerGroup,
}: CustomerGroupMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Customer Groups",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Define customer segments such as retail, wholesale, or VIP tiers.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <CustomerGroupFilter
          data={customerGroups}
          onFilterChange={handleSetCustomerGroups}
        />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Group"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedCustomerGroup(null);
          }}
        />
      </div>
    );
  };

  const renderCustomerGroupDatatable = () => {
    return (
      <CustomerGroupDatatable
        customerGroups={customerGroups}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedCustomerGroup={handleSetSelectedCustomerGroup}
        onDeleteCustomerGroup={onDeleteCustomerGroup}
        selectedCustomerGroup={selectedCustomerGroup}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <CustomerGroupFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditCustomerGroup}
        initialValues={selectedCustomerGroup}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderCustomerGroupDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default CustomerGroupMasterTemplate;
