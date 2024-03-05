import styled from "styled-components";

export default styled.div<{
  $justify?: string;
  $align?: string;
  $gap?: string;
}>`
  display: flex;
  align-items: ${(props) => props.$align || "center"};
  justify-content: ${(props) => props.$justify || ""};
  gap: ${(props) => props.$gap || ""};
`;
