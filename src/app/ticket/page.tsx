"use client";
import { columns } from "./columns";
import { DataTable } from "../../components/dataTable";
import { Button } from "@/components/ui/button";
import { Search, Ticket } from "lucide-react";
import { TicketInterface } from "@/models/ticket-interface";
import { ticketAPI } from "@/apis/ticketAPI";
import { useEffect, useState } from "react";
import { GetAvailableTicketRequest } from "@/models/getAvailableTicket-Request";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "use-debounce";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

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
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);

  //fetch data
  useEffect(() => {
    const request: GetAvailableTicketRequest = {
      ...(debouncedSearchValue && { [searchBy]: debouncedSearchValue }),
      ...(orderBy && { OrderBy: orderBy }),
      ...(orderState && { OrderState: orderState }),
      ...(dateRange?.from && {
        MinimalEventDate: format(dateRange.from, "yyyy-MM-dd"),
      }),
      ...(dateRange?.to && {
        MaximalEventDate: format(dateRange.to, "yyyy-MM-dd"),
      }),
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
  ]);

  return (
    <div className="h-full flex flex-col justify-center px-30 py-20">
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
                <Button variant="outline" className="border-slight-black">
                  Search by: {searchBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {searchOption.map((value, index) => (
                  <DropdownMenuItem
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
        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slight-black">
                Filter by:
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
  );
}
