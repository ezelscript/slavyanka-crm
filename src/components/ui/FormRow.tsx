import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import FlexCol from "./FlexCol";

interface IProps {
  inputType: string;
  registerOptions: UseFormRegisterReturn;
  children: React.ReactNode;
  id: string;
  errorMessage?: string;
  disabled?: boolean;
}

const StyledFormRow = styled(FlexCol)`
  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.2;
`;

const Input = styled.input`
  background-color: var(--WHITE);
  color: var(--BLACK);
  width: 100%;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 0 1px var(--NEUTRAL_2);
  border-radius: 0.5rem;
  transition: background-color 0.2s linear;

  &:disabled {
    background-color: #b3b5b7;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 3px 3px var(--BLUE_1);
  }

  & + strong {
    height: 2.2rem;
    color: var(--RED_1);
    font-size: 1.4rem;
  }

  &::file-selector-button {
    background-color: var(--BLUE_2);
    color: var(--WHITE);
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
  }
`;

const TextArea = styled(Input)`
  resize: none;
  min-height: 8rem;
`;

function FormRow({
  inputType,
  registerOptions,
  children,
  id,
  errorMessage,
  disabled = false,
}: IProps) {
  return (
    <StyledFormRow $align="flex-start">
      <Label htmlFor={id}>{children}</Label>
      {inputType === "textarea" ? (
        <TextArea
          as="textarea"
          id={id}
          {...registerOptions}
          disabled={disabled}
        ></TextArea>
      ) : (
        <Input
          id={id}
          type={inputType}
          {...registerOptions}
          disabled={disabled}
          accept={inputType === "file" ? "image/*" : ""}
        />
      )}

      <strong>{errorMessage}</strong>
    </StyledFormRow>
  );
}

export default FormRow;
