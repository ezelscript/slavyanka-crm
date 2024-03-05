import { useContext } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { PageContext } from "../../contexts/page/PageContext";
import styled from "styled-components";
import {
  Table,
  THead,
  TBody,
  TFoot,
  TR,
  TH,
  TD,
} from "../../components/ui/Table";
import AddEntity from "../../components/ui/AddEntity";
import EmployeesForm from "./EmployeesForm";
import Pagination from "../../components/ui/Pagination";
import narrowData from "../../utils/narrowData";
import { EmployeesTable as TypedEmployeesTable } from "../../types";

const employeesSortFunctions = {
  "created_at-asc": (a: TypedEmployeesTable, b: TypedEmployeesTable) =>
    Date.parse(a.created_at) - Date.parse(b.created_at),
  "created_at-desc": (a: TypedEmployeesTable, b: TypedEmployeesTable) =>
    Date.parse(b.created_at) - Date.parse(a.created_at),
  "full_name-asc": (a: TypedEmployeesTable, b: TypedEmployeesTable) =>
    a.full_name.localeCompare(b.full_name),
  "full_name-desc": (a: TypedEmployeesTable, b: TypedEmployeesTable) =>
    b.full_name.localeCompare(a.full_name),
};

const Avatar = styled.img`
  border-radius: 50%;
  height: 8rem;
  width: 8rem;
  min-width: 8rem;

  object-fit: cover;
  object-position: top;

  @media (max-width: 480px) {
    min-width: 6rem;
    height: 6rem;
  }
`;

function EmployeesTable() {
  const [searchParams] = useSearchParams();
  const initialEmployeesData = useContext(PageContext) as TypedEmployeesTable[];

  const sortParams =
    (searchParams.get("sort") as keyof typeof employeesSortFunctions) ||
    "created_at-desc";
  const sortFn = employeesSortFunctions[sortParams];

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [narrowedEmployees] = narrowData(
    initialEmployeesData,
    null,
    sortFn,
    currentPage
  );

  if (!narrowedEmployees.length)
    return (
      <Navigate
        to={{
          search: searchParams
            .toString()
            .replace(`page=${currentPage}`, `page=${currentPage - 1}`),
        }}
      />
    );

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH $width="15%">Фото</TH>
            <TH $width="35%">Полное имя</TH>
            <TH $width="25%">Должность</TH>
            <TH $width="25%">Эл. почта</TH>
          </TR>
        </THead>

        <TBody>
          {narrowedEmployees!.map((employee) => (
            <TR key={employee.id}>
              <TD>
                <Avatar
                  src={employee.photo || "photo_placeholder.jpg"}
                  alt={employee.full_name}
                  width={465}
                  height={265}
                />
              </TD>
              <TD>{employee.full_name}</TD>
              <TD>{employee.position}</TD>
              <TD>
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </TD>
            </TR>
          ))}
        </TBody>

        <TFoot>
          <Pagination
            totalDataCount={initialEmployeesData.length}
            currentDataCount={narrowedEmployees.length}
            columns={4}
          />
        </TFoot>
      </Table>

      <AddEntity Entity={EmployeesForm} />
    </>
  );
}

export default EmployeesTable;
