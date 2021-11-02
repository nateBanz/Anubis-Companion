import firebase from 'firebase/app';
import 'firebase/auth';
import {config} from "../config";

const Firebase = firebase.initializeApp(config);

export const auth = firebase.auth

export default Firebase

