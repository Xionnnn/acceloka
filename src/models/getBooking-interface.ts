export interface GetBookingInterface {
  BookingId?: number;
  OrderBy?: string;
  OrderState?: string;
  MinimalEventDate?: string;
  MaximalEventDate?: string;
  BookingPrice?: number;
  PageNumber?: number;
  PageSize?: number;
}
