import { getAuth, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import api from "../_common/api";

const { getCurrentUser, getCollection, set, getById, getByIdSub, getCurrentUserSub, createDoc, getDocsSub, updateField } = api("users");

const create = async (authId) => {
  var newUserData = {
    userId: authId,
    authId: authId,
    displayName: ''
  };
  const docRef = await createDoc(newUserData);
  return await getDoc(docRef);
}

const get = async () => {
  const user = getCurrentUser();
  return await getByAuthId(user.uid);
}

const getCurrentSub = (callback) => {
  return getCurrentUserSub(user => {
    getByAuthIdSub(user.uid, callback);
  })
}

const getLoggedInUser = async () => {
  const authUser = getCurrentUser();
  if (authUser) {
    const user = await getByAuthId(authUser.uid);
    return user;
  }
}

const getCurrentUserId = async () => {
  const authUser = getCurrentUser();
  if (!authUser)
    return null;
  const user = await getByAuthId(authUser.uid);
  return user.id;
}

const getByAuthId = async (id) => {
  const q2 = query(getCollection(), where("userId", "==", id));
  const membershipQuerySnapshot = await getDocs(q2);
  if (membershipQuerySnapshot.empty) return await getDoc(create(id));
  return membershipQuerySnapshot.docs[0];
}
const getByAuthIdSub = (id, callback, onError) => {
  const q = query(getCollection(), where("userId", "==", id));
  // const membershipQuerySnapshot = await getDocs(q2);
  // if (membershipQuerySnapshot.empty) return await getDoc(create(id));
  //return membershipQuerySnapshot.docs[0];

  const unsub = onSnapshot(q, snapshot => {
    const user = snapshot.docs[0];
    callback(user);
  }, error => {
    onError(error)
  });
  return unsub;
}


const updateUserEmail = async (newEmail, pw) => {
  const user = getCurrentUser();
  if (pw !== "") {
    await signInWithEmailAndPassword(getAuth(), user.email, pw);
  }
  try {
    await updateEmail(user, newEmail);
    return { valid: true };
  } catch (e) {
    switch (e.code) {
      case 'auth/invalid-email':
        return {
          valid: false, message: "Please enter a valid email address."
        }
      case 'auth/email-already-in-use':
        return {
          valid: false, message: "This email is already in use. \nIf you did not create an account with this email, please contact the site administrator."
        }
      case 'auth/requires-recent-login':
        return {
          valid: null
        }
      default:
        return {
          success: false, message: e.code
        }
    }
  }
}

const getUserName = async (userId) => {
  if (!userId) return;

  const user = await getById(userId);
  const userName = user.data().displayName
  return userName;

}
const getUserNameSub = async (userId, callback) => {
  if (!userId) return;
  return getByIdSub(userId, (user) => {
    const userName = user.data() && user.data().displayName
    callback(userName);
  })

}

const getUserPronouns = async (userId) => {
  if (!userId) return;
  const user = await getById(userId);
  return user.data() && user.data().pronouns;
}

const setIsModerator = async (userId, isModerator) => {
  if (!userId) return;
  await updateField(userId, { isModerator })
}

export {
  create,
  get,
  getByIdSub,
  getCurrentSub,
  set,
  updateUserEmail,
  getUserName,
  getCurrentUserId,
  getUserPronouns,
  getUserNameSub,
  getLoggedInUser,
  getByAuthIdSub,
  getById,
  getDocs,
  getDocsSub,
  setIsModerator
};

