"use client";

import { useState, useMemo, useEffect } from "react";
import { BookingDetailInterface } from "@/models/bookingDetail-interface";
import { CartItemInterface } from "@/models/cartItem-interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";

interface EditTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: number | null;
  details: BookingDetailInterface[];
  onSubmit: (bookingId: number, items: CartItemInterface[]) => void;
}

interface EditableTicket {
  ticketCode: string;
  ticketName: string;
  eventDate: string;
  quantity: number;
}

export function EditTicketModal({
  open,
  onOpenChange,
  bookingId,
  details,
  onSubmit,
}: EditTicketModalProps) {
  const initialTickets = useMemo<EditableTicket[]>(() => {
    const flat: EditableTicket[] = [];
    for (const category of details) {
      for (const ticket of category.tickets) {
        const existing = flat.find((t) => t.ticketCode === ticket.ticketCode);
        if (existing) {
          existing.quantity += 1;
        } else {
          flat.push({
            ticketCode: ticket.ticketCode,
            ticketName: ticket.ticketName,
            eventDate: ticket.eventDate,
            quantity: 1,
          });
        }
      }
    }
    return flat;
  }, [details]);

  const [tickets, setTickets] = useState<EditableTicket[]>(initialTickets);

  useEffect(() => {
    setTickets(initialTickets);
  }, [initialTickets]);

  const updateQuantity = (ticketCode: string, delta: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.ticketCode === ticketCode
          ? { ...t, quantity: Math.max(0, t.quantity + delta) }
          : t,
      ),
    );
  };

  const handleUpdate = () => {
    if (!bookingId) return;

    const items: CartItemInterface[] = tickets
      .filter((t) => t.quantity > 0)
      .map((t) => ({
        TicketCode: t.ticketCode,
        Quantity: t.quantity,
      }));

    onSubmit(bookingId, items);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Ticket — Booking #{bookingId}</DialogTitle>
          <DialogDescription>
            Adjust the quantity for each ticket and click update.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-100 overflow-y-auto">
          {tickets.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tickets found.
            </p>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.ticketCode}
                  className="flex items-center justify-between rounded-md border border-slight-black/20 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{ticket.ticketCode}</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.ticketName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.eventDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:cursor-pointer"
                      onClick={() => updateQuantity(ticket.ticketCode, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center text-sm font-medium">
                      {ticket.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:cursor-pointer"
                      onClick={() => updateQuantity(ticket.ticketCode, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={tickets.length === 0}
            className="w-full hover:cursor-pointer"
          >
            Update Quantity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
