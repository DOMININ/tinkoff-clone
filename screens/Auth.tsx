import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { YellowButton } from '../components/YellowButton';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Context } from '../context';

export const Auth = () => {
  const [, setContext] = useContext<any>(Context);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const auth = getAuth();

  const handleLogin = async () => {
    setContext((prevState: any) => ({ ...prevState, loading: true }));
    await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setContext(
        { isAuth: true, id: user.uid }
      );
    })
    .catch((error) => Alert.alert('Failed login:', error))
    .finally(() => setContext((prevState: any) => ({ ...prevState, loading: false })));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Wrapper>
          <Title>Auth Page</Title>
          <Input
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#cecfd1"
          />
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#cecfd1"
            secureTextEntry
            style={{ marginBottom: 20 }}
          />
          <YellowButton text="Auth" onPress={handleLogin} />
        </Wrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  padding: 10px;
  flex: 1;
  background-color: #000000;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  color: #ffe100;
`;

const Wrapper = styled.View`
  width: 70%;
`;

const Input = styled.TextInput`
  padding: 10px 0;
  margin-bottom: 10px;
  color: #ffffff;
  border-bottom-color: #ffffff;
  border-bottom-width: 2px;
  font-size: 18px;
`;
