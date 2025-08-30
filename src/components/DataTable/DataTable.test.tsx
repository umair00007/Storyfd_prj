import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";

type User = { id: number; name: string; age: number };
const rows: User[] = [
  { id: 1, name: "Zed", age: 22 },
  { id: 2, name: "Amy", age: 30 },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

it("sorts by column when clicked", () => {
  render(<DataTable<User> data={rows} columns={columns} />);
  const nameHeader = screen.getByText("Name");
  fireEvent.click(nameHeader); // asc
  // first row should be Amy now
  const firstRow = screen.getAllByRole("row")[1];
  expect(firstRow).toHaveTextContent("Amy");
});
