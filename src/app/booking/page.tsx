"use client";
import { columns } from "./columns";
import { DataTable } from "../../components/dataTable";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import { BookingInterface } from "@/models/booking-interface";
import { BookingAPI } from "@/apis/bookingAPI";
import { useEffect, useState } from "react";
import { GetBookingInterface } from "@/models/getBooking-interface";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "use-debounce";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export default function BookingPage() {
  const [data, setData] = useState<BookingInterface[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue] = useDebounce(searchValue, 600);
  const [orderBy, setOrderBy] = useState<string>("");
  const [orderState, setOrderState] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [priceInput, setPriceInput] = useState<string>("");
  const [debouncedPrice] = useDebounce(priceInput, 600);

  //fetch data
  useEffect(() => {
    const request: GetBookingInterface = {
      ...(debouncedSearchValue && {
        BookingId: Number(debouncedSearchValue),
      }),
      ...(orderBy && { OrderBy: orderBy }),
      ...(orderState && { OrderState: orderState }),
      ...(dateRange?.from && {
        MinimalEventDate: format(dateRange.from, "yyyy-MM-dd"),
      }),
      ...(dateRange?.to && {
        MaximalEventDate: format(dateRange.to, "yyyy-MM-dd"),
      }),
      ...(debouncedPrice && { BookingPrice: Number(debouncedPrice) }),
      PageNumber: pageNumber,
      PageSize: pageSize,
    };

    BookingAPI.getBooking(request)
      .then((res) => {
        setData(res.bookings);
        setTotalPages(res.totalPages);
        setHasNextPage(res.hasNextPage);
        setHasPreviousPage(res.hasPreviousPage);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Failed to fetch Booking");
        }
      });
  }, [
    debouncedSearchValue,
    orderBy,
    orderState,
    dateRange,
    pageNumber,
    pageSize,
    debouncedPrice,
  ]);

  return (
    <div className="h-full flex flex-col justify-center px-30 py-20">
      <div className="border-2 p-4 border-slight-black/20 rounded-lg">
        <div className="flex">
          Get Booked Tickets{" "}
          <BookOpen size={24} className="ml-2" strokeWidth={1.5} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            {/* searchbar */}
            <div className="flex items-center py-4">
              <InputGroup className="max-w-sm border-slight-black">
                <InputGroupInput
                  id="booking-search"
                  type="number"
                  placeholder="Search by Booking ID"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setPageNumber(1);
                  }}
                />
                <InputGroupAddon>
                  <Search size={24} strokeWidth={2} />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          {/* filters */}
          <div className="flex items-center gap-2 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-slight-black cursor-pointer"
                >
                  Filter by:
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-off-white">
                <DropdownMenuGroup className="py-2">
                  <DropdownMenuLabel>
                    Price &#40;Equals or less than&#41;
                  </DropdownMenuLabel>
                  <div className="px-1">
                    <Input
                      type="number"
                      placeholder="Place the amount here..."
                      className="border border-slight-black"
                      value={priceInput}
                      onChange={(e) => {
                        setPriceInput(e.target.value);
                        setPageNumber(1);
                      }}
                    />
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-slight-black/20" />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Date</DropdownMenuLabel>
                  <div>
                    <Calendar
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => {
                        setDateRange(range);
                        setPageNumber(1);
                      }}
                      numberOfMonths={2}
                    />
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderState={orderState}
          setOrderState={setOrderState}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={setPageNumber}
        />
      </div>
    </div>
  );
}
