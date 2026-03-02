import { CartItemInterface } from "@/models/cartItem-interface";
import api from "./api";
import { GetBookingInterface } from "@/models/getBooking-interface";

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
  getBooking: async function (request: GetBookingInterface) {
    const params = {
      BookingId: request.BookingId,
      OrderBy: request.OrderBy,
      OrderState: request.OrderState,
      MinimalEventDate: request.MinimalEventDate,
      MaximalEventDate: request.MaximalEventDate,
      BookingPrice: request.BookingPrice,
      PageNumber: request.PageNumber,
      PageSize: request.PageSize,
    };

    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != undefined)
        .map(([key, value]) => [key, String(value)]),
    ).toString();

    const url = `${api.BASE_URL_LOCAL}get-booked-ticket?${query}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  },
  getBookingDetail: async function ({ request }: { request: number }) {
    const url = `${api.BASE_URL_LOCAL}get-booked-ticket/${request}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  },
};
