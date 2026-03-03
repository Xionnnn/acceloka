"use client";

import { BookingDetailInterface } from "@/models/bookingDetail-interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";

interface BookingDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: number | null;
  details: BookingDetailInterface[];
  onRevoke: (ticketCode: string, qty: number) => void;
}

export function BookingDetailModal({
  open,
  onOpenChange,
  bookingId,
  details,
  onRevoke,
}: BookingDetailModalProps) {
  const [revokeQuantities, setRevokeQuantities] = useState<Record<string, number>>({});
  const [prevBookingId, setPrevBookingId] = useState<number | null>(null);

  if (bookingId !== prevBookingId) {
    setPrevBookingId(bookingId);
    setRevokeQuantities({});
  }

  const displayDetails = useMemo(
    () =>
      details.map((cat) => ({
        ...cat,
        tickets: cat.tickets.map((t) => ({
          ...t,
          qtyToRevoke: revokeQuantities[t.ticketCode] ?? 0,
        })),
      })),
    [details, revokeQuantities],
  );

  const updateQuantity = (ticketCode: string, delta: number) => {
    setRevokeQuantities((prev) => {
      const current = prev[ticketCode] ?? 0;
      return { ...prev, [ticketCode]: Math.max(0, current + delta) };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Booking Detail #{bookingId}</DialogTitle>
          <DialogDescription>
            Tickets grouped by category for this booking.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-100 overflow-y-auto space-y-4">
          {displayDetails.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No details found.
            </p>
          ) : (
            displayDetails.map((category, index) => (
              <div key={category.categoryName}>
                {index > 0 && <Separator className="my-4 bg-slight-black/20" />}

                {/* Category Header */}
                <div className="mb-3">
                  <h3 className="font-semibold text-base">
                    {category.categoryName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {category.qtyPerCategory}
                  </p>
                </div>

                {/* Tickets in this category */}
                <div className="space-y-2">
                  {category.tickets.map((ticket) => (
                    <div
                      key={ticket.ticketCode}
                      className="flex items-center justify-between rounded-md border border-slight-black/20 p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">
                          {ticket.ticketCode}
                        </p>
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
                          {ticket.qtyToRevoke}
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
                      <div className="flex items-center gap-2 ml-3 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={ticket.qtyToRevoke <= 0}
                          onClick={() =>
                            onRevoke(ticket.ticketCode, ticket.qtyToRevoke)
                          }
                          className="gap-1 text-destructive hover:text-destructive hover:cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                          Revoke ({ticket.qtyToRevoke})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
