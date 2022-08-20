import { getStorage, ref, uploadBytes, deleteObject, listAll } from 'firebase/storage';

export const uploadImageAsync = async (uid: string, uri: string) => {
  const storage = getStorage();
  const storageRefFolder = ref(storage, `avatars/`);
  const storageRef = ref(storage, `avatars/${uid}`);
  const response = await fetch(uri);
  const blob = await response.blob();

  let isFileExist = false;
  await listAll(storageRefFolder).then(resp => {
    if (resp.items.some(folder => folder.name === uid)) {
      isFileExist = true;
    }
  });

  if (isFileExist) {
    await deleteObject(storageRef);
  }

  await uploadBytes(storageRef, blob);
};
