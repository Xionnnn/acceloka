import { BookingDetailTicketInterface } from "./bookingDetailTicket-Interface";

export interface BookingDetailInterface {
  qtyPerCategory: number;
  categoryName: string;
  tickets: BookingDetailTicketInterface[];
}
