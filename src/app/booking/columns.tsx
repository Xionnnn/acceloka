"use client";

import { BookingInterface } from "@/models/booking-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const createColumns = (
  onViewDetail: (bookingId: number) => void,
  onEditTicket: (bookingId: number) => void,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:cursor-pointer"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-off-white">
          <DropdownMenuItem
            onClick={() => onViewDetail(row.original.bookingId)}
            className="gap-2 hover:cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            View Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onEditTicket(row.original.bookingId)}
            className="gap-2 hover:cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            Edit Ticket
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
