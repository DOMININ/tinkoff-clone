import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const openCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert('You\'ve refused to allow this app to access your camera!');
    return '';
  }

  const result = await ImagePicker.launchCameraAsync();

  if (!result.cancelled) {
    return result.uri;
  }

  return '';
};
