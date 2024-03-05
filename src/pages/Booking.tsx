import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../backend/bookings";
import styled from "styled-components";
import {
  BsCalendarCheck,
  BsCalendarX,
  BsPeople,
  BsDoorClosed,
  BsPersonCircle,
  BsTelephone,
  BsEnvelopeAt,
  BsCashCoin,
  BsCupHot,
  BsChatRightDots,
} from "react-icons/bs";
import { LuCigarette } from "react-icons/lu";
import Loader from "../components/ui/Loader";
import Fallback from "../components/ui/Fallback";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const BookingHeading = styled.h1`
  text-align: center;

  & span {
    text-decoration: underline 2px solid;
    text-underline-offset: 5px;
  }
`;

const List = styled.ul`
  width: 90%;
  max-width: 40rem;
  border-radius: 1rem;
  margin: 3rem auto;
  padding: 1rem 2rem;
  background-color: var(--NEUTRAL_2);
  box-shadow: 0 0 0.5rem 1rem var(--NEUTRAL_4);

  & li:not(:last-child) {
    margin-bottom: 1rem;
  }

  & strong {
    font-size: 1.8rem;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  & + button {
    margin: 0 auto;
  }
`;

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id!),
  });

  if (isLoading) return <Loader isFullScreen={true} />;
  if (error) return <Fallback error={error} />;

  const booking = data![0];

  return (
    <Section>
      <Container>
        <BookingHeading>
          Данные по заселению <span>№ {id}</span>
        </BookingHeading>

        <List>
          <li>
            <BsCalendarCheck />
            <strong>Дата заезда: </strong>
            {new Date(booking.date_in).toLocaleDateString()}
          </li>

          <li>
            <BsCalendarX />
            <strong>Дата выезда: </strong>
            {new Date(booking.date_out).toLocaleDateString()}
          </li>

          <li>
            <BsDoorClosed />
            <strong>Номер: </strong>
            {booking.room}
          </li>

          <li>
            <BsPeople />
            <strong>Количество гостей: </strong>
            {booking.guest_totalPersons}
          </li>

          <li>
            <BsPersonCircle />
            <strong>Контактное лицо: </strong>
            {booking.guest_name}
          </li>

          <li>
            <BsTelephone />
            <strong>Телефон: </strong>
            <a href={`tel:${booking.guest_tel.replace(/[()-]/g, "")}`}>
              {booking.guest_tel}
            </a>
          </li>

          <li>
            <BsEnvelopeAt />
            <strong>Почта: </strong>
            <a href={`mailto:${booking.guest_email}`}>{booking.guest_email}</a>
          </li>

          <li>
            <BsCashCoin />
            <strong>Уплаченная сумма: </strong>
            {booking.deposit.toLocaleString()} руб.
          </li>

          <li>
            <BsCupHot />
            <strong>Завтрак включен: </strong>
            {booking.breakfast_included ? "да" : "нет"}
          </li>

          <li>
            <LuCigarette />
            <strong>Есть курящие: </strong>
            {booking.is_smoking ? "да" : "нет"}
          </li>

          <li>
            <BsChatRightDots />
            <strong>Пожелания гостя: </strong>
            {booking.guest_wishes || "нет"}
          </li>
        </List>

        <Button $variation="primary" $size="lg" onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      </Container>
    </Section>
  );
}

export default Booking;
