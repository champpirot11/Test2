import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxOVgoNu8hHeQlLJlLzVwacmctbUUT1f8",
  authDomain: "test-b80d5.firebaseapp.com",
  databaseURL: "https://test-b80d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-b80d5",
  storageBucket: "test-b80d5.firebasestorage.app",
  messagingSenderId: "800551933290",
  appId: "1:800551933290:web:9878d7624f7e07b5c4c113"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, remove };
