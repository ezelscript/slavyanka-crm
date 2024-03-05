import { useMutation, useQueryClient } from "@tanstack/react-query";
import useOutsideClick from "../../hooks/useOutsideClick";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";
import Button from "./Button";
import Loader from "./Loader";

interface IProps {
  queryKey: string[];
  submitFn: () => Promise<void>;
  closeFn: () => void;
}

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  background-color: var(--NEUTRAL_2);
  box-shadow: 0 0 0.5rem 1rem var(--NEUTRAL_4);
  border-radius: 1rem;
`;

const CloseBtn = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const Strong = styled.strong`
  padding-top: 1rem;
  text-align: center;
  font-size: 1.7rem;
`;

function DeleteEntity({ queryKey, submitFn, closeFn }: IProps) {
  const queryClient = useQueryClient();
  const ref = useOutsideClick<HTMLDivElement>(closeFn);

  const { mutate, isPending } = useMutation({
    mutationFn: submitFn,
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.deleteSuccess);
      queryClient.invalidateQueries({ queryKey });
      setTimeout(closeFn, 1500);
    },
    onError: (e) => {
      toast.error(e.message);
      setTimeout(closeFn, 1500);
    },
  });

  return (
    <Wrapper ref={ref}>
      <Strong>
        Вы уверены, что хотите удалить запись?
        <br />
        Это действие необратимо
      </Strong>
      <Button
        $variation="delete"
        $size="lg"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? <Loader isFullScreen={false} /> : "Удалить"}
      </Button>

      <CloseBtn $variation="icon" onClick={() => closeFn()}>
        <BsXCircle />
      </CloseBtn>
    </Wrapper>
  );
}

export default DeleteEntity;
