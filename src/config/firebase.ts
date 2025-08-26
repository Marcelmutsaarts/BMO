import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDpdo4B35HhdH-zWEu-Z99iau-C-906XYA",
  authDomain: "bmo-data-collection.firebaseapp.com",
  databaseURL: "https://bmo-data-collection-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bmo-data-collection",
  storageBucket: "bmo-data-collection.firebasestorage.app",
  messagingSenderId: "985709730378",
  appId: "1:985709730378:web:43d0f341d05dfbd3d8a4b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;