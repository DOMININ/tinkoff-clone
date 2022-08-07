import React from 'react';
import styled from 'styled-components/native';

export type Props = {
  text: string;
  onPress: () => void;
}

const Button = styled.TouchableHighlight`
  align-items: center;
  padding: 10px;
  background-color: #ffe100;
  width: 100%;
  border-radius: 10px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: #000000;
`;

export const YellowButton = ({ text, onPress }: Props) => {
  return (
    <Button onPress={onPress} underlayColor="#968302">
      <Text>{text}</Text>
    </Button>
  );
};
