import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  path: string;
  loading?: boolean;
}

export const AvatarIcon = ({ path, loading = false }: Props) => {
  if (loading) {
    return (
      <Placeholder>
        <ActivityIndicator />
      </Placeholder>
    );
  }

  if (!path) {
    return (
      <Placeholder>
        <AntDesign name="user" size={32} color="black" />
      </Placeholder>
    );
  }

  return (
    <Avatar source={{ uri: path }} />
  );
};

const Placeholder = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #e2e2e2;
  border-radius: 50%;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
