import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvZardZeALUC_rzCQobEd2u5PcfEX8Sls",
    authDomain: "storefront-app-47f10.firebaseapp.com",
    projectId: "storefront-app-47f10",
    storageBucket: "storefront-app-47f10.firebasestorage.app",
    messagingSenderId: "782739127599",
    appId: "1:782739127599:web:e49610ec983ca806e875da"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);