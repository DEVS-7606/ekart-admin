import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";
import PaymentMethodDatatable from "@/pages/payment-methods/components/organisms/paymentMethodDatatable";
import PaymentMethodFormSheet from "@/pages/payment-methods/components/organisms/paymentMethodFormSheet";
import PaymentMethodFilter from "@/pages/payment-methods/components/organisms/paymentMethodFilter";

interface PaymentMethodMasterTemplateProps {
  paymentMethods: IPaymentMethod[];
  selectedPaymentMethod: IPaymentMethod | null;
  isModalOpen: boolean;
  onAddEditPaymentMethod: (values: IPaymentMethod) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetPaymentMethods: (value: IPaymentMethod[]) => void;
  handleSetSelectedPaymentMethod: (value: IPaymentMethod | null) => void;
  onDeletePaymentMethod: () => void;
}

const PaymentMethodMasterTemplate = ({
  paymentMethods,
  selectedPaymentMethod,
  isModalOpen,
  handleSetSelectedPaymentMethod,
  handleSetPaymentMethods,
  handleSetIsModalOpen,
  onAddEditPaymentMethod,
  onDeletePaymentMethod,
}: PaymentMethodMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Payment Methods",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Configure payment gateways and methods such as UPI, cards, and COD.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <PaymentMethodFilter
          data={paymentMethods}
          onFilterChange={handleSetPaymentMethods}
        />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Method"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedPaymentMethod(null);
          }}
        />
      </div>
    );
  };

  const renderPaymentMethodDatatable = () => {
    return (
      <PaymentMethodDatatable
        paymentMethods={paymentMethods}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedPaymentMethod={handleSetSelectedPaymentMethod}
        onDeletePaymentMethod={onDeletePaymentMethod}
        selectedPaymentMethod={selectedPaymentMethod}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <PaymentMethodFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditPaymentMethod}
        initialValues={selectedPaymentMethod}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderPaymentMethodDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default PaymentMethodMasterTemplate;
