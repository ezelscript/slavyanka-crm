import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../backend/authorization.ts";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../constants.ts";
import styled from "styled-components";
import Loader from "../../components/ui/Loader";
import FormRow from "../../components/ui/FormRow";
import Button from "../../components/ui/Button";

interface UserData {
  authEmail: string;
  authPassword: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
  align-self: stretch;
`;

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<UserData>();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: logIn,
    onError: () => {
      toast.error(TOAST_MESSAGES.loginFail);
      reset();
    },
    onSuccess: ({ session }) => {
      toast.success(TOAST_MESSAGES.loginSuccess);
      queryClient.setQueryData(["auth"], session);
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
    },
  });

  const submitFormData: SubmitHandler<UserData> = (formData) => {
    mutate({ email: formData.authEmail, password: formData.authPassword });
  };

  return (
    <Form noValidate onSubmit={handleSubmit(submitFormData)} autoComplete="off">
      <FormRow
        disabled={isPending}
        errorMessage={formErrors.authEmail?.message}
        id="authEmail"
        inputType="email"
        registerOptions={register("authEmail", {
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
        errorMessage={formErrors.authPassword?.message}
        id="authPassword"
        inputType="password"
        registerOptions={register("authPassword", {
          required: {
            value: true,
            message: "Поле обязательно для заполнения",
          },
        })}
      >
        Введите пароль
      </FormRow>

      <Button $variation="primary" $size="lg" disabled={isPending}>
        {isPending ? <Loader isFullScreen={false} /> : "Войти"}
      </Button>
    </Form>
  );
}

export default LoginForm;
