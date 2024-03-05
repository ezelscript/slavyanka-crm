import styled, { css } from "styled-components";

const variations = {
  icon: css`
    background-color: transparent;
    color: var(--TEXT_COLOR);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      color: var(--BLUE_1);
    }
  `,
  primary: css`
    background-color: var(--BLUE_1);
    color: var(--WHITE);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      background-color: var(--BLUE_2);
    }
  `,
  secondary: css`
    background-color: var(--NEUTRAL_2);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      background-color: var(--BLUE_1);
      color: var(--WHITE);
    }
  `,
  delete: css`
    background-color: var(--RED_1);
    color: var(--WHITE);

    &:not(:disabled):hover,
    &:not(:disabled):active {
      background-color: var(--RED_2);
    }
  `,
};

const sizes = {
  lg: css`
    min-width: 8rem;
    min-height: 4rem;
    padding: 1rem;
    font-size: 1.7rem;
  `,
  sm: css`
    min-width: 3rem;
    min-height: 3rem;
    padding: 0.5rem;
    font-size: 1.4rem;
  `,
};

export default styled.button<{
  $variation?: keyof typeof variations;
  $size?: keyof typeof sizes;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.5rem;
  transition: 0.3s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => props.$variation && variations[props.$variation]};
  ${(props) => props.$size && sizes[props.$size]}
`;
