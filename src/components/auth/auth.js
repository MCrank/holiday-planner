import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleLoginImg from './google-login.png';
import './auth.scss';

const loginBtn = () => {
  const domString = `
    <button id="google-auth" class="btn btn-secondary">
      <img src="${googleLoginImg}">
    </button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginBtn;
