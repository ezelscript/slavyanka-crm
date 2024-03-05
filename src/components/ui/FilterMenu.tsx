import styled from "styled-components";
import Button from "./Button";
import FlexRow from "./FlexRow";
import { Options, State } from "./FilterSortMenu";

interface IProps {
  options: Options[];
  currentFilter: string;
  setFilter: React.Dispatch<React.SetStateAction<State>>;
}

const OptionBtn = styled(Button)`
  width: 12rem;
  height: 5rem;
  font-size: 1.6rem;
  padding: 0.5rem;
  border-radius: 1rem;

  @media (max-width: 530px) {
    width: 8rem;
    height: 5rem;
    font-size: 1.3rem;
  }
`;

function FilterMenu({ options, currentFilter, setFilter }: IProps) {
  return (
    <FlexRow as="ul" $gap=".5rem">
      {options.map((option) => (
        <li key={option.value}>
          <OptionBtn
            $variation={
              currentFilter === option.value ? "primary" : "secondary"
            }
            disabled={currentFilter === option.value}
            onClick={() =>
              setFilter((cur) => ({ ...cur, filter: option.value }))
            }
          >
            {option.description}
          </OptionBtn>
        </li>
      ))}
    </FlexRow>
  );
}

export default FilterMenu;
