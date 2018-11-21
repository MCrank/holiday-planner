import $ from 'jquery';
import firebase from 'firebase/app';
import 'bootstrap';

import createNavbar from './components/navbar/navbar';
import loginBtn from './components/auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './components/FriendsPage/friendsPage';
import addEditFriends from './components/AddEditFriends/addEditFriends';

import apiKeys from '../db/apiKeys.json';
import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage.initializeFriendsPage);
  loginBtn();
  $('#show-friend-form').on('click', addEditFriends.showAddForm);
};

initApp();
