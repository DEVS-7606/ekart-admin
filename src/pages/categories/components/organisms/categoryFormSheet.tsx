import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";

import type { ICategory } from "@/pages/categories/type/categoryMaster";
import CategoryDetailForm from "@/pages/categories/components/organisms/categoryDetailForm";

interface CategoryFormSheetProps {
  isModalOpen: boolean;
  handleSetIsModalOpen: (value: boolean) => void;
  onSave: (values: ICategory) => void;
  initialValues: ICategory | null;
}

const CategoryFormSheet = ({
  isModalOpen,
  handleSetIsModalOpen,
  onSave,
  initialValues,
}: CategoryFormSheetProps) => {
  const sheetTitle = initialValues ? "Edit Category" : "Add Category";

  const handleCancel = () => {
    handleSetIsModalOpen(false);
  };

  const renderSheetHeader = () => {
    return (
      <div className="border-b px-6 py-4">
        <Typography component="h2" variant="xl" weight="semiBold">
          {sheetTitle}
        </Typography>
        <Typography component="p" variant="sm">
          Fill in the details to create or update a category.
        </Typography>
      </div>
    );
  };

  return (
    <Sheet open={isModalOpen} onOpenChange={handleSetIsModalOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex h-full flex-col"
      >
        {renderSheetHeader()}
        <CategoryDetailForm
          onSave={onSave}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CategoryFormSheet;
