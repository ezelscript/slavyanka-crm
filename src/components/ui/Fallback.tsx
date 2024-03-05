import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlexCol from "./FlexCol";
import Button from "./Button";

interface IProps {
  error: Error;
}

const Wrapper = styled(FlexCol)`
  padding: 3rem 0;
`;

function Fallback({ error }: IProps) {
  const navigate = useNavigate();

  return (
    <Wrapper $align="center" $gap="1rem">
      <strong>Произошла ошибка: {error.message}</strong>

      <Button $variation="primary" $size="lg" onClick={() => navigate(-1)}>
        Вернуться назад
      </Button>
    </Wrapper>
  );
}

export default Fallback;
