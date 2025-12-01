import { useState } from "react";
import { MOCK_COUNTRIES } from "@/shared/constants/countryMaster.constant";
import type { Country, CountryFormValues } from "@/pages/countryMaster/types";
import CountryMasterTemplate from "@/pages/countryMaster/components/template/countryMasterTemplate";
import { toast } from "sonner";

export default function CountryMaster() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>(() => MOCK_COUNTRIES);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedCountry(null);
    setFormOpen(true);
  };

  const handleEdit = (country: Country) => {
    setSelectedCountry(country);
    setFormOpen(true);
  };

  const handleDelete = (country: Country) => {
    setSelectedCountry(country);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleConfirmDelete = () => {
    if (!selectedCountry) return;

    setCountries((prevCountries) =>
      prevCountries.filter((c) => c.id !== selectedCountry.id)
    );
    setDeleteDialogOpen(false);
    toast.success("Country deleted successfully");
  };

  const handleSubmit = (values: CountryFormValues) => {
    if (selectedCountry) {
      setCountries((prevCountries) =>
        prevCountries.map((c) =>
          c.id === selectedCountry.id
            ? { ...c, name: values.name, code: values.code }
            : c
        )
      );
      toast.success("Country updated successfully");
    } else {
      setCountries((prevCountries) => {
        const nextId = prevCountries.length
          ? Math.max(...prevCountries.map((c) => c.id)) + 1
          : 1;
        return [
          { id: nextId, name: values.name, code: values.code },
          ...prevCountries,
        ];
      });
      toast.success("Country added successfully");
    }

    setFormOpen(false);
    setSelectedCountry(null);
  };

  const formInitialValues = selectedCountry
    ? { name: selectedCountry.name, code: selectedCountry.code }
    : undefined;

  return (
    <CountryMasterTemplate
      countries={countries}
      formOpen={formOpen}
      formMode={selectedCountry ? "edit" : "add"}
      formInitialValues={formInitialValues}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onFormOpenChange={setFormOpen}
      onFormSubmit={handleSubmit}
      deleteDialogOpen={deleteDialogOpen}
      deleteDialogCountry={selectedCountry}
      onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}
