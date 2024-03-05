import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";
import styled from "styled-components";
import Button from "../../components/ui/Button";

const ThemeButton = styled(Button)`
  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

function ThemeSwitcher() {
  const { theme, changeTheme } = useContext(ThemeContext)!;

  return (
    <ThemeButton $variation="icon" $size="sm" onClick={changeTheme}>
      {theme === "light" ? <BsMoon /> : <BsSun />}
    </ThemeButton>
  );
}

export default ThemeSwitcher;
