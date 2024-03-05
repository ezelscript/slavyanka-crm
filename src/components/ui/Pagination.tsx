import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { ROWS_PER_PAGE } from "../../constants";
import { TR, TD } from "./Table";
import Button from "./Button";

interface IProps {
  totalDataCount: number;
  currentDataCount: number;
  columns: number;
}

const PaginationButton = styled(Button)`
  margin: 0 auto;
`;
function Pagination({ totalDataCount, currentDataCount, columns }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const from = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const to = from + currentDataCount - 1;

  function changePage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <TR>
      <TD colSpan={columns - 2}>
        Показано {from}—{to} из {totalDataCount} записей
      </TD>
      <TD>
        <PaginationButton
          $variation="icon"
          disabled={from === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <BsArrowLeftCircle />
          Назад
        </PaginationButton>
      </TD>
      <TD>
        <PaginationButton
          $variation="icon"
          disabled={to === totalDataCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <BsArrowRightCircle />
          Вперед
        </PaginationButton>
      </TD>
    </TR>
  );
}

export default Pagination;
