import { useState } from "react";
import { toast } from "sonner";

import CategoryMasterTemplate from "@/pages/categories/components/template/categoryMasterTemplate";
import type { ICategory } from "@/pages/categories/type/categoryMaster";
import { MOCK_CATEGORIES } from "@/shared/constants/categoryMaster.constant";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const handleSetCategories = (updatedCategories: ICategory[]) => {
    setCategories(updatedCategories);
  };

  const handleSetSelectedCategory = (category: ICategory | null) => {
    setSelectedCategory(category);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditCategory = (values: ICategory) => {
    setCategories((previousCategories) => {
      if (selectedCategory) {
        return previousCategories.map((category) =>
          category.code === selectedCategory.code ? { ...values } : category
        );
      }

      return [{ ...values }, ...previousCategories];
    });
    toast.success(
      `Category ${selectedCategory ? "updated" : "added"} successfully`
    );
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const onDeleteCategory = () => {
    if (selectedCategory) {
      setCategories((previousCategories) =>
        previousCategories.filter(
          (category) => category.code !== selectedCategory.code
        )
      );
      toast.success("Category deleted successfully");
      setSelectedCategory(null);
    }
  };

  return (
    <CategoryMasterTemplate
      categories={categories}
      selectedCategory={selectedCategory}
      isModalOpen={isModalOpen}
      handleSetSelectedCategory={handleSetSelectedCategory}
      handleSetCategories={handleSetCategories}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditCategory={onAddEditCategory}
      onDeleteCategory={onDeleteCategory}
    />
  );
};

export default Categories;
