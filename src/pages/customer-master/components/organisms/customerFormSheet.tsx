import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import SheetHeader from "@/shared/components/molecules/sheetHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/atoms/tabs";
import CustomerDetailForm from "@/pages/customer-master/components/organisms/customerDetailForm";
import type {
  CustomerLocationRow,
  CustomerRow,
} from "@/pages/customer-master/type/customerMaster";
import CustomerLocations from "@/pages/customer-master/components/organisms/customerLocations";

interface CustomerFormSheetProps {
  isCustomerModalOpen: boolean;
  handleSetIsCustomerModalOpen: (value: boolean) => void;
  onSave: (values: CustomerRow) => void;
  initialValues: CustomerRow | null;
  handleSetSelectedCustomer: (customer: CustomerRow | null) => void;
  onChangeLocations: (updatedLocations: CustomerLocationRow[]) => void;
}

const CustomerFormSheet = ({
  isCustomerModalOpen,
  handleSetIsCustomerModalOpen,
  onSave,
  initialValues,
  handleSetSelectedCustomer,
  onChangeLocations,
}: CustomerFormSheetProps) => {
  const sheetTitle = initialValues ? "Edit Customer" : "Add Customer";

  const [locations, setLocations] = useState<CustomerLocationRow[]>(
    initialValues?.locations || []
  );

  useEffect(() => {
    setLocations(initialValues?.locations || []);
  }, [initialValues]);

  const handleSave = (values: CustomerRow) => {
    const merged = { ...values, locations };
    onSave(merged);
    if (!initialValues) {
      handleSetSelectedCustomer(merged);
    } else {
      handleSetIsCustomerModalOpen(false);
    }
  };

  const handleLocationsChange = (updated: CustomerLocationRow[]) => {
    setLocations(updated);
    onChangeLocations(updated);
  };

  const handleCancel = () => {
    handleSetIsCustomerModalOpen(false);
  };

  const renderSheetHeader = () => {
    return (
      <SheetHeader
        title={sheetTitle}
        description="Fill in the details to create or update a customer."
      />
    );
  };

  const renderTabs = () => {
    return (
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        {initialValues && (
          <TabsTrigger value="locations">Locations</TabsTrigger>
        )}
      </TabsList>
    );
  };

  const renderTabsContent = () => {
    return (
      <>
        <TabsContent value="details" className="mt-4">
          <CustomerDetailForm
            onSave={handleSave}
            onCancel={handleCancel}
            initialValues={initialValues}
          />
        </TabsContent>
        <TabsContent value="locations" className="mt-4">
          <CustomerLocations
            locations={locations}
            onChangeLocations={handleLocationsChange}
          />
        </TabsContent>
      </>
    );
  };

  return (
    <Sheet
      open={isCustomerModalOpen}
      onOpenChange={handleSetIsCustomerModalOpen}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-6xl p-0 flex h-full flex-col"
        onInteractOutside={(event) => event.preventDefault()}
      >
        {renderSheetHeader()}
        <Tabs
          defaultValue="details"
          className="w-full flex-1 overflow-auto px-6 py-4"
        >
          {renderTabs()}
          {renderTabsContent()}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerFormSheet;
