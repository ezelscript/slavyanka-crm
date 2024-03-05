import styled from "styled-components";

export default styled.div<{
  $align?: string;
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$align || ""};
  gap: ${(props) => props.$gap || ""};
`;
