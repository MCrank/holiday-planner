import axios from 'axios';
import $ from 'jquery';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';

const printSingleFriend = (friend) => {
  const friendString = `
  <div>
    <h1>${friend.name}</h1>
    <h3>${friend.relationship}</h3
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>Delete</button>
  </div>
  `;
  $('#single-container').html(friendString);
};

const getSingleFriend = (evt) => {
  const friendId = evt.target.dataset.dropdownId;
  friendsData
    .getSingleFriend(friendId)
    .then((singleFriend) => {
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
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${friend.id}>${
        friend.name
      }</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no friends!</div>';
  }

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

const deleteFriend = (evt) => {
  // firebase id
  const idToDelete = evt.target.dataset.deleteId;
  axios
    .delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('Error deleteing...', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default { initializeFriendsPage };
