import styled from "styled-components";
import { BsDoorClosed, BsPeople, BsCashCoin } from "react-icons/bs";
import { BookingsTable } from "../../types";

interface IProps {
  data: BookingsTable[];
}

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  border-radius: 1rem;
  padding: 1rem 2rem;
  background-color: var(--NEUTRAL_2);
  box-shadow: 0 0 0.5rem 1rem var(--NEUTRAL_4);
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;

  & strong {
    font-size: 1.8rem;
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

function BookingsTotal({ data }: IProps) {
  const totalBookings = data.length;
  const totalGuests = data.reduce(
    (acc, booking) => acc + booking.guest_totalPersons,
    0
  );
  const totalIncome = data.reduce((acc, booking) => acc + booking.deposit, 0);

  return (
    <div>
      <Heading>Совокупные показатели</Heading>
      <List>
        <Option>
          <BsDoorClosed />
          Заселений:
          <strong>{totalBookings}</strong>
        </Option>
        <Option>
          <BsPeople />
          Гостей:
          <strong>{totalGuests} чел.</strong>
        </Option>
        <Option>
          <BsCashCoin />
          Доход:
          <strong>{totalIncome.toLocaleString()} руб.</strong>
        </Option>
      </List>
    </div>
  );
}

export default BookingsTotal;
