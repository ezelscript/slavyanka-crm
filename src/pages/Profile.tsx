import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getUser } from "../backend/authorization";
import Loader from "../components/ui/Loader";
import Fallback from "../components/ui/Fallback";
import Section from "../components/layout/Section";
import Container from "../components/ui/Container";
import FlexCol from "../components/ui/FlexCol";
import FlexRow from "../components/ui/FlexRow";
import ChangePassword from "../features/user/ChangePassword";
import ChangePhoto from "../features/user/ChangePhoto";

const ProfileActions = styled(FlexRow)`
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;

  & ~ span {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
  }
`;

function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) return <Loader isFullScreen={true} />;
  if (error) return <Fallback error={error} />;

  const currentUser = data![0];

  return (
    <Section>
      <Container>
        <Heading>Настройки профиля</Heading>
        <FlexCol $align="center" $gap=".5rem">
          <Avatar src={currentUser.photo} alt="Фото профиля" />
          <span>{currentUser.full_name}</span>
          <span>{currentUser.email}</span>
        </FlexCol>
        <ProfileActions $align="flex-end">
          <ChangePassword userId={currentUser.user_id} />
          <ChangePhoto userId={currentUser.user_id} />
        </ProfileActions>
      </Container>
    </Section>
  );
}

export default Profile;
