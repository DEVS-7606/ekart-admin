import { useState } from "react";
import { MOCK_CITIES } from "@/shared/constants/cityMaster.constant";
import type { City, CityFormValues } from "./types";
import CityMasterTemplate from "./components/template/cityMasterTemplate";
import { toast } from "sonner";

export default function CityMaster() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(() => MOCK_CITIES);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedCity(null);
    setFormOpen(true);
  };

  const handleEdit = (city: City) => {
    setSelectedCity(city);
    setFormOpen(true);
  };

  const handleDelete = (city: City) => {
    setSelectedCity(city);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleConfirmDelete = () => {
    if (!selectedCity) return;

    setCities((prevCities) =>
      prevCities.filter((c) => c.id !== selectedCity.id)
    );
    setDeleteDialogOpen(false);
    toast.success("City deleted successfully");
  };

  const handleSubmit = (values: CityFormValues) => {
    if (selectedCity) {
      setCities((prevCities) =>
        prevCities.map((c) =>
          c.id === selectedCity.id
            ? {
                ...c,
                name: values.name,
                code: values.code,
                state: values.state,
              }
            : c
        )
      );
      toast.success("City updated successfully");
    } else {
      setCities((prevCities) => {
        const nextId = prevCities.length
          ? Math.max(...prevCities.map((c) => c.id)) + 1
          : 1;
        return [
          {
            id: nextId,
            name: values.name,
            code: values.code,
            state: values.state,
          },
          ...prevCities,
        ];
      });
      toast.success("City added successfully");
    }

    setFormOpen(false);
    setSelectedCity(null);
  };

  const formInitialValues = selectedCity
    ? {
        name: selectedCity.name,
        code: selectedCity.code,
        state: selectedCity.state ?? "",
      }
    : undefined;

  return (
    <CityMasterTemplate
      cities={cities}
      formOpen={formOpen}
      formMode={selectedCity ? "edit" : "add"}
      formInitialValues={formInitialValues}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onFormOpenChange={setFormOpen}
      onFormSubmit={handleSubmit}
      deleteDialogOpen={deleteDialogOpen}
      deleteDialogCity={selectedCity}
      onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}
