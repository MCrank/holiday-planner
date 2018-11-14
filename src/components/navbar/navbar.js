import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (evt) => {
    console.log(evt.target.id);
    if (evt.target.id === 'navbar-button-logout') {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('You logged out');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log(evt.target.id);
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a id="navbar-button-auth" class="nav-link" href="#">Login</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-holidays" class="nav-link" href="#">Holidays</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-friends" class="nav-link" href="#">Friends</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-logout" class="nav-link" href="#">Logout</a>
      </li>
    </ul>
  </div>
  </nav>
  `;

  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
