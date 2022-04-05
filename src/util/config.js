import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBGU5bGwq58TieiPBBQejnWCAORPOpk2kk",
    authDomain: "laikapace.firebaseapp.com",
    databaseURL: "https://laikapace-default-rtdb.firebaseio.com",
    projectId: "laikapace",
    storageBucket: "laikapace.appspot.com",
    messagingSenderId: "1000391166325",
    appId: "1:1000391166325:web:f73f132ca36fa11c86eb3c",
    measurementId: "G-S4CJFJW21T"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;