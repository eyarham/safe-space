const defaultApiKey = ""//"AIzaSyDl8R22u1-EN2uIqQbgLVg3ylVf1C4v1bE";
const defaultAppId = ""//"1:191963884767:web:808121b95a4db024a84d6a";
// const apiKey = (process.env && process.env.FIREBASE_API_KEY) || defaultApiKey;
// const appId = (process.env && process.env.FIREBASE_APP_ID) || defaultAppId;

const apiKey = (process.env && process.env.FIREBASE_API_KEY) || defaultApiKey;
const appId = (process.env && process.env.FIREBASE_APP_ID) || defaultAppId;
const firebaseConfig = {
  apiKey,
  authDomain: "safe-649c4.firebaseapp.com",
  projectId: "safe-649c4",
  storageBucket: "safe-649c4.appspot.com",
  messagingSenderId: "191963884767",
  appId
};

export default firebaseConfig;