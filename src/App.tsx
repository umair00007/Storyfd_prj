import { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

type User = { id: number; name: string; email: string; age: number };

const rows: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 35 },
  { id: 3, name: "Carol", email: "carol@example.com", age: 22 },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [val, setVal] = useState("");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">InputField Demo</h1>
        <div className="grid gap-4">
          <InputField
            label="Email"
            placeholder="you@example.com"
            helperText="We’ll never share your email."
            value={val}
            onChange={(e) => setVal(e.target.value)}
            clearable
          />
          <InputField
            label="Password"
            type="password"
            passwordToggle
            variant="filled"
            placeholder="••••••••"
          />
          <InputField
            label="Invalid"
            invalid
            errorMessage="Please fix this."
            placeholder="Oops"
            variant="ghost"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">DataTable Demo</h2>
        <DataTable<User> data={rows} columns={columns as any} selectable />
      </section>
    </div>
  );
}
