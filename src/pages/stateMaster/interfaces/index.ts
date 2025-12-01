import type { State, StateFormValues } from "../types";

export interface StateMasterSectionProps {
  onAdd?: () => void;
  onOpenFilters?: () => void;
}

export interface StateDataTableProps {
  data: State[];
  onEdit: (state: State) => void;
  onDelete: (state: State) => void;
}

export interface StateFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValues?: Partial<StateFormValues>;
  onSubmit: (values: StateFormValues) => void;
}

export interface StateMasterTemplateProps {
  states: State[];
  formOpen: boolean;
  formMode: "add" | "edit";
  formInitialValues?: Partial<StateFormValues>;
  onAdd: () => void;
  onEdit: (state: State) => void;
  onDelete: (state: State) => void;
  onFormOpenChange: (open: boolean) => void;
  onFormSubmit: (values: StateFormValues) => void;
  deleteDialogOpen: boolean;
  deleteDialogState: State | null;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
}
