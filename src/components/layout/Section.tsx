import styled from "styled-components";

export default styled.section`
  padding: 5rem 0 2rem 0;

  & h1 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 3rem;
    font-weight: bold;

    @media (max-width: 500px) {
      font-size: 2.4rem;
    }
  }
`;
