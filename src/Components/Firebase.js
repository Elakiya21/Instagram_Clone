import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkNQdFG7WHJJqhH-llLS1j9L-TCkb7i_w",
  authDomain: "instagram-94408.firebaseapp.com",
  projectId: "instagram-94408",
  storageBucket: "instagram-94408.appspot.com",
  messagingSenderId: "718903649322",
  appId: "1:718903649322:web:f79bad7072f5bfb9bb8f53",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
console.log(app);

export { auth, storage };
