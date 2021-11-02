import firebase from 'firebase/app';
import 'firebase/auth';
import {config} from "../config";
let Firebase = null
if (!firebase.apps.length) {
    Firebase = firebase.initializeApp({
        apiKey: "AIzaSyBifKFLyeb5Qm71HtCyJ7LnI7_ot8RPsvE",
        authDomain: "anubis-c9edb.firebaseapp.com",
        databaseURL: "https://anubis-c9edb-default-rtdb.firebaseio.com",
        projectId: "anubis-c9edb",
        storageBucket: "anubis-c9edb.appspot.com",
        messagingSenderId: "745868178409",
        appId: "1:745868178409:web:8e7e26aa3d73d2a5d8d178"
    });
}else {
    Firebase =
        firebase.app(); // if already initialized, use that one

}

export const auth = firebase.auth

export default Firebase

