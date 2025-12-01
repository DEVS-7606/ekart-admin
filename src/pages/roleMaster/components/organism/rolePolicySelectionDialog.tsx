import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/atoms/dialog";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import { DataTable } from "@/shared/components/organisms/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { MOCK_ROLE_POLICIES } from "@/shared/constants/roleMaster.constant";
import type { RolePolicy } from "@/pages/roleMaster/components/organism/rolePolicyDataTable";

interface RolePolicySelectionDialogProps {
  open: boolean;
  selectedPolicies: RolePolicy[];
  onOpenChange: (open: boolean) => void;
  onSaveSelection: (policies: RolePolicy[]) => void;
}

const RolePolicySelectionDialog = ({
  open,
  selectedPolicies,
  onOpenChange,
  onSaveSelection,
}: RolePolicySelectionDialogProps) => {
  const [localSelectedIds, setLocalSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setLocalSelectedIds(selectedPolicies.map((policy) => policy.id));
    }
  }, [open, selectedPolicies]);

  const columns: ColumnDef<RolePolicy>[] = [
    {
      accessorKey: "name",
      header: () => (
        <Typography component="p" variant="sm" weight="medium">
          Text
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" variant="sm">
          {row.original.name}
        </Typography>
      ),
      enableSorting: false,
    },
    {
      id: "check",
      header: () => (
        <Typography component="p" variant="sm" weight="medium">
          Check
        </Typography>
      ),
      cell: ({ row }) => {
        const policy = row.original;
        const checked = localSelectedIds.includes(policy.id);

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={checked}
              onCheckedChange={(val) => {
                const isChecked = Boolean(val);
                setLocalSelectedIds((prev) =>
                  isChecked
                    ? prev.includes(policy.id)
                      ? prev
                      : [...prev, policy.id]
                    : prev.filter((id) => id !== policy.id)
                );
              }}
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  const handleSave = () => {
    const selected = MOCK_ROLE_POLICIES.filter((policy) =>
      localSelectedIds.includes(policy.id)
    );
    onSaveSelection(selected);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Policy</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <DataTable<RolePolicy>
            data={MOCK_ROLE_POLICIES}
            columns={columns}
            options={{
              enableSearching: true,
              searchKeys: ["name"],
              searchPlaceholder: "Search policy...",
              enablePagination: false,
              bodyClassName: "max-h-96 overflow-y-auto",
            }}
          />
        </div>

        <DialogFooter className="flex-row justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RolePolicySelectionDialog;
