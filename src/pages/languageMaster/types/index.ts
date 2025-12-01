export type LanguageLabelRow = {
  id: number;
  labelName: string;
  labelKey: string;
  labelTag: string;
};

export type Language = {
  id: number;
  name: string;
  code: string;
  description?: string;
  languageLabel: LanguageLabelRow[];
};

export type { LanguageFormValues } from "../components/organism/languageFormSheet";
