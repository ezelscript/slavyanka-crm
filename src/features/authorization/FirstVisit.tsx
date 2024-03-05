import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styled from "styled-components";
import { BsQuestionCircle, BsXCircle } from "react-icons/bs";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

const HintButton = styled(Button)`
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);

  & svg {
    width: 5rem;
    height: 5rem;
  }
`;

const CloseBtn = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const Wrapper = styled.article`
  position: relative;
  width: 90%;
  max-width: 90rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 2rem;
  background-color: var(--NEUTRAL_2);
  border-radius: 1rem;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.3;

  & strong {
    text-decoration: underline 1px solid;
    text-underline-offset: 3px;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const SubHeading = styled.h3`
  font-size: 1.7rem;
`;

function FirstVisit() {
  const [hintIsShown, setHintIsShown] = useState<boolean>(false);
  const ref = useOutsideClick(() => setHintIsShown(false), hintIsShown);

  return (
    <>
      <HintButton $variation="icon" onClick={() => setHintIsShown(true)}>
        <BsQuestionCircle />
      </HintButton>
      {hintIsShown && (
        <Modal>
          <Wrapper ref={ref}>
            <Heading>
              Здравствуйте! Рад приветствовать Вас в своем приложении!
            </Heading>
            <SubHeading>
              Данное приложение - небольшая CRM-система, разработанная для
              сотрудников гостиницы, которая способствует выполнению
              административных обязанностей
            </SubHeading>
            <div>
              <p>Для первичного входа можно использовать следующие данные:</p>
              <p>
                Email: <strong>test@gmail.com</strong>
              </p>
              <p>
                Пароль: <strong>123456</strong>
              </p>
            </div>
            <p>
              Далее, при желании, Вы можете создать свою учетную запись на
              странице "Пользователи" → "Добавить" и впоследствии редактировать
              её на странице "Профиль"
            </p>
            <p>
              Некоторые CRUD-операции на страницах недоступны для сохранения
              иммутабельности фундаментальных данных
            </p>
            <p>Надеюсь, Вам понравится!</p>

            <CloseBtn $variation="icon" onClick={() => setHintIsShown(false)}>
              <BsXCircle />
            </CloseBtn>
          </Wrapper>
        </Modal>
      )}
    </>
  );
}

export default FirstVisit;
