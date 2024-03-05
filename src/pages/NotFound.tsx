import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsEmojiFrown } from "react-icons/bs";
import Button from "../components/ui/Button";
import Main from "../components/layout/Main";

const NotFoundMain = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    width: 10rem;
    height: 10rem;
  }

  & h1 {
    margin: 5rem 0 1rem;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundMain>
      <BsEmojiFrown />
      <h1>Такой страницы не существует</h1>
      <Button
        $variation="primary"
        $size="lg"
        onClick={() => navigate("/dashboard", { replace: true })}
      >
        Перейти на главную
      </Button>
    </NotFoundMain>
  );
}

export default NotFound;
