import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./DataTable";
import type { DataTableProps } from "./DataTable"; // <-- type import only

type User = { id: number; name: string; email: string; age: number };

const rows: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 35 },
  { id: 3, name: "Carol", email: "carol@example.com", age: 22 },
];

const columns: DataTableProps<User>["columns"] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>, // Pass generic explicitly for Storybook
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DataTable<User> data={rows} columns={columns} />,
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <div className="p-4">
        <DataTable<User>
          data={rows}
          columns={columns}
          selectable
          onRowSelect={setSelected}
        />
        <pre className="mt-4 text-xs opacity-70">
          Selected: {JSON.stringify(selected, null, 2)}
        </pre>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyText: "Nothing to show.",
  },
};
