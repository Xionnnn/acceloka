"use client";

import { TicketInterface } from "@/models/ticket-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const createColumns = (
  onAddToCart: (ticket: TicketInterface) => void,
): ColumnDef<TicketInterface>[] => [
  {
    accessorKey: "ticketCode",
    header: "Ticket Code",
  },
  {
    accessorKey: "ticketName",
    header: "Ticket Name",
  },
  {
    accessorKey: "eventDate",
    header: "Event Date",
  },
  {
    accessorKey: "categoryName",
    header: "Ticket Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quota",
    header: "Quota",
  },
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddToCart(row.original)}
        className="gap-2 text-slight-black hover:cursor-pointer"
      >
        <ShoppingCart className="h-4 w-4" />
        Add
      </Button>
    ),
  },
];
