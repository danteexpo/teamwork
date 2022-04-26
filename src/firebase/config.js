import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBaq-v4iQ5DsMXic0-8pyE5NibZ8xRAFC8",
	authDomain: "team-work-444e9.firebaseapp.com",
	projectId: "team-work-444e9",
	storageBucket: "team-work-444e9.appspot.com",
	messagingSenderId: "125804665458",
	appId: "1:125804665458:web:1bee71f0671b289640c0eb",
};

// init firebase app
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// init timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
