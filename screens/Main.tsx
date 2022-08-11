import styled from 'styled-components/native';
import { Button } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export const Main = () => {
  const { handleLogout } = useAuth();

  return (
    <Container>
      <Title>Dmitry</Title>
      <BlockList>
        <Block />
      </BlockList>
      <Button title="Logout" onPress={handleLogout} />
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  flex: 1;
  background-color: #000000;
`;

const Title = styled.Text`
  color: #f2f2f2;
`;

const BlockList = styled.View`
  flex: 1;
`;

const Block = styled.View`
  padding: 30px;
  background-color: #1c1c1e;
  border-radius: 15px;
`;
