import firebase from 'firebase/app';
import 'bootstrap';

import createNavbar from './components/navbar/navbar';
import loginBtn from './components/auth/auth';

import apiKeys from '../db/apiKeys.json';
import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginBtn();
};

initApp();
