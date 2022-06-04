import { Auth } from "aws-amplify";
import { checkIfUserIsAdmin } from "./RDSFunctions";


export async function getAuthInfo() {
//   let x = await Auth.currentUserCredentials(); 
    return await (await Auth.currentUserCredentials()).identityId;
//   return x.data.IdentityId;
}

export async function isAdmin() {
  try {
    let res = await checkIfUserIsAdmin(await getAuthInfo());
    return res;
  }
  catch (e) {
    if (e !== "No current user" && !e.includes("cannot get guest credentials")) {
      alert(e);
    }
    return false;
  }
}