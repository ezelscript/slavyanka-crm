import styled from "styled-components";
import { getAllBookings } from "../backend/bookings";
import PageProvider from "../contexts/page/PageContext";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import FlexRow from "../components/ui/FlexRow";
import FilterSortMenu from "../components/ui/FilterSortMenu";
import BookingsStatistics from "../features/bookings/BookingsStatistics";

const DashboardHeading = styled(FlexRow)`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const dashboardFilterOptions = [
  {
    description: "За все время",
    value: "period-all",
  },
  {
    description: "За последние 7 дней",
    value: "period-week",
  },
  {
    description: "За последние 30 дней",
    value: "period-month",
  },
];

function Dashboard() {
  return (
    <PageProvider queryFn={getAllBookings} queryKey={["bookings"]}>
      <Section>
        <Container>
          <DashboardHeading $justify="space-between" $align="flex-end">
            <h1>Статистика</h1>
            <FilterSortMenu
              page="dashboard"
              filterOptions={dashboardFilterOptions}
              defaults={{ filter: dashboardFilterOptions[0].value }}
            />
          </DashboardHeading>
          <BookingsStatistics />
        </Container>
      </Section>
    </PageProvider>
  );
}

export default Dashboard;
