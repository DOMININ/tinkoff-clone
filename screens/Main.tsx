import styled from 'styled-components/native';
import { getAuth, signOut } from 'firebase/auth';
import { Alert, Button } from 'react-native';
import { useContext } from 'react';
import { Context } from '../context';

export const Main = () => {
  const [, setContext] = useContext<any>(Context);
  const auth = getAuth();

  const handleLogout = async () => {
    setContext((prevState: any) => ({ ...prevState, loading: true }));
    await signOut(auth)
    .then(() => {
      setContext(
        { isAuth: false, id: '' }
      );
    })
    .catch((error) => Alert.alert('Failed logout:', error))
    .finally((() => setContext((prevState: any) => ({ ...prevState, loading: false }))));
  };

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
