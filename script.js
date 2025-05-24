// 1) Import Firebase as ES modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 2) Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyDImCCrAIW27PMrabFBpYeNxvPd80y-5O4",
  authDomain: "counter-app-4cf98.firebaseapp.com",
  projectId: "counter-app-4cf98",
  storageBucket: "counter-app-4cf98.firebasestorage.app",
  messagingSenderId: "782130723150",
  appId: "1:782130723150:web:05ccfceef360a6d7e5c61f",
  measurementId: "G-B3MRJQ6PLW"
};

// 3) Initialize Firebase & Firestore services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Reference the "main" document in a "counters" collection
const counterRef = doc(db, "counters", "main");

// 4) Grab HTML elements by ID
const $count = document.getElementById("count");
const $inc   = document.getElementById("inc");
const $dec   = document.getElementById("dec");
const $reset = document.getElementById("reset");

// 5) Read (and if needed create) the counter value from Firestore
async function loadCount() {
  const snap = await getDoc(counterRef);
  if (!snap.exists()) {
    await setDoc(counterRef, { value: 0 });
    return 0;
  }
  return snap.data().value;
}

// 6) Render the count in the UI with dynamic colors
async function render() {
  const n = await loadCount();
  $count.textContent = n;
  // Color based on value: positive = green, negative = red, zero = blue
  if (n > 0) {
    $count.style.color = "#34A853";
  } else if (n < 0) {
    $count.style.color = "#EA4335";
  } else {
    $count.style.color = "#4285F4";
  }
}

// 7) Attach CRUD event handlers with debug logs
$inc.onclick = async () => {
  console.log('+1 clicked');
  const current = await loadCount();
  await updateDoc(counterRef, { value: current + 1 });
  render();
};

$dec.onclick = async () => {
  console.log('-1 clicked');
  const current = await loadCount();
  await updateDoc(counterRef, { value: current - 1 });
  render();
};

$reset.onclick = async () => {
  console.log('reset clicked');
  await deleteDoc(counterRef);
  render();
};

// 8) Initial render on page load
render();
