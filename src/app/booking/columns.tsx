"use client";

import { BookingInterface } from "@/models/booking-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const createColumns = (
  onViewDetail: (bookingId: number) => void,
): ColumnDef<BookingInterface>[] => [
  {
    accessorKey: "bookingId",
    header: "Booking ID",
  },
  {
    accessorKey: "bookingDate",
    header: "Booking Date",
  },
  {
    accessorKey: "bookingQuantity",
    header: "Quantity",
  },
  {
    accessorKey: "bookingPrice",
    header: "Price",
  },
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetail(row.original.bookingId)}
        className="gap-2 text-slight-black hover:cursor-pointer"
      >
        <Eye className="h-4 w-4" />
        View Detail
      </Button>
    ),
  },
];
