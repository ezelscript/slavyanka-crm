import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useOutsideClick from "../../hooks/useOutsideClick";
import { addNewEmployee } from "../../backend/employees.ts";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants.ts";
import styled from "styled-components";
import { BsXCircle } from "react-icons/bs";
import Loader from "../../components/ui/Loader";
import FormRow from "../../components/ui/FormRow";
import Button from "../../components/ui/Button";
import { UserData } from "../../types.ts";

interface IProps {
  closeFn: () => void;
}

type EmployeeData = Omit<UserData, "userId">;

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

function EmployeesForm({ closeFn }: IProps) {
  const ref = useOutsideClick<HTMLFormElement>(closeFn);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<EmployeeData>();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: addNewEmployee,
    onError: (e) => {
      toast.error(e.message);
      setTimeout(closeFn, 1500);
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGES.registerSuccess);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setTimeout(closeFn, 1500);
    },
  });

  const submitFormData: SubmitHandler<EmployeeData> = (formData) =>
    mutate(formData);

  return (
    <Form
      ref={ref}
      noValidate
      onSubmit={handleSubmit(submitFormData)}
      autoComplete="off"
    >
      <FormRow
        disabled={isPending}
        errorMessage={formErrors.full_name?.message}
        id="employee-fullName"
        inputType="text"
        registerOptions={register("full_name", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
        })}
      >
        Введите имя и фамилию
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.email?.message}
        id="employee-email"
        inputType="email"
        registerOptions={register("email", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
          pattern: {
            value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            message: "Введите email в корректном формате",
          },
        })}
      >
        Введите e-mail
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.password?.message}
        id="employee-password"
        inputType="password"
        registerOptions={register("password", {
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
        Введите пароль (6 символов минимум)
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.position?.message}
        id="employee-position"
        inputType="text"
        registerOptions={register("position", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
        })}
      >
        Введите должность
      </FormRow>

      <FormRow
        disabled={isPending}
        errorMessage={formErrors.photo?.message}
        id="employee-photo"
        inputType="file"
        registerOptions={register("photo", {
          required: { value: true, message: "Фото не приложено" },
        })}
      >
        Приложите фото
      </FormRow>

      <Button $variation="primary" $size="lg" disabled={isPending}>
        {isPending ? <Loader isFullScreen={false} /> : "Зарегистрировать"}
      </Button>

      <CloseBtn $variation="icon" onClick={closeFn}>
        <BsXCircle />
      </CloseBtn>
    </Form>
  );
}

export default EmployeesForm;
