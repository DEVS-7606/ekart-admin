import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/atoms/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/atoms/tabs";
import type { LanguageFormSheetProps } from "@/pages/languageMaster/interfaces";
import LanguageDetails from "@/pages/languageMaster/components/organism/languageDetails";
import LanguageLabels from "@/pages/languageMaster/components/organism/languageLabels";

const languageFormSchema = z.object({
  name: z.string().min(1, "Language Name is required"),
  code: z.string().min(1, "Language Code is required"),
  description: z.string().min(1, "Language Description is required"),
});

export type LanguageFormValues = z.infer<typeof languageFormSchema>;

const LanguageFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
  language,
  onChangeLanguageLabels,
}: LanguageFormSheetProps) => {
  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      description: initialValues?.description ?? "",
    },
  });

  const [activeTab, setActiveTab] = useState<"details" | "labels">("details");

  const handleChangeLabelTag = (id: number, labelTag: string) => {
    if (!language || !onChangeLanguageLabels) return;

    const updatedLabels = language.languageLabel.map((label) =>
      label.id === id ? { ...label, labelTag } : label
    );

    onChangeLanguageLabels(updatedLabels);
  };

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      description: initialValues?.description ?? "",
    });

    if (!open) {
      setActiveTab("details");
    }
  }, [form, initialValues, open]);

  const handleSubmit = (values: LanguageFormValues) => {
    onSubmit(values);

    if (mode === "add") {
      setActiveTab("labels");
    }
  };

  const renderSheetHeader = () => {
    return (
      <SheetHeader className="px-6 py-4">
        <SheetTitle>
          {mode === "edit" ? "Edit Language" : "Add Language"}
        </SheetTitle>
      </SheetHeader>
    );
  };

  const renderDetailTab = () => {
    return (
      <TabsContent value="details" className="mt-4">
        <LanguageDetails
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </TabsContent>
    );
  };

  const renderLabelTab = () => {
    return (
      <TabsContent value="labels" className="mt-4">
        <LanguageLabels
          labels={language?.languageLabel ?? []}
          onChangeLabelTag={handleChangeLabelTag}
        />
      </TabsContent>
    );
  };

  const renderTabs = () => {
    return (
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "details" | "labels")}
        className="w-full flex-1 overflow-auto px-6 py-4"
      >
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          {mode === "edit" && (
            <TabsTrigger value="labels">Language Labels</TabsTrigger>
          )}
        </TabsList>
        {renderDetailTab()}
        {renderLabelTab()}
      </Tabs>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-6xl p-0 flex h-full flex-col"
        onInteractOutside={(event) => event.preventDefault()}
      >
        {renderSheetHeader()}
        {renderTabs()}
      </SheetContent>
    </Sheet>
  );
};

export default LanguageFormSheet;
