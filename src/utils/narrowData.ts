import { ROWS_PER_PAGE } from "../constants";

function narrowData<T>(
  dataArr: T[],
  filterFn: ((entity: T) => boolean) | null,
  sortFn: ((entityA: T, entityB: T) => number) | null,
  page: number | null
) {
  let copy = [...dataArr];
  let totalLength = copy.length;

  if (filterFn) {
    copy = copy.filter(filterFn);
    totalLength = copy.length;
  }

  if (sortFn) {
    copy = copy.sort(sortFn);
  }

  if (page) {
    copy = copy.slice((page - 1) * ROWS_PER_PAGE, ROWS_PER_PAGE * page);
  }

  return [copy, totalLength] as const;
}

export default narrowData;
