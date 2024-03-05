import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import styled from "styled-components";
import FlexRow from "./FlexRow";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";

export interface Options {
  value: string;
  description: string;
}

export interface State {
  filter?: string;
  sort?: string;
}

interface IProps {
  page: string;
  filterOptions?: Options[];
  sortOptions?: Options[];
  defaults: State;
}

const Wrapper = styled(FlexRow)`
  flex-wrap: wrap;
`;

function FilterSortMenu({
  page,
  filterOptions,
  sortOptions,
  defaults,
}: IProps) {
  const [pagePreferences, setPagePreferences] = useLocalStorage<State>(
    `${page}View`,
    defaults
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (
      pagePreferences.filter === defaults.filter &&
      !searchParams.has("filter")
    )
      return;

    searchParams.set("filter", pagePreferences.filter!);
    setSearchParams(searchParams);
  }, [pagePreferences.filter]);

  useEffect(() => {
    if (pagePreferences.sort === defaults.sort && !searchParams.has("sort"))
      return;

    searchParams.set("sort", pagePreferences.sort!);
    setSearchParams(searchParams);
  }, [pagePreferences.sort]);

  return (
    <Wrapper $gap="2rem" $align="flex-end" $justify="center">
      {filterOptions && (
        <FilterMenu
          options={filterOptions}
          currentFilter={pagePreferences.filter!}
          setFilter={setPagePreferences}
        />
      )}
      {sortOptions && (
        <SortMenu
          options={sortOptions}
          currentSort={pagePreferences.sort!}
          setSort={setPagePreferences}
        />
      )}
    </Wrapper>
  );
}

export default FilterSortMenu;
