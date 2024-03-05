import styled from "styled-components";
import { getAllBookings } from "../backend/bookings";
import PageProvider from "../contexts/page/PageContext";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import FlexRow from "../components/ui/FlexRow";
import FilterSortMenu from "../components/ui/FilterSortMenu";
import BookingsTable from "../features/bookings/BookingsTable";

const BookingsHeading = styled(FlexRow)`
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const bookingsFilterOptions = [
  {
    description: "Показывать все",
    value: "status-all",
  },
  {
    description: "Только предстоящие",
    value: "status-waiting",
  },
  {
    description: "Только активные",
    value: "status-checkedIn",
  },
  {
    description: "Только прошедшие",
    value: "status-checkedOut",
  },
];

const bookingsSortOptions = [
  {
    description: "Дате заезда (↓)",
    value: "date_in-desc",
  },
  {
    description: "Дате заезда (↑)",
    value: "date_in-asc",
  },
  {
    description: "Дате выезда (↓)",
    value: "date_out-desc",
  },
  {
    description: "Дате выезда (↑)",
    value: "date_out-asc",
  },
];

function Bookings() {
  return (
    <PageProvider queryFn={getAllBookings} queryKey={["bookings"]}>
      <Section>
        <Container>
          <BookingsHeading $justify="space-between" $align="flex-end">
            <h1>Данные по заселениям</h1>
            <FilterSortMenu
              page="bookings"
              filterOptions={bookingsFilterOptions}
              sortOptions={bookingsSortOptions}
              defaults={{
                filter: bookingsFilterOptions[0].value,
                sort: bookingsSortOptions[0].value,
              }}
            />
          </BookingsHeading>

          <BookingsTable />
        </Container>
      </Section>
    </PageProvider>
  );
}

export default Bookings;
