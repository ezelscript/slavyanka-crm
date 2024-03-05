import styled from "styled-components";
import Logo from "../components/ui/Logo";
import Main from "../components/layout/Main";
import LoginForm from "../features/authorization/LoginForm";
import Footer from "../components/layout/Footer";
import FirstVisit from "../features/authorization/FirstVisit";

const LoginMain = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginSection = styled.section`
  background-color: var(--NEUTRAL_2);
  width: 80%;
  max-width: 40rem;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  box-shadow: 0 0 0.5rem 1rem var(--NEUTRAL_4);
  border-radius: 1rem;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

function Login() {
  return (
    <>
      <LoginMain>
        <LoginSection>
          <Logo />
          <H1>Войдите в свой аккаунт</H1>
          <LoginForm />
        </LoginSection>
      </LoginMain>
      <Footer />
      <FirstVisit />
    </>
  );
}

export default Login;
