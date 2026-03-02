import { CartItemInterface } from "@/models/cartItem-interface";
import api from "./api";

export const BookingAPI = {
  bookTicket: async function ({ request }: { request: CartItemInterface[] }) {
    const url = `${api.BASE_URL_LOCAL}book-ticket`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Items: request,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  },
};
