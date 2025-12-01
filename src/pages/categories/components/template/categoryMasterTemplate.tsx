import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { ICategory } from "@/pages/categories/type/categoryMaster";
import CategoryDatatable from "@/pages/categories/components/organisms/categoryDatatable";
import CategoryFormSheet from "@/pages/categories/components/organisms/categoryFormSheet";
import CategoryFilter from "@/pages/categories/components/organisms/categoryFilter";

interface CategoryMasterTemplateProps {
  categories: ICategory[];
  selectedCategory: ICategory | null;
  isModalOpen: boolean;
  onAddEditCategory: (values: ICategory) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetCategories: (value: ICategory[]) => void;
  handleSetSelectedCategory: (value: ICategory | null) => void;
  onDeleteCategory: () => void;
}

const CategoryMasterTemplate = ({
  categories,
  selectedCategory,
  isModalOpen,
  handleSetSelectedCategory,
  handleSetCategories,
  handleSetIsModalOpen,
  onAddEditCategory,
  onDeleteCategory,
}: CategoryMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Categories",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Manage product categories and subcategories for your storefront.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <CategoryFilter
          data={categories}
          onFilterChange={handleSetCategories}
        />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Category"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedCategory(null);
          }}
        />
      </div>
    );
  };

  const renderCategoryDatatable = () => {
    return (
      <CategoryDatatable
        categories={categories}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedCategory={handleSetSelectedCategory}
        onDeleteCategory={onDeleteCategory}
        selectedCategory={selectedCategory}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <CategoryFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditCategory}
        initialValues={selectedCategory}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderCategoryDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default CategoryMasterTemplate;
