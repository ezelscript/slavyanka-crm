import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useOutsideClick from "../../hooks/useOutsideClick";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants.ts";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";
import { updateRoom, addRoom } from "../../backend/rooms.ts";
import Loader from "../../components/ui/Loader";
import FormRow from "../../components/ui/FormRow";
import Button from "../../components/ui/Button";
import { RoomsTable } from "../../types.ts";

type FormValues = {
  name: string;
  description: string;
  price: string;
  src: string | FileList;
};

interface IProps {
  roomData?: RoomsTable;
  closeFn: () => void;
}

const Form = styled.form`
  position: relative;
  width: 80%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
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

function RoomsForm({ roomData, closeFn }: IProps) {
  const isEditing = Boolean(roomData);

  const ref = useOutsideClick<HTMLFormElement>(closeFn);

  const defaultValues: FormValues = {
    name: roomData?.name || "",
    description: roomData?.description || "",
    price: roomData?.price.toString() || "",
    src: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>({ defaultValues });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: isEditing ? updateRoom : addRoom,
    onError: (e) => {
      toast.error(e.message);
      setTimeout(closeFn, 1500);
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.addSuccess);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setTimeout(closeFn, 1500);
    },
  });

  const submitFormData: SubmitHandler<FormValues> = (formData) => {
    const submitData: any = { ...formData };
    if (isEditing) submitData.id = roomData!.id;

    mutate(submitData);
  };

  return (
    <Form
      ref={ref}
      noValidate
      onSubmit={handleSubmit(submitFormData)}
      autoComplete="off"
    >
      <FormRow
        disabled={isPending}
        errorMessage={formErrors.name?.message}
        id="roomName"
        inputType="text"
        registerOptions={register("name", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
        })}
      >
        Название номера
      </FormRow>
      <FormRow
        disabled={isPending}
        errorMessage={formErrors.description?.message}
        id="roomDescription"
        inputType="textarea"
        registerOptions={register("description", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
        })}
      >
        Описание номера
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.price?.message}
        id="roomPrice"
        inputType="number"
        registerOptions={register("price", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
          min: {
            value: 1,
            message: "Некорректная стоимость",
          },
        })}
      >
        Цена номера
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.src?.message}
        id="roomImg"
        inputType="file"
        registerOptions={register("src", {
          required: { value: true, message: "Фото не приложено" },
        })}
      >
        Фото номера
      </FormRow>

      <Button $variation="primary" $size="lg" disabled={isPending}>
        {isPending ? (
          <Loader isFullScreen={false} />
        ) : isEditing ? (
          "Редактировать"
        ) : (
          "Добавить"
        )}
      </Button>

      <CloseBtn $variation="icon" onClick={closeFn}>
        <BsXCircle />
      </CloseBtn>
    </Form>
  );
}

export default RoomsForm;
