import styled from "styled-components";
import FlexCol from "./FlexCol";
import { Options, State } from "./FilterSortMenu";

interface IProps {
  options: Options[];
  currentSort: string;
  setSort: React.Dispatch<React.SetStateAction<State>>;
}

const Select = styled.select`
  padding: 0.5rem 0;
  background-color: var(--NEUTRAL_2);
  border: 1px solid var(--NEUTRAL_1);
  border-radius: 5px;
  cursor: pointer;
  transition: border 0.2s ease-in-out;

  &:hover,
  &:focus {
    border: 1px solid var(--BLUE_1);
  }
`;

function SortMenu({ options, currentSort, setSort }: IProps) {
  return (
    <FlexCol as="label" $align="center">
      Сортировать по:
      <Select
        value={currentSort}
        onChange={(e) => setSort((cur) => ({ ...cur, sort: e.target.value }))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description}
          </option>
        ))}
      </Select>
    </FlexCol>
  );
}

export default SortMenu;
