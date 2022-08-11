import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const Loader = () => {
  return (
    <Overlay>
      <ActivityIndicator color="#ffe100" size="large" />
    </Overlay>
  );
};

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
