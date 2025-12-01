# Template Wizard Migration Guide

This document explains the refactoring of the Alarm Master module into a reusable Template Wizard system.

## What Changed

### Before: Module-Specific Components

Previously, each master module (Alarm, Report, etc.) had its own:

- `AlarmTemplate.tsx` - Main template container
- `AlarmMasterSection.tsx` - Header and table section
- `AlarmTable.tsx` - Data table with columns
- `AlarmActionsBar.tsx` - Create button
- `AlarmDeleteDialog.tsx` - Delete confirmation
- `AlarmFormSheet.tsx` - Form sheet wrapper

### After: Shared Generic Components

Now we have reusable components in `src/shared/components/organisms/templateWizard/`:

- `TemplateWizard.tsx` - Generic main container
- `TemplateMasterSection.tsx` - Generic header and table section
- `TemplateTable.tsx` - Generic data table
- `TemplateActionsBar.tsx` - Generic create button
- `TemplateDeleteDialog.tsx` - Generic delete dialog
- `TemplateFormSheet.tsx` - Generic form sheet wrapper

## What Stays Module-Specific

Each module keeps:

1. **Form Component** - Your multi-step form (`AlarmFormMultiStep.tsx`)
2. **Form Steps** - All step components (`BasicDetailsStep.tsx`, `SetConditionsStep.tsx`, etc.)
3. **Business Logic** - CRUD handlers in `index.tsx`
4. **Types** - Module-specific types (`AlarmRow`, `AlarmFormValues`)
5. **Configuration** - Table columns, header text, etc. in `config/` folder

## File Structure

### Shared Components (Reusable)

```
src/shared/
├── components/organisms/templateWizard/
│   ├── TemplateWizard.tsx
│   ├── TemplateMasterSection.tsx
│   ├── TemplateTable.tsx
│   ├── TemplateActionsBar.tsx
│   ├── TemplateDeleteDialog.tsx
│   ├── TemplateFormSheet.tsx
│   ├── index.ts
│   └── README.md
└── types/
    └── templateWizard.ts
```

### Module-Specific (Alarm Master Example)

```
src/pages/alarmMaster/
├── components/
│   ├── molecules/
│   │   └── alarmFormStepper.tsx
│   └── organisms/
│       ├── alarmFormMultiStep.tsx          ← Kept (form logic)
│       ├── alarmConditionsSection.tsx      ← Kept (step component)
│       ├── primaryConditionSection.tsx     ← Kept (step component)
│       ├── occurrenceConditionSection.tsx  ← Kept (step component)
│       └── steps/
│           ├── BasicDetailsStep.tsx        ← Kept (step component)
│           ├── ConfigureActionsStep.tsx    ← Kept (step component)
│           └── ConfigureMessageStep.tsx    ← Kept (step component)
├── config/
│   └── alarmTemplateWizardConfig.tsx       ← New (configuration)
├── constants/
│   ├── alarmFormSteps.ts
│   └── mockFormData.ts
├── types/
│   └── index.ts
├── interfaces/                              ← Can be removed
└── index.tsx                                ← Updated to use TemplateWizard
```

## Migration Steps for Other Modules

### 1. Create Configuration File

Create `config/yourModuleConfig.tsx`:

```typescript
import type {
  TemplateTableConfig,
  TemplateHeaderConfig,
  TemplateDeleteDialogConfig,
} from "@/shared/types/templateWizard";
import type { YourRow } from "../types";

export const yourTableConfig: TemplateTableConfig<YourRow> = {
  columns: (onEdit, onDelete) => [
    // Your column definitions
  ],
  enableSorting: true,
  enablePagination: true,
  visiblePages: 5,
};

export const yourHeaderConfig: TemplateHeaderConfig = {
  title: "Your Module Title",
  createButtonLabel: "Create Item",
};

export const yourDeleteDialogConfig: TemplateDeleteDialogConfig = {
  title: "Delete Item",
  displayField: "name",
};
```

### 2. Update Types

Ensure your types extend the base types:

```typescript
import type {
  BaseTemplateRow,
  BaseTemplateFormValues,
} from "@/shared/types/templateWizard";

export interface YourRow extends BaseTemplateRow {
  // Your additional fields
}

export interface YourFormValues extends BaseTemplateFormValues {
  // Your additional fields
}
```

### 3. Update index.tsx

Replace your template component with `TemplateWizard`:

```typescript
import { TemplateWizard } from "@/shared/components/organisms/templateWizard";
import YourFormMultiStep from "./components/organisms/YourFormMultiStep";
import {
  yourTableConfig,
  yourHeaderConfig,
  yourDeleteDialogConfig,
} from "./config/yourModuleConfig";

// In your component:
return (
  <TemplateWizard<YourRow, YourFormValues>
    data={data}
    openForm={openForm}
    mode={selectedRow ? "edit" : "create"}
    initialValues={selectedRow ? { ...selectedRow } : undefined}
    onCreateTemplate={handleCreate}
    onFormOpenChange={handleFormOpenChange}
    onEditTemplate={handleEdit}
    onDeleteTemplate={handleDelete}
    onSubmit={handleSubmit}
    deleteDialogOpen={deleteDialogOpen}
    deleteDialogRow={selectedRow}
    toggleDeleteDialog={toggleDeleteDialog}
    confirmDelete={confirmDelete}
    tableConfig={yourTableConfig}
    headerConfig={yourHeaderConfig}
    deleteDialogConfig={yourDeleteDialogConfig}
    FormComponent={YourFormMultiStep}
  />
);
```

### 4. Clean Up Old Files

You can now delete:

- `components/template/yourTemplate.tsx`
- `components/organisms/yourTable.tsx`
- `components/organisms/yourMasterSection.tsx`
- `components/molecules/yourActionsBar.tsx`
- `components/organisms/yourDeleteDialog.tsx`
- `components/organisms/yourFormSheet.tsx`
- `interfaces/index.ts` (if only used for template props)

### 5. Keep These Files

**DO NOT DELETE:**

- Your form component (`YourFormMultiStep.tsx`)
- All step components
- Form stepper component
- Business logic in `index.tsx`
- Types and constants

## Benefits

1. **Consistency** - All modules use the same UI/UX patterns
2. **Maintainability** - Fix bugs once, benefit everywhere
3. **Faster Development** - New modules take minutes, not hours
4. **Type Safety** - Full TypeScript support with generics
5. **Flexibility** - Customize via configuration, not code duplication

## Prop Name Changes

When migrating, update these prop names:

| Old (Module-Specific) | New (Generic)          |
| --------------------- | ---------------------- |
| `onCreateAlarm`       | `onCreateTemplate`     |
| `onEditAlarm`         | `onEditTemplate`       |
| `onDeleteAlarm`       | `onDeleteTemplate`     |
| Module-specific props | Generic config objects |

## Example: Alarm Master

See `src/pages/alarmMaster/` for a complete working example of the refactored module.

## Questions?

Refer to:

- `src/shared/components/organisms/templateWizard/README.md` - Full documentation
- `src/pages/alarmMaster/` - Working example
- `src/shared/types/templateWizard.ts` - Type definitions
