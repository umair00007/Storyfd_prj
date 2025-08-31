import React from "react";
import { cn } from "../../lib/cn";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
  className?: string;
}

type SortState<T> = { key: keyof T; direction: "asc" | "desc" } | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = "No data",
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const { key, direction } = sort;
    return [...data].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv != null) return direction === "asc" ? -1 : 1;
      if (av != null && bv == null) return direction === "asc" ? 1 : -1;
      if (av == null && bv == null) return 0;
      if (av < bv) return direction === "asc" ? -1 : 1;
      if (av > bv) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;
    setSort((prev) => {
      const key = col.dataIndex as keyof T;
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
  }

  function toggleRow(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      onRowSelect?.(Array.from(next).map((idx) => sorted[idx]));
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === sorted.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const filled = new Set<number>(sorted.map((_, i) => i));
      setSelected(filled);
      onRowSelect?.(sorted);
    }
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
            {selectable && (
              <th className="p-3 text-left">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={selected.size === sorted.length && sorted.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => {
              const active = sort?.key === c.dataIndex;
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "p-3 font-semibold text-gray-700 dark:text-gray-300",
                    c.sortable && "cursor-pointer select-none"
                  )}
                  onClick={() => toggleSort(c)}
                  aria-sort={
                    active
                      ? sort!.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {c.title}
                    {c.sortable && (
                      <span aria-hidden className="text-xs">
                        {active ? (sort!.direction === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                className="p-6 text-center text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                className="p-6 text-center text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-900/30"
                )}
              >
                {selectable && (
                  <td className="p-3">
                    <input
                      aria-label={`Select row ${i + 1}`}
                      type="checkbox"
                      checked={selected.has(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>
                )}
                {columns.map((c) => {
                  const v = row[c.dataIndex];
                  return (
                    <td key={c.key} className="p-3">
                      {c.render ? c.render(v, row) : String(v)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
