import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from "styled-components";
import { BsGear, BsInfoCircle } from "react-icons/bs";
import Button from "../../components/ui/Button";
import { BookingsTable } from "../../types";

interface IProps {
  settingsAreOpened: boolean;
  setActiveSettingsId: React.Dispatch<React.SetStateAction<number | null>>;
  bookingData: BookingsTable;
}

const SettingsButton = styled(Button)`
  display: inline-flex;

  & > svg {
    transition: transform 0.3s linear;
  }
  &:hover > svg {
    transform: rotate(45deg);
  }
`;

const Wrapper = styled.div`
  display: inline-block;
`;

function BookingsSettings({
  settingsAreOpened,
  setActiveSettingsId,
  bookingData,
}: IProps) {
  const navigate = useNavigate();

  const ref = useOutsideClick<HTMLDivElement>(
    () => setActiveSettingsId(null),
    settingsAreOpened
  );

  return settingsAreOpened ? (
    <Wrapper ref={ref}>
      <Button
        $variation="icon"
        $size="sm"
        onClick={() => navigate(`${bookingData.id}`)}
      >
        <BsInfoCircle />
        Детали
      </Button>
    </Wrapper>
  ) : (
    <SettingsButton
      $variation="icon"
      $size="sm"
      onClick={() => setActiveSettingsId(bookingData.id)}
    >
      <BsGear />
    </SettingsButton>
  );
}

export default BookingsSettings;
