import { DataTable } from "@/shared/components/organisms/dataTable";
import { EditableCell } from "@/shared/components/organisms/editableCell";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import { ActionCell } from "@/shared/components/molecules/actionCellForExample";
import type { ColumnDef } from "@tanstack/react-table";

const datapointOptions = ["Temperature", "Flow Rate", "Motor RPM"];
const dataTypeOptions = ["Float", "Integer"];
const unitOptions = ["°C", "Amps", "L/min"];

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Sensor ${i + 1}`,
  address: `${100 + i}`,
  dataPoint: datapointOptions[i % 3],
  dataType: dataTypeOptions[i % 2],
  unit: unitOptions[i % 3],
}));

export function DatapointTable() {
  type Row = (typeof mockData)[number];
  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: "id",
      header: "Sr No",
      cell: ({ row }) => <div>{row.original.id}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.name}
          onChange={(val) => console.log("Edit name:", val)}
        />
      ),
      enableSorting: true,
    },
    {
      accessorKey: "dataPoint",
      header: "Data Point",
      cell: ({ row }) => (
        <SelectField
          options={datapointOptions}
          value={row.original.dataPoint}
          onChange={(val) => console.log("Change:", val)}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => row.original.unit,
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionCell
          onEdit={() => console.log("Edit", row.original.id)}
          onDelete={() => console.log("Delete", row.original.id)}
        />
      ),
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      data={mockData}
      columns={columns}
      options={{
        enableSorting: true,
        enablePagination: true,
        visiblePages: 5,
      }}
    />
  );
}
