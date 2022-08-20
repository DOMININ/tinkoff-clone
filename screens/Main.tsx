import styled from 'styled-components/native';
import { Button, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { ActionSheetCustom } from '../components/ActionSheetCustom';
import { openCamera } from '../utils/openCamera';
import { showImagePicker } from '../utils/showImagePicker';
import { uploadImageAsync } from '../utils/uploadImage';
import { getUserAvatarUrl } from '../utils/getUserAvatarUrl';
import { AvatarIcon } from '../components/Avatar';

export const Main = () => {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [isActiveActionSheet, setIsActiveActionSheet] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const { handleLogout, getUserData, user, userInfo, isLoading } = useAuth();

  useEffect(() => {
    getUserData(user!.uid);

    if (!pickedImagePath) {
      setIsAvatarLoading(true);
      getUserAvatarUrl(user!.uid).then((url) => {
        setPickedImagePath(url);
        setIsAvatarLoading(false);
      });
    }
  }, []);

  const selectActionSheetAction = async (index: number) => {
    setIsActiveActionSheet(false);

    switch (index) {
      case 0:
        const uriGallery = await showImagePicker();
        setPickedImagePath(uriGallery);
        await uploadImageAsync(user!.uid, uriGallery);
        break;
      case 1:
        const uriPhoto = await openCamera();
        setPickedImagePath(uriPhoto);
        await uploadImageAsync(user!.uid, uriPhoto);
        break;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <TouchableOpacity activeOpacity={1} onPress={() => setIsActiveActionSheet(true)}>
        <AvatarIcon path={pickedImagePath} loading={isAvatarLoading} />
      </TouchableOpacity>
      <Title>{userInfo?.name}</Title>
      <BlockList>
        <Block />
      </BlockList>
      <Button title="Logout" onPress={handleLogout} />

      <ActionSheetCustom
        title="Avatar"
        options={['Gallery', 'Camera', 'Delete picture', 'Cancel']}
        selectedIndex={selectActionSheetAction}
        visible={isActiveActionSheet}
      />
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
