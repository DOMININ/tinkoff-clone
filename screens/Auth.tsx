import React, { useState } from 'react';
import styled from 'styled-components/native';
import { YellowButton } from '../components/YellowButton';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../hooks/useAuth';

interface Data {
  email: string,
  password: string
}

export const Auth = () => {
  const [data, setData] = useState<Data>({} as Data);
  const { handleLogin } = useAuth();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Wrapper>
          <Title>Auth Page</Title>
          <Input
            onChangeText={(value) => setData(prevState => ({ ...prevState, email: value }))}
            value={data.email}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#cecfd1"
          />
          <Input
            onChangeText={(value) => setData(prevState => ({ ...prevState, password: value }))}
            value={data.password}
            placeholder="Password"
            placeholderTextColor="#cecfd1"
            secureTextEntry
            style={{ marginBottom: 20 }}
          />
          <YellowButton text="Auth" onPress={() => handleLogin(data.email, data.password)} />
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
