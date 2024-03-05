import { keyframes } from "styled-components";
import styled from "styled-components";
import Overlay from "./Overlay";

interface IProps {
  isFullScreen: boolean;
}

const spin = keyframes`
  0% {
      transform: rotate(0deg);
    }
  100% {
      transform: rotate(360deg);
    }
`;

const Spinner = styled.span<{ $size: "sm" | "lg" }>`
  width: ${(props) => (props.$size === "sm" ? "2rem" : "4rem")};
  aspect-ratio: 1;
  border: ${(props) =>
    props.$size === "sm"
      ? "2px solid var(--WHITE)"
      : "5px solid var(--BLUE_1)"};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ${spin} 1s linear infinite;
`;

function Loader({ isFullScreen }: IProps) {
  return !isFullScreen ? (
    <Spinner $size="sm" />
  ) : (
    <Overlay>
      <Spinner $size="lg" />
    </Overlay>
  );
}

export default Loader;
