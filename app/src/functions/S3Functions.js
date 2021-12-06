import { Storage } from "aws-amplify";

export async function updateObject(newFile, oldKey) {
  await deleteObject(oldKey);
  return await uploadObject(newFile);
}

export async function deleteObject(key) {
  await Storage.remove(key);
}

export async function uploadObject(file) {
  const filename = `${Date.now()}-${file.name}`;
  return await Storage.put(filename, file, {
    contentType: file.type
  });
}

export async function getObjects() {
  return await Storage.list("");
}

export async function getDownloadUrl(key) {
  return await Storage.get(key);
}