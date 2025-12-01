import { useState } from "react";
import { MOCK_STATES } from "@/shared/constants/stateMaster.constant";
import type { State, StateFormValues } from "./types";
import StateMasterTemplate from "./components/template/stateMasterTemplate";
import { toast } from "sonner";

export default function StateMaster() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [states, setStates] = useState<State[]>(() => MOCK_STATES);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedState(null);
    setFormOpen(true);
  };

  const handleEdit = (state: State) => {
    setSelectedState(state);
    setFormOpen(true);
  };

  const handleDelete = (state: State) => {
    setSelectedState(state);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleConfirmDelete = () => {
    if (!selectedState) return;

    setStates((prevStates) =>
      prevStates.filter((s) => s.id !== selectedState.id)
    );
    setDeleteDialogOpen(false);
    toast.success("State deleted successfully");
  };

  const handleSubmit = (values: StateFormValues) => {
    if (selectedState) {
      setStates((prevStates) =>
        prevStates.map((s) =>
          s.id === selectedState.id
            ? {
                ...s,
                name: values.name,
                code: values.code,
                country: values.country,
              }
            : s
        )
      );
      toast.success("State updated successfully");
    } else {
      setStates((prevStates) => {
        const nextId = prevStates.length
          ? Math.max(...prevStates.map((s) => s.id)) + 1
          : 1;
        return [
          {
            id: nextId,
            name: values.name,
            code: values.code,
            country: values.country,
          },
          ...prevStates,
        ];
      });
      toast.success("State added successfully");
    }

    setFormOpen(false);
    setSelectedState(null);
  };

  const formInitialValues = selectedState
    ? {
        name: selectedState.name,
        code: selectedState.code,
        country: selectedState.country ?? "",
      }
    : undefined;

  return (
    <StateMasterTemplate
      states={states}
      formOpen={formOpen}
      formMode={selectedState ? "edit" : "add"}
      formInitialValues={formInitialValues}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onFormOpenChange={setFormOpen}
      onFormSubmit={handleSubmit}
      deleteDialogOpen={deleteDialogOpen}
      deleteDialogState={selectedState}
      onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}
