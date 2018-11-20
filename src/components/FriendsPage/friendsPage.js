import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';

const printSingleFriend = (friend) => {
  const friendString = `
  <div>
    <h1>${friend.name}</h1>
    <h3>${friend.relationship}</h3
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <button class="btn btn-danger delete-btn">X</button>
  </div>
  `;
  $('#single-container').html(friendString);
};

const getSingleFriend = (evt) => {
  const friendId = evt.target.dataset.dropdownId;
  axios
    .get(`${apiKeys.firebaseKeys.databaseURL}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      printSingleFriend(singleFriend);
    })
    .catch((error) => {
      console.error('Error in getting one friend', error);
    });
};

const buidlDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Pick A Friend
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  friendsArray.forEach((friend) => {
    dropdown += `<div class="dropdown-item" data-dropdown-id=${friend.id}>${friend.name}</div>`;
  });
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  axios
    .get(`${apiKeys.firebaseKeys.databaseURL}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      buidlDropdown(friendsArray);
    })
    .catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default { initializeFriendsPage };
