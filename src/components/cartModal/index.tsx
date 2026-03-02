"use client";

import { CartItemInterface } from "@/models/cartItem-interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { BookingAPI } from "@/apis/bookingAPI";

interface CartModalProps {
  cartItems: CartItemInterface[];
  setCartItems: (cartItems: CartItemInterface[]) => void;
}

export function CartModal({ cartItems, setCartItems }: CartModalProps) {
  const updateQuantity = (ticketCode: string, delta: number) => {
    const updated = cartItems
      .map((item) =>
        item.TicketCode === ticketCode
          ? { ...item, Quantity: item.Quantity + delta }
          : item,
      )
      .filter((item) => item.Quantity > 0);

    setCartItems(updated);
  };

  const removeItem = (ticketCode: string) => {
    setCartItems(cartItems.filter((item) => item.TicketCode !== ticketCode));
  };

  const handleSubmit = () => {
    BookingAPI.bookTicket({request: cartItems})
    .then(res=>{
      console.log(res);
    })
    .catch(error=>{
      if(error instanceof Error){
        console.log(error.message);
      }
      console.log("API Error");
    })
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.Quantity, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-slight-black gap-2 hover:cursor-pointer">
          <ShoppingCart className="h-4 w-4" />
          View Cart {totalItems > 0 && `(${totalItems})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review your selected tickets before booking.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-100 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.TicketCode}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.TicketCode}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:cursor-pointer"
                      onClick={() => updateQuantity(item.TicketCode, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.Quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:cursor-pointer"
                      onClick={() => updateQuantity(item.TicketCode, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive hover:cursor-pointer"
                      onClick={() => removeItem(item.TicketCode)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={cartItems.length === 0}
            className="w-full hover:cursor-pointer"
          >
            Submit Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
