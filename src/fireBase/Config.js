
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


 export const firebaseConfig = {
  apiKey: "AIzaSyBTixebX-fJGpYSnzvQ_4wHNLA409otP18",
  authDomain: "pestroonline.firebaseapp.com",
  projectId: "pestroonline",
  storageBucket: "pestroonline.appspot.com",
  messagingSenderId: "1081192363351",
  appId: "1:1081192363351:web:4dfcacaa3e71fde30aba12"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;