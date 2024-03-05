import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fade = keyframes`
  to {
    opacity: 0;
  }
`;

const StyledClock = styled.div`
  font-family: Tahoma, sans-serif;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Divider = styled.span`
  animation: ${fade} 1s ease-in-out infinite;
`;

function Clock() {
  // В данном случае реализована базовая логика обновления времени, чтобы не тратить чрезмерно ресурсы пользователя
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      60000
    );
    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.slice(0, 2);
  const mins = currentTime.slice(3, 5);

  return (
    <StyledClock>
      {hours}
      <Divider>:</Divider>
      {mins}
    </StyledClock>
  );
}

export default Clock;
