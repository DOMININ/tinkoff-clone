import React, { useState } from 'react';
import styled from 'styled-components/native';
import { YellowButton } from '../components/YellowButton';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';

interface Data {
  email: string,
  password: string
}

export const Auth = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { handleLogin, handleRegister, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Wrapper>
          <Title>{isLoginPage ? 'Auth Page' : 'Register Page'}</Title>
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
          <YellowButton
            text={isLoginPage ? 'Auth' : 'Register'}
            onPress={() =>
              isLoginPage
                ? handleLogin(data.email, data.password)
                : handleRegister(data.email, data.password)}
          />

          <LinkButtonWrapper>
            <LinkButtonText>
              {isLoginPage ? 'New to Tinkoff-clone?' : 'Already have an account?'}
            </LinkButtonText>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsLoginPage((prevState) => !prevState)}
            >
              <LinkButtonTextAction>
                {isLoginPage ? ' Create an account' : ' Sign in'}
              </LinkButtonTextAction>
            </TouchableOpacity>
          </LinkButtonWrapper>
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

const LinkButtonWrapper = styled.View`
  margin-top: 15px;
  flex-direction: row;
  text-align: right;
  justify-content: flex-end;
`;

const LinkButtonText = styled.Text`
  font-size: 15px;
  color: #ffffff;
`;

const LinkButtonTextAction = styled.Text`
  font-size: 15px;
  color: #006ce8;
`;
