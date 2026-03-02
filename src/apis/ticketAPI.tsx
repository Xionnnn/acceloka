import api from "./api";
import { GetAvailableTicketInterface } from "@/models/getAvailableTicket-interface";

export const ticketAPI = {
  getAvailableTicket: async function (request: GetAvailableTicketInterface) {
    const params = {
      categoryName: request.CategoryName,
      TicketCode: request.TicketCode,
      TicketName: request.TicketName,
      Price: request.Price,
      MinimalEventDate: request.MinimalEventDate,
      MaximalEventDate: request.MaximalEventDate,
      OrderBy: request.OrderBy,
      OrderState: request.OrderState,
      PageNumber: request.PageNumber,
      PageSize: request.PageSize,
    };

    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value != undefined)
        .map(([key, value]) => [key, String(value)]),
    ).toString();

    const url = `${api.BASE_URL_LOCAL}get-available-ticket?${query}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  },
};
