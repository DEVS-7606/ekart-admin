import React, { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import { DataTable } from "@/shared/components/organisms/dataTable";
import type { CustomerLocationRow } from "@/pages/customer-master/type/customerMaster";
import Button from "@/shared/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";
import CustomerLocationDetailForm from "@/pages/customer-master/components/organisms/customerLocationDetailForm";
import { toast } from "sonner";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";

interface CustomerLocationsProps {
  locations: CustomerLocationRow[];
  onChangeLocations: (locations: CustomerLocationRow[]) => void;
}

const CustomerLocations: React.FC<CustomerLocationsProps> = ({
  locations,
  onChangeLocations,
}) => {
  const [selectedLocation, setSelectedLocation] =
    useState<CustomerLocationRow | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSaveLocation = (location: CustomerLocationRow) => {
    if (selectedLocation) {
      const updated = locations.map((loc) =>
        loc.locationName === selectedLocation.locationName &&
        loc.pincode === selectedLocation.pincode
          ? location
          : loc
      );
      onChangeLocations(updated);
    } else {
      onChangeLocations([location, ...locations]);
    }
    toast.success(
      `Location ${selectedLocation ? "updated" : "added"} successfully`
    );

    setIsLocationModalOpen(false);
    setSelectedLocation(null);
  };

  const handleDeleteDialogOpenChange = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const onConfirmDelete = () => {
    if (selectedLocation) {
      const updated = locations.filter(
        (loc) =>
          !(
            loc.locationName === selectedLocation.locationName &&
            loc.pincode === selectedLocation.pincode
          )
      );
      onChangeLocations(updated);
      toast.success("Location deleted successfully");
    }

    setIsDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    setIsLocationModalOpen(false);
    setSelectedLocation(null);
  };

  const columns: ColumnDef<CustomerLocationRow>[] = [
    {
      accessorKey: "locationName",
      header: () => (
        <Typography component="p" className="text-center font-semibold">
          Name
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" className="text-center">
          {row.original.locationName}
        </Typography>
      ),
    },
    {
      accessorKey: "country",
      header: () => (
        <Typography component="p" className="text-center font-semibold">
          Country
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" className="text-center">
          {row.original.country}
        </Typography>
      ),
    },
    {
      accessorKey: "pincode",
      header: () => (
        <Typography component="p" className="text-center font-semibold">
          Pincode/Zipcode
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography component="p" className="text-center">
          {row.original.pincode}
        </Typography>
      ),
    },
    {
      id: "actions",
      header: () => (
        <Typography component="p" className="text-center font-semibold">
          Actions
        </Typography>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            size="icon"
            variant="ghost"
            className="text-primary hover:text-primary/90"
            onClick={() => {
              setIsLocationModalOpen(true);
              setSelectedLocation(row.original);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:text-destructive/90"
            onClick={() => {
              setSelectedLocation(row.original);
              handleDeleteDialogOpenChange();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography
          component="h2"
          variant="xl"
          weight="bold"
          className="text-foreground"
        >
          Locations
        </Typography>

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Location"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            setSelectedLocation(null);
            setIsLocationModalOpen(true);
          }}
        />
      </div>

      {locations.length <= 0 ? (
        <Typography
          component="p"
          variant="sm"
          className="text-muted-foreground text-center py-4"
        >
          No locations found.
        </Typography>
      ) : (
        <DataTable<CustomerLocationRow>
          data={locations}
          columns={columns}
          options={{
            enableSorting: false,
            enablePagination: true,
            enableSelection: false,
            enableSearching: false,
            className: "mt-2",
          }}
        />
      )}
      <CustomerLocationDetailForm
        isLocationModalOpen={isLocationModalOpen}
        setIsLocationModalOpen={setIsLocationModalOpen}
        onSave={handleSaveLocation}
        onCancel={handleCancel}
        initialValues={selectedLocation}
      />

      <GenericDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={onConfirmDelete}
        title="Delete Location"
        description="Are you sure you want to delete the location"
        highlightText={selectedLocation?.locationName}
      />
    </div>
  );
};

export default CustomerLocations;
