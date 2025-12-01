import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/atoms/button";
import { Form } from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import InputField from "@/shared/components/molecules/InputField";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/shared/components/atoms/sheet";
import Switch from "@/shared/components/atoms/switch";
import {
  userFormSchema,
  type UserFormValues,
} from "@/pages/userMaster/utils/validation";
import defaultUserValues from "@/pages/userMaster/utils/defaultUserValues";
import LabelWithRequired from "@/shared/components/molecules/labelWithRequired";
import SubmitButton from "@/shared/components/molecules/submitButton";
import { toast } from "sonner";
import CountryCodeDropDown from "@/shared/components/organisms/countryCodeDropDown";
import { Check } from "lucide-react";
import { MOCK_USERS } from "@/shared/constants/userMaster.constant";
import UserMachineSection from "@/pages/userMaster/components/organism/userMachineSection";
import type { UserMachine } from "@/pages/userMaster/components/organism/userMachineDataTable";
import { USER_MODULE_MACHINES } from "@/pages/userMaster/utils/userMachineDummyData";

export type { UserFormValues };

interface UsersFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  onUserFormChange?: (values: UserFormValues) => void;
}

const UsersFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
  onUserFormChange,
}: UsersFormSheetProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultUserValues(initialValues),
  });

  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileOtpError, setMobileOtpError] = useState("");

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpError, setEmailOtpError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    countryCode: "+91",
    label: "India",
    flag: "🇮🇳",
  });

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      role: initialValues?.role ?? "",
      customer: initialValues?.customer ?? "",
      mobile: initialValues?.mobile ?? "",
      email: initialValues?.email ?? "",
      active: initialValues?.active ?? true,
      machineCodes: initialValues?.machineCodes ?? [],
    });
    setMobileOtpSent(false);
    setMobileVerified(false);
    setMobileOtp("");
    setMobileOtpError("");
    setEmailOtpSent(false);
    setEmailVerified(false);
    setEmailOtp("");
    setEmailOtpError("");
  }, [form, initialValues, open]);

  const handleSendMobileOtp = async () => {
    const isValid = await form.trigger("mobile");
    if (!isValid) {
      return;
    }

    setMobileOtpSent(true);
    setMobileVerified(false);
    setMobileOtp("");
    setMobileOtpError("");
    toast.success("OTP sent successfully");
  };

  const handleVerifyMobileOtp = () => {
    if (!mobileOtp) {
      setMobileOtpError("Please enter the mobile OTP");
      return;
    }
    if (!/^\d{6}$/.test(mobileOtp)) {
      setMobileOtpError("OTP must be 6 digits");
      return;
    }

    setMobileOtpError("");
    setMobileVerified(true);
    toast.success("Mobile number verified successfully");
  };

  const handleSendEmailOtp = async () => {
    const isValid = await form.trigger("email");
    if (!isValid) {
      return;
    }

    setEmailOtpSent(true);
    setEmailVerified(false);
    setEmailOtp("");
    setEmailOtpError("");
    toast.success("OTP sent successfully");
  };

  const handleVerifyEmailOtp = () => {
    if (!emailOtp) {
      setEmailOtpError("Please enter the email OTP");
      return;
    }
    if (!/^\d{6}$/.test(emailOtp)) {
      setEmailOtpError("OTP must be 6 digits");
      return;
    }

    setEmailOtpError("");
    setEmailVerified(true);
    toast.success("Email verified successfully");
  };

  const handleFormSubmit = (vals: UserFormValues) => {
    let hasError = false;

    if (!mobileVerified) {
      form.setError("mobile", {
        type: "manual",
        message: "Please verify mobile number before saving",
      });
      hasError = true;
    }

    if (!emailVerified) {
      form.setError("email", {
        type: "manual",
        message: "Please verify email before saving",
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onSubmit(vals);
    toast.success(
      mode === "edit"
        ? "User updated successfully"
        : "User created successfully"
    );
  };

  const renderNameField = () => (
    <InputField
      control={form.control}
      name="name"
      label={{
        component: <LabelWithRequired text="Name" required />,
      }}
    >
      {({ field }) => <Input placeholder="Enter user name" {...field} />}
    </InputField>
  );

  const renderRoleField = () => (
    <InputField
      control={form.control}
      name="role"
      label={{
        component: <LabelWithRequired text="Role" required />,
      }}
    >
      {({ field }) => (
        <SelectField
          options={[
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" },
          ]}
          value={field.value}
          onChange={(value) => field.onChange(value)}
          placeholder="Select role"
        />
      )}
    </InputField>
  );

  const renderCustomerField = () => (
    <InputField
      control={form.control}
      name="customer"
      label={{
        component: <LabelWithRequired text="Customer" required />,
      }}
    >
      {({ field }) => {
        const customerOptions = Array.from(
          new Set(MOCK_USERS.map((user) => user.customer))
        ).map((customer) => ({ label: customer, value: customer }));

        return (
          <SelectField
            options={customerOptions}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            placeholder="Select customer"
          />
        );
      }}
    </InputField>
  );

  const renderMobileField = () => (
    <InputField
      control={form.control}
      name="mobile"
      label={{
        component: (
          <div className="flex items-center gap-2">
            <LabelWithRequired text="Mobile Number" required />
            {mobileVerified && <Check className="h-4 w-4 text-primary" />}
          </div>
        ),
      }}
    >
      {({ field }) => (
        <div className="flex gap-2">
          <CountryCodeDropDown
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            disabled={mobileOtpSent || mobileVerified}
          />
          <Input
            placeholder="Enter mobile number"
            {...field}
            className="flex-1"
            disabled={mobileOtpSent || mobileVerified}
          />
          <Button
            type="button"
            className="px-4"
            onClick={handleSendMobileOtp}
            disabled={mobileVerified}
          >
            {mobileOtpSent ? "Resend" : "Send OTP"}
          </Button>
        </div>
      )}
    </InputField>
  );

  const renderMobileOtpSection = () =>
    mobileOtpSent && (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Enter mobile OTP"
            value={mobileOtp}
            onChange={(e) => setMobileOtp(e.target.value)}
            className="flex-1"
            disabled={mobileVerified}
          />
          <Button
            type="button"
            className="px-4"
            onClick={handleVerifyMobileOtp}
            disabled={mobileVerified}
          >
            {mobileVerified ? "Verified" : "Verify"}
          </Button>
        </div>
        {mobileOtpError && (
          <p className="text-destructive text-sm mt-1">{mobileOtpError}</p>
        )}
      </div>
    );

  const renderEmailField = () => (
    <InputField
      control={form.control}
      name="email"
      label={{
        component: (
          <div className="flex items-center gap-2">
            <LabelWithRequired text="Email ID" required />
            {emailVerified && <Check className="h-4 w-4 text-primary" />}
          </div>
        ),
      }}
    >
      {({ field }) => (
        <div className="flex gap-2">
          <Input
            placeholder="Enter email address"
            {...field}
            className="flex-1"
            disabled={emailOtpSent || emailVerified}
          />
          <Button
            type="button"
            className="px-4"
            onClick={handleSendEmailOtp}
            disabled={emailVerified}
          >
            {emailOtpSent ? "Resend" : "Send OTP"}
          </Button>
        </div>
      )}
    </InputField>
  );

  const renderEmailOtpSection = () =>
    emailOtpSent && (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Enter email OTP"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
            className="flex-1"
            disabled={emailVerified}
          />
          <Button
            type="button"
            className="px-4"
            onClick={handleVerifyEmailOtp}
            disabled={emailVerified}
          >
            {emailVerified ? "Verified" : "Verify"}
          </Button>
        </div>
        {emailOtpError && (
          <p className="text-destructive text-sm mt-1">{emailOtpError}</p>
        )}
      </div>
    );

  const renderStatusSwitch = () => (
    <div className="flex items-center gap-2 pt-2">
      <Controller
        control={form.control}
        name="active"
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
            aria-label="User active status"
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border"
          />
        )}
      />
      <span className="text-sm text-foreground">Active</span>
    </div>
  );

  const selectedRole = form.watch("role");
  const selectedMachineCodes = form.watch("machineCodes") ?? [];

  // Only show machine section for "User" role, not for "Admin"
  const showMachineSection = selectedRole === "User";

  const selectedMachines: UserMachine[] = USER_MODULE_MACHINES.filter(
    (machine) => selectedMachineCodes.includes(machine.machineIdentifier)
  );

  // Check if form has unsaved changes (excluding machineCodes field)
  const { dirtyFields } = form.formState;
  const hasUnsavedUserChanges = Object.keys(dirtyFields).some(
    (key) => key !== "machineCodes"
  );

  // Can edit machines only in edit mode AND when there are no unsaved user field changes
  // If user changed role from Admin to User, they must save first before adding machines
  const canEditMachines = mode === "edit" && !hasUnsavedUserChanges;

  const handleMachinesChange = (machines: UserMachine[]) => {
    form.setValue(
      "machineCodes",
      machines.map((m) => m.machineIdentifier)
    );
    const currentValues = form.getValues();
    onUserFormChange?.(currentValues);
  };

  const renderMachineSection = () => (
    <UserMachineSection
      machines={selectedMachines}
      canAddMachines={canEditMachines}
      onChange={handleMachinesChange}
    />
  );

  const renderFooter = () => (
    <SheetFooter className="flex-row justify-end gap-3 mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>
      <SubmitButton
        labelIdle="Save User"
        labelLoading="Saving..."
        className="w-auto"
      />
    </SheetFooter>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`w-full ${
          showMachineSection ? "sm:max-w-7xl" : "sm:max-w-xl"
        }`}
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle>{mode === "edit" ? "Edit User" : "Add User"}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 lg:max-w-md flex flex-col gap-4">
                {renderNameField()}
                {renderRoleField()}
                {renderCustomerField()}
                {renderMobileField()}
                {renderMobileOtpSection()}
                {renderEmailField()}
                {renderEmailOtpSection()}
                {renderStatusSwitch()}
                {renderFooter()}
              </div>

              {showMachineSection && (
                <div className="flex-[1.5]">{renderMachineSection()}</div>
              )}
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UsersFormSheet;
