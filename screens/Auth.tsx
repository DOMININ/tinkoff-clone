import React from 'react';
import styled from 'styled-components/native';
import { YellowButton } from '../components/YellowButton';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

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

export const Auth = () => {
  const [text, onChangeText] = React.useState<string>('');
  const [number, onChangeNumber] = React.useState<string>('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Wrapper>
          <Title>Auth Page</Title>
          <Input
            onChangeText={onChangeText}
            value={text}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#cecfd1"
          />
          <Input
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Password"
            placeholderTextColor="#cecfd1"
            style={{ marginBottom: 20 }}
          />
          <YellowButton text="Auth" onPress={() => Alert.alert('Auth')} />
        </Wrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
};
