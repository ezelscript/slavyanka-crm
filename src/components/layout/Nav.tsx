import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  BsHouse,
  BsDoorOpen,
  BsCalendar3,
  BsPersonWorkspace,
  BsFilterRight,
  BsXCircle,
} from "react-icons/bs";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const StyledNavLink = styled(NavLink)`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  padding: 1rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s linear;

  &.active {
    background-color: var(--NEUTRAL_2);
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 3px 3px var(--NEUTRAL_3);
    pointer-events: none;
    color: var(--TEXT_COLOR);
  }

  &:hover {
    color: var(--BLUE_1);
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const OpenButton = styled(Button)`
  order: 3;

  & svg {
    width: 4rem;
    height: 4rem;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1rem;
  left: 1rem;

  & svg {
    width: 3.3rem;
    height: 3.3rem;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledNav = styled.nav<{ $isShown: boolean }>`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    width: 25rem;
    padding: 5rem 2rem;
    border-radius: 2rem 0 0 2rem;
    background-color: var(--NEUTRAL_2);
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.$isShown ? "translateX(0)" : "translateX(100%)"};
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

function Nav() {
  const [navIsOpened, setNavIsOpened] = useState<boolean>(false);
  const ref = useOutsideClick<HTMLElement>(
    () => setNavIsOpened(false),
    navIsOpened
  );

  return (
    <>
      <OpenButton $variation="icon" onClick={() => setNavIsOpened(true)}>
        <BsFilterRight />
      </OpenButton>

      {navIsOpened && <Modal>{null}</Modal>}

      <StyledNav ref={ref} $isShown={navIsOpened}>
        <List>
          <li>
            <StyledNavLink to="/dashboard">
              <BsHouse />
              <span>Главная</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/rooms">
              <BsDoorOpen />
              <span>Номера</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/bookings">
              <BsCalendar3 />
              <span>Заселения</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/employees">
              <BsPersonWorkspace />
              <span>Пользователи</span>
            </StyledNavLink>
          </li>
        </List>

        <CloseButton $variation="icon" onClick={() => setNavIsOpened(false)}>
          <BsXCircle />
        </CloseButton>
      </StyledNav>
    </>
  );
}

export default Nav;
