import { useState, useContext } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { PageContext } from "../../contexts/page/PageContext";
import {
  Table,
  THead,
  TBody,
  TFoot,
  TR,
  TH,
  TD,
} from "../../components/ui/Table";
import BookingsSettings from "./BookingsSettings";
import Pagination from "../../components/ui/Pagination";
import narrowData from "../../utils/narrowData";
import { BookingsTable as TypedBookingsTable } from "../../types";

function getBookingStatus(booking: TypedBookingsTable) {
  const now = Date.now();

  if (now < Date.parse(booking.date_in)) return "Ожидает заселения";
  else if (
    now >= Date.parse(booking.date_in) &&
    now <= Date.parse(booking.date_out)
  )
    return "Проживает сейчас";
  else if (now > Date.parse(booking.date_out)) return "Уже выселился";
}

const bookingsSortFunctions = {
  "date_in-asc": (a: TypedBookingsTable, b: TypedBookingsTable) =>
    Date.parse(a.date_in) - Date.parse(b.date_in),
  "date_in-desc": (a: TypedBookingsTable, b: TypedBookingsTable) =>
    Date.parse(b.date_in) - Date.parse(a.date_in),
  "date_out-asc": (a: TypedBookingsTable, b: TypedBookingsTable) =>
    Date.parse(a.date_out) - Date.parse(b.date_out),
  "date_out-desc": (a: TypedBookingsTable, b: TypedBookingsTable) =>
    Date.parse(b.date_out) - Date.parse(a.date_out),
};

const bookingsFilterFunctions = {
  "status-all": null,
  "status-waiting": (booking: TypedBookingsTable) => {
    const now = Date.now();
    return now < Date.parse(booking.date_in);
  },
  "status-checkedIn": (booking: TypedBookingsTable) => {
    const now = Date.now();
    return (
      now >= Date.parse(booking.date_in) && now <= Date.parse(booking.date_out)
    );
  },
  "status-checkedOut": (booking: TypedBookingsTable) => {
    const now = Date.now();
    return now > Date.parse(booking.date_out);
  },
};

function BookingsTable() {
  const [activeSettingsId, setActiveSettingsId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const initialBookingsData = useContext(PageContext) as TypedBookingsTable[];

  const filterParams =
    (searchParams.get("filter") as keyof typeof bookingsFilterFunctions) ||
    "status-all";
  const filterFn = bookingsFilterFunctions[filterParams];

  const sortParams =
    (searchParams.get("sort") as keyof typeof bookingsSortFunctions) ||
    "date_in-desc";
  const sortFn = bookingsSortFunctions[sortParams];

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [narrowedBookings, filteredLength] = narrowData(
    initialBookingsData,
    filterFn,
    sortFn,
    currentPage
  );

  if (!narrowedBookings.length)
    return (
      <Navigate
        to={{
          search: searchParams
            .toString()
            .replace(`page=${currentPage}`, `page=${currentPage - 1}`),
        }}
      />
    );

  return (
    <Table>
      <THead>
        <TR>
          <TH $width="20%">Статус</TH>
          <TH $width="15%">Дата заезда</TH>
          <TH $width="15%">Дата выезда</TH>
          <TH $width="20%">Номер</TH>
          <TH $width="20%">Контактное лицо</TH>
          <TH $width="10%">Настройки</TH>
        </TR>
      </THead>

      <TBody>
        {narrowedBookings.map((booking) => (
          <TR key={booking.id}>
            <TD>{getBookingStatus(booking)}</TD>
            <TD>{new Date(booking.date_in).toLocaleDateString()}</TD>
            <TD>{new Date(booking.date_out).toLocaleDateString()}</TD>
            <TD>{booking.room}</TD>
            <TD>{booking.guest_name}</TD>
            <TD>
              <BookingsSettings
                settingsAreOpened={activeSettingsId === booking.id}
                setActiveSettingsId={setActiveSettingsId}
                bookingData={booking}
              />
            </TD>
          </TR>
        ))}
      </TBody>

      <TFoot>
        <Pagination
          totalDataCount={filteredLength}
          currentDataCount={narrowedBookings.length}
          columns={6}
        />
      </TFoot>
    </Table>
  );
}

export default BookingsTable;
