import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATXGBEtFTABHbvOd-2UsLa7FIEC6neF_A",
    authDomain: "house-marketplace-53f08.firebaseapp.com",
    projectId: "house-marketplace-53f08",
    storageBucket: "house-marketplace-53f08.appspot.com",
    messagingSenderId: "724940629311",
    appId: "1:724940629311:web:59db8b8fb8e0330c735f8a",
    measurementId: "G-NSL4BEK5MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()