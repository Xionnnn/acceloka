"use client";

import { TicketInterface } from "@/models/ticket-interface";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<TicketInterface>[] = [
  {
    id: "select",
    header: "Select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
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
];
