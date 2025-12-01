import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/atoms/form";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type { CustomerLocationRow } from "@/pages/customer-master/type/customerMaster";
import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";
import Textarea from "@/shared/components/atoms/textarea";
import LabelWithRequired from "@/shared/components/molecules/labelWithRequired";
import CountryCodeDropDown from "@/shared/components/organisms/countryCodeDropDown";

const defaultLocationValues: CustomerLocationRow = {
  locationName: "",
  locationShortName: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  timezone: "",
  mobileNo: "",
  email: "",
  longitude: "",
  latitude: "",
  description: "",
};

interface CustomerLocationDetailFormProps {
  onSave: (values: CustomerLocationRow) => void;
  onCancel: () => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (value: boolean) => void;
  initialValues?: CustomerLocationRow | null;
}

const CustomerLocationDetailForm = ({
  isLocationModalOpen,
  setIsLocationModalOpen,
  onSave,
  onCancel,
  initialValues,
}: CustomerLocationDetailFormProps) => {
  const form = useForm<CustomerLocationRow>({
    defaultValues: initialValues ?? defaultLocationValues,
    mode: "onBlur",
  });

  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    countryCode: "+91",
    label: "India",
    flag: "🇮🇳",
  });

  useEffect(() => {
    form.reset(initialValues ?? defaultLocationValues);
  }, [initialValues]);

  const title = initialValues ? "Edit Location" : "Add Location";

  const handleSubmit = (values: CustomerLocationRow) => {
    onSave(values);
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderLocationNameFormField = () => {
    return (
      <FormField
        control={form.control}
        name="locationName"
        rules={{ required: "Location name is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Location Name" required />
            </FormLabel>
            <FormControl>
              <Input
                id="location-name"
                placeholder="Enter Location"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderLocationShortNameFormField = () => {
    return (
      <FormField
        control={form.control}
        name="locationShortName"
        rules={{ required: "Short name is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Short Name" required />
            </FormLabel>
            <FormControl>
              <Input
                id="location-short-name"
                placeholder="Enter short name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderAddressFormField = () => {
    return (
      <FormField
        control={form.control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Address" required />
            </FormLabel>
            <FormControl>
              <Textarea
                id="location-address"
                placeholder="Provide a detailed address"
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderCityFormField = () => {
    return (
      <FormField
        control={form.control}
        name="city"
        rules={{ required: "City is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="City" required />
            </FormLabel>
            <FormControl>
              <SelectField
                placeholder="Select City"
                options={[
                  { label: "Mumbai", value: "Mumbai" },
                  { label: "Delhi", value: "Delhi" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderStateFormField = () => {
    return (
      <FormField
        control={form.control}
        name="state"
        rules={{ required: "State is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="State" required />
            </FormLabel>
            <FormControl>
              <SelectField
                placeholder="Select State"
                options={[
                  { label: "Maharashtra", value: "Maharashtra" },
                  { label: "Karnataka", value: "Karnataka" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderCountryFormField = () => {
    return (
      <FormField
        control={form.control}
        name="country"
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Country" required />
            </FormLabel>
            <FormControl>
              <SelectField
                placeholder="Select Country"
                options={[{ label: "India", value: "India" }]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderPincodeFormField = () => {
    return (
      <FormField
        control={form.control}
        name="pincode"
        rules={{ required: "Pincode is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Pincode" required />
            </FormLabel>
            <FormControl>
              <Input
                id="location-pincode"
                placeholder="Enter pincode"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderTimezoneFormField = () => {
    return (
      <FormField
        control={form.control}
        name="timezone"
        rules={{ required: "Timezone is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Timezone" required />
            </FormLabel>
            <FormControl>
              <SelectField
                placeholder="Select Timezone"
                options={[
                  { label: "IST (UTC+5:30)", value: "IST" },
                  { label: "UTC", value: "UTC" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderMobileFormField = () => {
    return (
      <FormField
        control={form.control}
        name="mobileNo"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">Mobile No</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <CountryCodeDropDown
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />
                <Input
                  id="location-mobile"
                  placeholder="Enter Mobile No."
                  {...field}
                  className="flex-1"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderEmailFormField = () => {
    return (
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">Email</FormLabel>
            <FormControl>
              <Input id="location-email" placeholder="Enter email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderLongitudeFormField = () => {
    return (
      <FormField
        control={form.control}
        name="longitude"
        rules={{ required: "Longitude is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Longitude" required />
            </FormLabel>
            <FormControl>
              <Input
                id="location-longitude"
                placeholder="Enter Longitude"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderLatitudeFormField = () => {
    return (
      <FormField
        control={form.control}
        name="latitude"
        rules={{ required: "Latitude is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Latitude" required />
            </FormLabel>
            <FormControl>
              <Input
                id="location-latitude"
                placeholder="Enter Latitude"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderDescriptionFormField = () => {
    return (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                id="location-description"
                placeholder="Provide a detailed description"
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {initialValues ? "Update" : "Save"}
        </Button>
      </div>
    );
  };

  const renderMapCard = () => {
    return (
      <div className="flex h-full flex-col rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Map</h3>
        </div>
        <div className="mt-4 flex flex-1 items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground">
          Map preview
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="border-b border-border py-4">
        <Typography
          component="h2"
          variant="xl"
          weight="semiBold"
          className="text-foreground"
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="sm"
          className="text-muted-foreground"
        >
          Fill in the details to create or update a location.
        </Typography>
      </div>
    );
  };

  return (
    <Sheet open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
      <SheetContent
        side="right"
        hasOverlay={false}
        className="w-full sm:max-w-7xl flex h-full flex-col"
        onInteractOutside={(event) => event.preventDefault()}
      >
        {renderHeader()}
        <div className="w-full flex-1 overflow-auto py-4 flex gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex h-full flex-col w-3/5 px-2"
            >
              <div className="flex-1 space-y-4">
                <div className="lg:col-span-2 space-y-4 ">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {renderLocationNameFormField()}
                    {renderLocationShortNameFormField()}
                  </div>
                  {renderAddressFormField()}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {renderCityFormField()}
                    {renderStateFormField()}
                    {renderCountryFormField()}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {renderPincodeFormField()}
                    {renderTimezoneFormField()}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {renderMobileFormField()}
                    {renderEmailFormField()}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {renderLongitudeFormField()}
                    {renderLatitudeFormField()}
                  </div>
                  {renderDescriptionFormField()}
                </div>
              </div>
              {renderButtons()}
            </form>
            <div className="lg:col-span-1 w-2/5 ">{renderMapCard()}</div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CustomerLocationDetailForm;
