import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCaKavpTuHg5QSCXTA6aO0rXBUBizE4INw",
  authDomain: "a-chat-files.firebaseapp.com",
  projectId: "a-chat-files",
  storageBucket: "a-chat-files.appspot.com",
  messagingSenderId: "326379369254",
  appId: "1:326379369254:web:03418fc91c11557b05c7e7",
  measurementId: "G-LSYPVCDWT1"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)