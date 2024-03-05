import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { changePassword } from "../../backend/authorization";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants";
import FormRow from "../../components/ui/FormRow";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

interface FormValues {
  newPassword: string;
  checkPassword: string;
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

function ChangePassword({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<FormValues>({});

  const { isPending, mutate } = useMutation({
    mutationFn: changePassword,
    onError: (e) => {
      toast.error(e.message);
      reset();
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.changePasswordSuccess);
      reset();
    },
  });

  const submitFormData: SubmitHandler<FormValues> = (formData) =>
    mutate({ password: formData.newPassword, userId });

  return (
    <Wrapper>
      <Heading>Изменить пароль</Heading>

      <form
        noValidate
        onSubmit={handleSubmit(submitFormData)}
        autoComplete="off"
      >
        <FormRow
          disabled={isPending}
          errorMessage={formErrors.newPassword?.message}
          id="newPassword"
          inputType="password"
          registerOptions={register("newPassword", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 6,
              message: "Длина пароля меньше 6 символов",
            },
          })}
        >
          Новый пароль (6 символов минимум)
        </FormRow>

        <FormRow
          disabled={isPending}
          errorMessage={formErrors.checkPassword?.message}
          id="checkPassword"
          inputType="password"
          registerOptions={register("checkPassword", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 6,
              message: "Длина пароля меньше 6 символов",
            },
            validate: (value, formValues) =>
              value === formValues.newPassword || "Пароли не совпадают",
          })}
        >
          Повторите пароль
        </FormRow>

        <Button $variation="primary" $size="lg" disabled={isPending}>
          {isPending ? <Loader isFullScreen={false} /> : "Изменить"}
        </Button>
      </form>
    </Wrapper>
  );
}

export default ChangePassword;
