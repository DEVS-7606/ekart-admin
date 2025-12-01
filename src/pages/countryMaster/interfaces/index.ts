import type { Country, CountryFormValues } from "@/pages/countryMaster/types";

export interface CountryMasterSectionProps {
  onAdd?: () => void;
  onOpenFilters?: () => void;
}

export interface CountryDataTableProps {
  data: Country[];
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
}

export interface CountryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValues?: Partial<CountryFormValues>;
  onSubmit: (values: CountryFormValues) => void;
}

export interface CountryMasterTemplateProps {
  countries: Country[];
  formOpen: boolean;
  formMode: "add" | "edit";
  formInitialValues?: Partial<CountryFormValues>;
  onAdd: () => void;
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
  onFormOpenChange: (open: boolean) => void;
  onFormSubmit: (values: CountryFormValues) => void;
  deleteDialogOpen: boolean;
  deleteDialogCountry: Country | null;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
}
