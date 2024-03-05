import { ComponentType, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

interface EntityProps {
  closeFn: () => void;
}

interface AddEntityProps {
  Entity: ComponentType<EntityProps>;
}

function AddEntity({ Entity }: AddEntityProps) {
  const [modalIsShown, setModalIsShown] = useState(false);

  return (
    <>
      <Button
        $variation="primary"
        $size="lg"
        onClick={() => setModalIsShown(true)}
      >
        Добавить
      </Button>

      {modalIsShown && (
        <Modal>
          <Entity closeFn={() => setModalIsShown(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddEntity;
