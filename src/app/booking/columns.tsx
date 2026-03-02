"use client";

import { BookingInterface } from "@/models/booking-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const columns: ColumnDef<BookingInterface>[] = [
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
        onClick={() => {
          // TODO: implement view detail
          console.log("View detail for booking:", row.original.BookingId);
        }}
        className="gap-2 text-slight-black hover:cursor-pointer"
      >
        <Eye className="h-4 w-4" />
        View Detail
      </Button>
    ),
  },
];
