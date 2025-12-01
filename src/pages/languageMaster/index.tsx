import { useState } from "react";
import LanguageMasterTemplate from "@/pages/languageMaster/components/template/languageMasterTemplate";
import type { Language, LanguageFormValues, LanguageLabelRow } from "./types";
import { toast } from "sonner";
import {
  MOCK_LANGUAGES,
  DEFAULT_LANGUAGE_LABELS,
} from "@/shared/constants/language.constant";

export default function LanguageMaster() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const [languages, setLanguages] = useState<Language[]>(MOCK_LANGUAGES);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedLanguage(null);
    setFormOpen(true);
  };

  const handleEdit = (language: Language) => {
    setSelectedLanguage(language);
    setFormOpen(true);
  };

  const handleDelete = (language: Language) => {
    setSelectedLanguage(language);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleConfirmDelete = () => {
    if (!selectedLanguage) return;

    setLanguages((prev) => prev.filter((l) => l.id !== selectedLanguage.id));
    setDeleteDialogOpen(false);
    toast.success("Language deleted successfully");
  };

  const handleSubmit = (values: LanguageFormValues) => {
    if (selectedLanguage) {
      setLanguages((prev) =>
        prev.map((l) =>
          l.id === selectedLanguage.id
            ? {
                ...l,
                name: values.name,
                code: values.code,
                description: values.description,
              }
            : l
        )
      );
      toast.success("Language updated successfully");
      setFormOpen(false);
      setSelectedLanguage(null);
    } else {
      let createdLanguage: Language | null = null;

      setLanguages((prev) => {
        const nextId = prev.length ? Math.max(...prev.map((l) => l.id)) + 1 : 1;
        const newLanguage: Language = {
          id: nextId,
          name: values.name,
          code: values.code,
          description: values.description,
          languageLabel: [...DEFAULT_LANGUAGE_LABELS],
        };
        createdLanguage = newLanguage;
        return [newLanguage, ...prev];
      });

      if (createdLanguage) {
        setSelectedLanguage(createdLanguage);
      }

      toast.success("Language added successfully");
    }
  };

  const formInitialValues = selectedLanguage
    ? {
        name: selectedLanguage.name,
        code: selectedLanguage.code,
        description: selectedLanguage.description ?? "",
      }
    : undefined;

  const handleChangeLabels = (labels: LanguageLabelRow[]) => {
    if (!selectedLanguage) return;

    const updatedLanguage = {
      ...selectedLanguage,
      languageLabel: labels,
    };

    setLanguages((prev) =>
      prev.map((l) => (l.id === selectedLanguage.id ? updatedLanguage : l))
    );
    setSelectedLanguage(updatedLanguage);
  };

  return (
      <LanguageMasterTemplate
        languages={languages}
        formOpen={formOpen}
        formMode={selectedLanguage ? "edit" : "add"}
        formInitialValues={formInitialValues}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFormOpenChange={setFormOpen}
        onFormSubmit={handleSubmit}
        deleteDialogOpen={deleteDialogOpen}
        deleteDialogLanguage={selectedLanguage}
        onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
        onConfirmDelete={handleConfirmDelete}
        language={selectedLanguage}
        onChangeLanguageLabels={handleChangeLabels}
      />
  );
}
