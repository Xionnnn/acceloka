export interface GetAvailableTicketRequest {
  CategoryName?: string;
  TicketCode?: string;
  TicketName?: string;
  Price?: number;
  MinimalEventDate?: string;
  MaximalEventDate?: string;
  OrderBy?: string;
  OrderState?: string;
  PageNumber?: number;
  PageSize?: number;
}
