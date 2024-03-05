import { keyframes } from "styled-components";
import styled from "styled-components";

const fade = keyframes`
  100% {
    background-color: var(--NEUTRAL_3);
  }
`;

const SkeletonWrapper = styled.div`
  width: 10rem;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: var(--NEUTRAL_2);
  animation: ${fade} 1.5s cubic-bezier(0.4, 0, 1, 1) infinite;
`;

const SkeletonMenu = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--NEUTRAL_2);
  animation: ${fade} 1.5s cubic-bezier(0.4, 0, 1, 1) infinite;
`;

function UserSkeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonAvatar></SkeletonAvatar>
      <SkeletonMenu></SkeletonMenu>
    </SkeletonWrapper>
  );
}

export default UserSkeleton;
