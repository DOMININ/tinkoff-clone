import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

export const getUserAvatarUrl = async (uid: string) => {
  const storage = getStorage();
  const storageRefFolder = ref(storage, `avatars/`);
  const storageRef = ref(storage, `avatars/${uid}`);

  let isFileExist = false;
  await listAll(storageRefFolder).then(resp => {
    if (resp.items.some(folder => folder.name === uid)) {
      isFileExist = true;
    }
  });

  if (isFileExist) {
    return await getDownloadURL(storageRef)
    .then((url) => url);
  }

  return '';
};
