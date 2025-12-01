import type { Language, LanguageFormValues, LanguageLabelRow } from "../types";

export interface LanguageMasterSectionProps {
  onAdd?: () => void;
}

export interface LanguageDataTableProps {
  data: Language[];
  onEdit: (language: Language) => void;
  onDelete: (language: Language) => void;
}

export interface LanguageFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialValues?: Partial<LanguageFormValues>;
  onSubmit: (values: LanguageFormValues) => void;
  language?: Language | null;
  onChangeLanguageLabels?: (labels: LanguageLabelRow[]) => void;
}

export interface LanguageLabelsProps {
  labels: LanguageLabelRow[];
  onChangeLabelTag: (id: number, labelTag: string) => void;
}

export interface LanguageMasterTemplateProps {
  languages: Language[];
  formOpen: boolean;
  formMode: "add" | "edit";
  formInitialValues?: Partial<LanguageFormValues>;
  onAdd: () => void;
  onEdit: (language: Language) => void;
  onDelete: (language: Language) => void;
  onFormOpenChange: (open: boolean) => void;
  onFormSubmit: (values: LanguageFormValues) => void;
  deleteDialogOpen: boolean;
  deleteDialogLanguage: Language | null;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
  language: Language | null;
  onChangeLanguageLabels: (labels: LanguageLabelRow[]) => void;
}
