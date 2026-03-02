"use client";

import { TicketInterface } from "@/models/ticket-interface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TicketInterface>[] = [
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
