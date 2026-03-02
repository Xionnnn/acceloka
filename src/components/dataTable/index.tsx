"use client";

import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  orderState: string;
  setOrderState: (orderState: string) => void;
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  orderBy,
  setOrderBy,
  orderState,
  setOrderState,
  pageNumber,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleSort = (columnId: string) => {
    if (orderBy === columnId) {
      if (orderState === "asc") {
        setOrderState("desc");
      } else if (orderState === "desc") {
        setOrderBy("");
        setOrderState("");
      }
    } else {
      setOrderBy(columnId);
      setOrderState("asc");
    }
    onPageChange(1);
  };

  const getSortIcon = (columnId: string) => {
    if (orderBy !== columnId) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    if (orderState === "asc") {
      return <ArrowUp className="ml-2 h-4 w-4" />;
    }
    return <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-md border bg-dark-brown text-off-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-off-white border-l border-off-white first:border-l-0 px-8 cursor-pointer select-none"
                      onClick={() => {
                        if (!header.column.columnDef.enableSorting === false)
                          return;
                        const formattedColumnId =
                          header.column.id[0].toUpperCase() +
                          header.column.id.slice(1);
                        handleSort(formattedColumnId);
                      }}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {!header.isPlaceholder &&
                          header.column.columnDef.enableSorting !== false &&
                          getSortIcon(
                            header.column.id[0].toUpperCase() +
                              header.column.id.slice(1),
                          )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.getIsSelected()
                      ? "text-slight-black"
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-l border-off-white first:border-l-0 px-8"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {pageNumber} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={!hasPreviousPage}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={!hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={!hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNextPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
