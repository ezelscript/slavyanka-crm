import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from "styled-components";
import { deleteRoom } from "../../backend/rooms";
import { BsGear, BsPencil, BsTrash } from "react-icons/bs";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import RoomsForm from "./RoomsForm";
import DeleteEntity from "../../components/ui/DeleteEntity";
import { RoomsTable } from "../../types";

interface IProps {
  settingsAreOpened: boolean;
  setActiveSettingsId: React.Dispatch<React.SetStateAction<number | null>>;
  roomData: RoomsTable;
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

function RoomsSettings({
  settingsAreOpened,
  setActiveSettingsId,
  roomData,
}: IProps) {
  const [modalContent, setModalContent] = useState<null | "edit" | "delete">(
    null
  );
  const ref = useOutsideClick<HTMLDivElement>(
    () => setActiveSettingsId(null),
    settingsAreOpened
  );

  return (
    <>
      {settingsAreOpened ? (
        <Wrapper ref={ref}>
          <Button
            $variation="icon"
            $size="sm"
            onClick={() => {
              setModalContent("edit");
              setActiveSettingsId(null);
            }}
          >
            <BsPencil />
            Изменить
          </Button>

          <Button
            $variation="icon"
            $size="sm"
            onClick={() => {
              setModalContent("delete");
              setActiveSettingsId(null);
            }}
          >
            <BsTrash /> Удалить
          </Button>
        </Wrapper>
      ) : (
        <SettingsButton
          $variation="icon"
          $size="sm"
          onClick={() => setActiveSettingsId(roomData.id)}
        >
          <BsGear />
        </SettingsButton>
      )}

      {modalContent === "edit" && (
        <Modal>
          <RoomsForm
            roomData={roomData}
            closeFn={() => setModalContent(null)}
          />
        </Modal>
      )}
      {modalContent === "delete" && (
        <Modal>
          <DeleteEntity
            queryKey={["rooms"]}
            submitFn={() => deleteRoom(roomData.id)}
            closeFn={() => setModalContent(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default RoomsSettings;
