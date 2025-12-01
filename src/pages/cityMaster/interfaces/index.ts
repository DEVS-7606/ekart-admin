import type { City, CityFormValues } from "../types";

export interface CityMasterSectionProps {
  onAdd?: () => void;
  onOpenFilters?: () => void;
}

export interface CityDataTableProps {
  data: City[];
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
}

export interface CityFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValues?: Partial<CityFormValues>;
  onSubmit: (values: CityFormValues) => void;
}

export interface CityMasterTemplateProps {
  cities: City[];
  formOpen: boolean;
  formMode: "add" | "edit";
  formInitialValues?: Partial<CityFormValues>;
  onAdd: () => void;
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
  onFormOpenChange: (open: boolean) => void;
  onFormSubmit: (values: CityFormValues) => void;
  deleteDialogOpen: boolean;
  deleteDialogCity: City | null;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
}
