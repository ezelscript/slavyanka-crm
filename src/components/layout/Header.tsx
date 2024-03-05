import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../ui/Logo";
import Container from "../ui/Container";
import Nav from "./Nav";
import FlexRow from "../ui/FlexRow";
import UserCard from "../../features/user/UserCard";
import ThemeSwitcher from "../../contexts/theme/ThemeSwitcher";
import Clock from "../ui/Clock";

const StyledHeader = styled.header`
  padding: 1rem 0;
`;

const ScalableLogo = styled(Logo)`
  @media (max-width: 500px) {
    width: 7rem;
    height: 4.2rem;
  }
`;

function Header() {
  const { pathname } = useLocation();

  return (
    <StyledHeader>
      <Container>
        <FlexRow $justify="space-between" $gap="1rem">
          <ScalableLogo />
          <Nav key={pathname} />
          <FlexRow $justify="flex-end" $gap="1.5rem">
            <UserCard />
            <Clock />
            <ThemeSwitcher />
          </FlexRow>
        </FlexRow>
      </Container>
    </StyledHeader>
  );
}

export default Header;
