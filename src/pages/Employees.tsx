import styled from "styled-components";
import { getAllEmployees } from "../backend/employees";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import PageProvider from "../contexts/page/PageContext";
import EmployeesTable from "../features/employees/EmployeesTable";
import FlexRow from "../components/ui/FlexRow";
import FilterSortMenu from "../components/ui/FilterSortMenu";

const EmployeesHeading = styled(FlexRow)`
  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    & h1 {
      text-align: center;
    }
  }
`;

const employeesSortOptions = [
  {
    description: "Дате регистрации (↓)",
    value: "created_at-desc",
  },
  {
    description: "Дате регистрации (↑)",
    value: "created_at-asc",
  },
  {
    description: "Имени (↓)",
    value: "full_name-desc",
  },
  {
    description: "Имени (↑)",
    value: "full_name-asc",
  },
];

function Employees() {
  return (
    <PageProvider queryFn={getAllEmployees} queryKey={["employees"]}>
      <Section>
        <Container>
          <EmployeesHeading $justify="space-between" $align="flex-end">
            <h1>Данные по пользователям</h1>
            <FilterSortMenu
              page="employees"
              sortOptions={employeesSortOptions}
              defaults={{ sort: employeesSortOptions[0].value }}
            />
          </EmployeesHeading>

          <EmployeesTable />
        </Container>
      </Section>
    </PageProvider>
  );
}

export default Employees;
