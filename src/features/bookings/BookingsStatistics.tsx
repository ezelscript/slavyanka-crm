import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { PageContext } from "../../contexts/page/PageContext";
import styled from "styled-components";
import narrowData from "../../utils/narrowData";
import RoomOccupancy from "../rooms/RoomOccupancy";
import BookingsTotal from "./BookingsTotal";
import { BookingsTable } from "../../types";

const Wrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 840px) {
    flex-direction: column;

    & div:last-child {
      align-self: stretch;
    }
  }
`;

const statisticsFilterFunctions = {
  "period-all": null,
  "period-week": (booking: BookingsTable) => {
    const now = Date.now();
    const weekAgo = now - 1000 * 60 * 60 * 24 * 7;

    const bookingIn = Date.parse(booking.date_in);
    const bookingOut = Date.parse(booking.date_out);

    return (
      (bookingIn >= weekAgo && bookingIn <= now) ||
      (bookingOut >= weekAgo && bookingOut <= now) ||
      (bookingIn < weekAgo && bookingOut > now)
    );
  },
  "period-month": (booking: BookingsTable) => {
    const now = Date.now();
    const monthAgo = now - 1000 * 60 * 60 * 24 * 30;

    const bookingIn = Date.parse(booking.date_in);
    const bookingOut = Date.parse(booking.date_out);

    return (
      (bookingIn >= monthAgo && bookingIn <= now) ||
      (bookingOut >= monthAgo && bookingOut <= now) ||
      (bookingIn < monthAgo && bookingOut > now)
    );
  },
};

function BookingsStatistics() {
  const [searchParams] = useSearchParams();
  const initialBookingsData = useContext(PageContext) as BookingsTable[];

  const filterParams =
    (searchParams.get("filter") as keyof typeof statisticsFilterFunctions) ||
    "period-all";
  const filterFn = statisticsFilterFunctions[filterParams];

  const [narrowedBookings] = narrowData<BookingsTable>(
    initialBookingsData,
    filterFn,
    null,
    null
  );

  return (
    <Wrapper>
      <BookingsTotal data={narrowedBookings} />
      <RoomOccupancy data={narrowedBookings} />
    </Wrapper>
  );
}

export default BookingsStatistics;
