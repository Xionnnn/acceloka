"use client";
import { createColumns } from "./columns";
import { DataTable } from "../../components/dataTable";
import { Button } from "@/components/ui/button";
import { Search, Ticket } from "lucide-react";
import { TicketInterface } from "@/models/ticket-interface";
import { CartItemInterface } from "@/models/cartItem-interface";
import { ticketAPI } from "@/apis/ticketAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetAvailableTicketInterface } from "@/models/getAvailableTicket-interface";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "use-debounce";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CartModal } from "@/components/cartModal";
import { Input } from "@/components/ui/input";

export default function Main() {
  const [data, setData] = useState<TicketInterface[]>([]);
  const [searchOption] = useState<Array<string>>([
    "CategoryName",
    "TicketCode",
    "TicketName",
  ]);
  const [searchBy, setSearchBy] = useState<string>("TicketName");
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
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [priceInput, setPriceInput] = useState<string>("");
  const [debouncedPrice] = useDebounce(priceInput, 600);

  const handleAddToCart = useCallback((ticket: TicketInterface) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.TicketCode === ticket.ticketCode,
      );
      if (existing) {
        return prev.map((item) =>
          item.TicketCode === ticket.ticketCode
            ? { ...item, Quantity: item.Quantity + 1 }
            : item,
        );
      }
      return [...prev, { TicketCode: ticket.ticketCode, Quantity: 1 }];
    });
  }, []);

  const columns = useMemo(
    () => createColumns(handleAddToCart),
    [handleAddToCart],
  );

  //fetch data
  useEffect(() => {
    const request: GetAvailableTicketInterface = {
      ...(debouncedSearchValue && { [searchBy]: debouncedSearchValue }),
      ...(orderBy && { OrderBy: orderBy }),
      ...(orderState && { OrderState: orderState }),
      ...(dateRange?.from && {
        MinimalEventDate: format(dateRange.from, "yyyy-MM-dd"),
      }),
      ...(dateRange?.to && {
        MaximalEventDate: format(dateRange.to, "yyyy-MM-dd"),
      }),
      ...(debouncedPrice && { Price: Number(debouncedPrice) }),
      PageNumber: pageNumber,
      PageSize: pageSize,
    };

    ticketAPI
      .getAvailableTicket(request)
      .then((res) => {
        setData(res.tickets);
        setTotalPages(res.totalPages);
        setHasNextPage(res.hasNextPage);
        setHasPreviousPage(res.hasPreviousPage);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Failed to fetch Ticket");
        }
      });
  }, [
    debouncedSearchValue,
    searchBy,
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
          Get Available Ticket{" "}
          <Ticket size={24} className="ml-2" strokeWidth={1.5} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            {/* searchbar */}
            <div className="flex items-center py-4">
              <InputGroup className="max-w-sm border-slight-black">
                <InputGroupInput
                  id="input-group-url"
                  placeholder="Search a ticket"
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

            {/* Search by menu */}
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slight-black hover:cursor-pointer"
                  >
                    Search by: {searchBy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {searchOption.map((value, index) => (
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      key={index}
                      onClick={() => {
                        setSearchValue("");
                        setSearchBy(value);
                        setPageNumber(1);
                      }}
                    >
                      {value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* date range filter */}
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
                    Price (Equals or less than)
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
                      className=""
                    />
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <CartModal cartItems={cartItems} setCartItems={setCartItems} />
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
