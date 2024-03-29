import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getLoggedInUser } from "../user/api";
// import { getCurrentSub } from "../user/api";
// Allows for better testing experience
const firebase = {
  getAuth, collection, doc, getDoc, getFirestore, setDoc, deleteDoc
}

const api = (collectionString) => {
  var db;
  const getDb = () => {
    if (!db) { db = firebase.getFirestore(); }
    return db;
  }
  var coll;
  const getCollection = () => {
    if (!coll) { coll = firebase.collection(getDb(), collectionString); }
    return coll;
  }
  var auth;
  var getAuth = () => {
    if (!auth) { auth = firebase.getAuth(); }
    return auth;
  }
  const getCurrentUser = () => {
    const user = getAuth().currentUser;
    if (user) {
      return user;
    }
  }
  const getDocRef = (id) => {
    return firebase.doc(getDb(), collectionString, id);
  }

  const getDocsSub = (callback) => {
    const q = query(getCollection());
    const unsub = onSnapshot(q, snapshot => {
      callback(snapshot.docs);
    });
    return unsub;
  }
  const getById = async id => {
    const docRef = getDocRef(id);
    return await firebase.getDoc(docRef);
  }
  const getByIdSub = (id, callback) => {
    const unsub = onSnapshot(getDocRef(id), (docSnapshot) => {
      callback(docSnapshot);
    });
    return unsub;
  }

  const createDoc = async doc => {
    const user = await getLoggedInUser();

    const docToAdd = {
      createdBy: (user && user.id) || "unknown",
      createdDate: new Date(),
      ...doc
    }
    return await addDoc(getCollection(), docToAdd);
  }

  const set = async (id, data) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...data };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const updateDoc = async (id, data) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...data };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const updateField = async (id, fieldObj) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...fieldObj };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const deleteDocument = async id => {
    await firebase.deleteDoc(getDocRef(id));
  }


  // const getDocsForCurrentUserSub = (callback) => {
  //   const user = getCurrentUser();
  //   if(!user){return;}
  //   const q = query(getCollection(), where("createdBy", "==", user.uid));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     callback(querySnapshot.docs);
  //   });
  //   return unsub;
  // }

  const getCurrentUserSub = callback => {
    const unsubUser = onAuthStateChanged(getAuth(), user => {
      callback(user);
    })
    return unsubUser
  }

  const getDocsForCurrentUserSub = (callback) => {
    const unsubUser = onAuthStateChanged(getAuth(), user => {
      if (user) {
        const q = query(getCollection(), where("createdBy", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
          callback(querySnapshot.docs);
        });
        return unsub;
      }
    })
    return unsubUser
  }

  const confirmAddress = async (inputValue) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&polygon_geojson=1&addressdetails=1&limit=1`
    const responseString = await fetch(nominatimUrl);
    const response = await responseString.json();
    if (response && response.length > 0) {
      const address = response[0];
      return address;
    }
  }

  const getDocsByFieldSub = (field, value, callback) => {
    const q = query(getCollection(), where(field, "==", value));
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }
  const getDocsByFieldsSub = (fieldValueArray, callback) => {
    const whereClause = fieldValueArray.map(x => where(x.field, "==", x.value));
    const q = query(getCollection(), ...whereClause);
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }
  const getDocsByField = async (field, value) => {
    const q = query(getCollection(), where(field, "==", value));
    const snapshot = await getDocs(q);
    return snapshot.docs;
  }
  const getDocsByFields = async (fieldValueArray) => {
    const whereClause = fieldValueArray.map(x => where(x.field, "==", x.value));
    const q = query(getCollection(), ...whereClause);
    const snapshot = await getDocs(q);
    return snapshot.docs;
  }

  // const getDocsByCurrentUserFieldSub = (field, callback) => {
  //   return getCurrentSub(currentUser => {
  //     if (currentUser) {
  //       return getDocsByFieldSub(field, currentUser.id, callback);
  //     }
  //   })
  // }

  // const getDocsByCurrentUserFieldAndOtherFieldsSub = (userIdField, fieldValueArray, callback) => {
  //   return getCurrentSub(currentUser => {
  //     if (currentUser) {
  //       return getDocsByFieldsSub([{ field: userIdField, value: currentUser.id }, ...fieldValueArray], callback);
  //     }
  //   })
  // }


  return {
    // getDocsByCurrentUserFieldSub, 
    getDocsByFieldsSub,
    // getDocsByCurrentUserFieldAndOtherFieldsSub, 
    getDocsByFieldSub,
    getDocsByField,
    getDocsByFields,
    confirmAddress,
    getCurrentUserSub,
    getCurrentUser,
    createDoc,
    getDocRef,
    getCollection,
    getById,
    set,
    deleteDocument,
    getByIdSub,
    getDocsSub,
    getDocsForCurrentUserSub,
    updateDoc,
    updateField
  };
}
export default api;

