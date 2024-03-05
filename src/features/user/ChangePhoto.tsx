import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { changePhoto } from "../../backend/authorization";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants";
import FormRow from "../../components/ui/FormRow";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { EmployeesTable } from "../../types";

interface FormValues {
  photo: FileList;
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 40rem;
  margin: 4rem auto 0;
  border-radius: 1rem;
  padding: 1rem 2rem 2rem 2rem;
  background-color: var(--NEUTRAL_2);
  box-shadow: 0 0 0.5rem 1rem var(--NEUTRAL_4);

  & button {
    width: 100%;
  }
`;

const Heading = styled.h2`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.3rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

function ChangePhoto({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: changePhoto,
    onError: (e) => {
      toast.error(e.message);
      reset();
    },
    onSuccess: (updatedRow) => {
      toast.success(TOAST_MESSAGES.changeAvatarSuccess);
      queryClient.setQueryData(["user"], updatedRow);
      queryClient.setQueryData(
        ["employees"],
        (oldData: EmployeesTable[] | undefined) =>
          oldData?.map((employee) =>
            employee.user_id === userId ? updatedRow[0] : employee
          )
      );
      reset();
    },
  });

  const submitFormData: SubmitHandler<FormValues> = (formData) =>
    mutate({ photo: formData.photo, userId });

  return (
    <Wrapper>
      <Heading>Изменить аватар</Heading>

      <form
        noValidate
        onSubmit={handleSubmit(submitFormData)}
        autoComplete="off"
      >
        <FormRow
          disabled={isPending}
          errorMessage={formErrors.photo?.message}
          id="photo"
          inputType="file"
          registerOptions={register("photo", {
            required: { value: true, message: "Фото не приложено" },
          })}
        >
          Приложите фото
        </FormRow>

        <Button $variation="primary" $size="lg" disabled={isPending}>
          {isPending ? <Loader isFullScreen={false} /> : "Изменить"}
        </Button>
      </form>
    </Wrapper>
  );
}

export default ChangePhoto;
