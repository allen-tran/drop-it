import { Config } from "../config/config.json";

export async function addUserToRDS(newUser) {
  fetch(
    `${Config.DB_QUERY}` +
      `/users/add?id=${newUser.userId}&firstName=${newUser.firstName}` +
      `&lastName=${newUser.lastName}`
  ).catch((err) => {
    console.log(err);
  });
}

export async function checkIfUserExists(userId) {
  let exists = false;
  await fetch(`${Config.DB_QUERY}/users?id=${userId}`)
    .then((response) => response.json())
    .then((response) => {
      exists = response.exists;
    })
    .catch((err) => {
      console.log(err);
    });
  return exists;
}

export async function checkIfUserIsAdmin(userId) {
  let isAdmin = false;
  await fetch(`${Config.DB_QUERY}/users?id=${userId}`)
    .then((response) => response.json())
    .then((response) => {
      isAdmin = response.isAdmin;
    })
    .catch((err) => {
      console.log(err);
    });
  return isAdmin;
}

export async function addFileToTable(fileData) {
  const { userId, fileId, title, description, size } = fileData;
  fetch(
    `${Config.DB_QUERY}/files/add?userId=${userId}&fileId=${fileId}&title=${title}` +
      `&description=${description}&size=${size}`
  ).catch((err) => {
    console.log(err);
  });
}

export async function getUserFiles(userId) {
  let objs = [];
  await fetch(`${Config.DB_QUERY}/files?id=${userId}`)
    .then((response) => response.json())
    .then((response) => {
      objs = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return objs;
}

export async function deleteFile(userId, entryId) {
  let objs = [];
  await fetch(`${Config.DB_QUERY}/files/remove?id=${entryId}&userId=${userId}`)
    .then((response) => response.json())
    .then((response) => {
      objs = response.data;
    })
    // eslint-disable-next-line no-console
    .catch((err) => {
      console.log(err);
    });
  return objs;
}

export async function updateFile(newFileData) {
  let objs = [];
  let { entryId, userId, title, fileName, size, description } = newFileData;
  if (!entryId) return objs;
  title = title ? title : "";
  fileName = fileName ? fileName : "";
  size = size ? size : "";
  description = description ? description : "";
  await fetch(
    `${Config.DB_QUERY}` +
      `/files/update?entryId=${entryId}&userId=${userId}&fileId=${fileName}` +
      `&title=${title}&description=${description}&size=${size}`
  )
    .then((response) => response.json())
    .then((response) => {
      objs = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return objs;
}
