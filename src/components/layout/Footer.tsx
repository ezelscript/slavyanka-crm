import styled from "styled-components";
import { BsTelephone, BsEnvelopeAt } from "react-icons/bs";
import Container from "../ui/Container";

const Address = styled.address`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
  }
`;

function Footer() {
  return (
    <footer>
      <Container>
        <Address>
          Разработчик: Егор Зеленский
          <a href="tel:+79268467999">
            <BsTelephone /> 8(926)846-79-99 (TG, WA)
          </a>
          <a href="mailto:ezelscript@gmail.com">
            <BsEnvelopeAt /> ezelscript@gmail.com
          </a>
        </Address>
      </Container>
    </footer>
  );
}

export default Footer;
