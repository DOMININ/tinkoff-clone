import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const showImagePicker = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert('You\'ve refused to allow this app to access your photos!');
    return '';
  }

  const result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
    return result.uri;
  }

  return '';
};
