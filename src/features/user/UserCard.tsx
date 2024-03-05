import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import { BsGear, BsBoxArrowLeft } from "react-icons/bs";
import { getUser, logOut } from "../../backend/authorization";
import Fallback from "../../components/ui/Fallback";
import UserSkeleton from "../../components/ui/UserSkeleton";

const Wrapper = styled.figure`
  min-width: 10rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;

  &:hover span {
    color: var(--BLUE_1);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Photo = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  object-position: center;
`;

const Figcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
`;

const Span = styled.span<{ $isShown: boolean }>`
  line-height: 1.1;
  transition: 0.3s ease-in-out;

  ${(props) =>
    props.$isShown &&
    css`
      color: var(--BLUE_1);
      &:last-child {
        transform: rotate(180deg);
      }
    `}
`;

const UserMenu = styled.div<{ $isShown: boolean }>`
  position: absolute;
  width: 100%;
  transition: 0.3s ease-in-out;

  ${(props) =>
    props.$isShown
      ? css`
          top: 100%;
          opacity: 1;
          pointer-events: auto;
        `
      : css`
          top: 0;
          opacity: 0;
          pointer-events: none;
        `}
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 1.4rem;
  transition: color 0.3s linear;

  &:hover {
    color: var(--BLUE_1);
  }
`;

function UserCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const queryClient = useQueryClient();
  const [menuIsShown, setMenuIsShown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setMenuIsShown(false), menuIsShown);

  function exitApp() {
    logOut();
    queryClient.removeQueries({
      predicate: (query: any) => ["auth", "user"].includes(query.queryKey[0]),
    });
  }

  if (isLoading) return <UserSkeleton />;
  if (error) return <Fallback error={error} />;

  const currentUser = data![0];

  return (
    <Wrapper ref={ref} onClick={() => setMenuIsShown((cur) => !cur)}>
      <Photo
        src={currentUser.photo}
        alt="Фото профиля"
        width="60"
        height="60"
      />
      <Figcaption>
        <Span $isShown={menuIsShown}>
          {currentUser.full_name.split(" ")[0]}
        </Span>
        <Span $isShown={menuIsShown}>▼</Span>
      </Figcaption>

      <UserMenu $isShown={menuIsShown}>
        <StyledLink to="/profile">
          <BsGear />
          Профиль
        </StyledLink>
        <StyledLink to="/login" onClick={() => exitApp()}>
          <BsBoxArrowLeft />
          Выйти
        </StyledLink>
      </UserMenu>
    </Wrapper>
  );
}

export default UserCard;
