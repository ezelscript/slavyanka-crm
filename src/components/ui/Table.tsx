import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border: 1px solid var(--NEUTRAL_2);
  border-radius: 1rem;
  border-spacing: 0;
  margin: 1rem 0;

  @media (max-width: 780px) {
    font-size: 1.4rem;
    & button {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 630px) {
    font-size: 1.1rem;
    & button {
      font-size: 1rem;
      padding: 0.5rem 0;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    & button {
      font-size: 0.8rem;
    }
  }
`;

const THead = styled.thead`
  height: 4rem;
  background-color: var(--NEUTRAL_2);
`;

const TBody = styled.tbody`
  & tr {
    height: 9rem;
  }
`;

const TFoot = styled.tfoot`
  height: 4rem;
  background-color: var(--NEUTRAL_2);

  & td:first-child {
    border-bottom-left-radius: 1rem;
    text-align: end;
  }

  & td:last-child {
    border-bottom-right-radius: 1rem;
  }
`;

const TR = styled.tr`
  &:not(:last-child) {
    box-shadow: 0 1px 0 0 var(--NEUTRAL_2);
  }

  & svg {
    width: 2rem;
    height: 2rem;

    @media (max-width: 630px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const TH = styled.th<{ $width: string }>`
  width: ${(props) => props.$width};
  text-transform: uppercase;
  padding: 1rem;

  &:first-child {
    border-top-left-radius: 1rem;
  }

  &:last-child {
    border-top-right-radius: 1rem;
  }

  @media (max-width: 576px) {
    &:not(:last-child) {
      padding: 0;
    }
  }
`;

const TD = styled.td`
  padding: 0.5rem;
  text-align: center;
`;

export { Table, THead, TBody, TFoot, TR, TH, TD };
