import styled from "styled-components";
import { getRooms } from "../backend/rooms";
import PageProvider from "../contexts/page/PageContext";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import FlexRow from "../components/ui/FlexRow";
import RoomsTable from "../features/rooms/RoomsTable";
import FilterSortMenu from "../components/ui/FilterSortMenu";

const RoomsHeading = styled(FlexRow)`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const roomSortOptions = [
  {
    description: "Дате создания (↓)",
    value: "created_at-desc",
  },
  {
    description: "Дате создания (↑)",
    value: "created_at-asc",
  },
  {
    description: "Цене (↓)",
    value: "price-desc",
  },
  {
    description: "Цене (↑)",
    value: "price-asc",
  },
];

function Rooms() {
  return (
    <PageProvider queryFn={getRooms} queryKey={["rooms"]}>
      <Section>
        <Container>
          <RoomsHeading $justify="space-between" $align="flex-end">
            <h1>Данные по номерам</h1>
            <FilterSortMenu
              page="rooms"
              sortOptions={roomSortOptions}
              defaults={{ sort: roomSortOptions[0].value }}
            />
          </RoomsHeading>

          <RoomsTable />
        </Container>
      </Section>
    </PageProvider>
  );
}

export default Rooms;
