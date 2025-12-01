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
import type { UserMachine } from "@/pages/userMaster/components/organism/userMachineDataTable";
import { USER_MODULE_MACHINES } from "@/pages/userMaster/utils/userMachineDummyData";

interface UserMachineSelectionDialogProps {
  open: boolean;
  selectedMachines: UserMachine[];
  onOpenChange: (open: boolean) => void;
  onSaveSelection: (machines: UserMachine[]) => void;
}

const UserMachineSelectionDialog = ({
  open,
  selectedMachines,
  onOpenChange,
  onSaveSelection,
}: UserMachineSelectionDialogProps) => {
  const [localSelectedIdentifiers, setLocalSelectedIdentifiers] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (open) {
      setLocalSelectedIdentifiers(
        selectedMachines.map((machine) => machine.machineIdentifier)
      );
    }
  }, [open, selectedMachines]);

  const columns: ColumnDef<UserMachine>[] = [
    {
      accessorKey: "name",
      header: () => (
        <Typography component="p" variant="sm" weight="medium">
          Machine Name
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" variant="sm" className="text-center">
          {row.original.name}
        </Typography>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "machineIdentifier",
      header: () => (
        <Typography component="p" variant="sm" weight="medium">
          Machine Identifier
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" variant="sm" className="text-center">
          {row.original.machineIdentifier}
        </Typography>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "customerLocation",
      header: () => (
        <Typography component="p" variant="sm" weight="medium">
          Location
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" variant="sm" className="text-center">
          {row.original.customerLocation}
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
        const machine = row.original;
        const checked = localSelectedIdentifiers.includes(
          machine.machineIdentifier
        );

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={checked}
              onCheckedChange={(val) => {
                const isChecked = Boolean(val);
                setLocalSelectedIdentifiers((prev) =>
                  isChecked
                    ? prev.includes(machine.machineIdentifier)
                      ? prev
                      : [...prev, machine.machineIdentifier]
                    : prev.filter(
                        (identifier) => identifier !== machine.machineIdentifier
                      )
                );
              }}
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  // Use user module dummy machine data for selection
  const availableMachines: UserMachine[] = USER_MODULE_MACHINES;

  const handleSave = () => {
    const selected = availableMachines.filter((machine) =>
      localSelectedIdentifiers.includes(machine.machineIdentifier)
    );
    onSaveSelection(selected);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Machine</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <DataTable<UserMachine>
            data={availableMachines}
            columns={columns}
            options={{
              enableSearching: true,
              searchKeys: ["name", "machineIdentifier", "customerLocation"],
              searchPlaceholder: "Search machine...",
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

export default UserMachineSelectionDialog;
