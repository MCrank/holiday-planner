import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import holidayFriendsData from '../../helpers/data/holidayFriendsData';
import holidaysData from '../../helpers/data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>Holidays:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} - ${holiday.Date}</h5>`;
  });
  return holidayString;
};

const printSingleFriend = (friend, holidays) => {
  const friendString = `
  <div>
    <h1>${friend.name}</h1>
    <h3>${friend.relationship}</h3
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <div class="form-check form-check-inline">
      <label class="form-check-label pr-2" for="${friend.id}">Am I avoiding?</label>
      <input class="form-check-input is-avoiding-checkbox" type="checkbox" id="${friend.id}">
    </div>
    <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>Delete</button>
    <button class="btn btn-info edit-btn" data-edit-id=${friend.id}>Edit</button>
    <div class="holiday-container">${holidayStringBuilder(holidays)}</div>
  </div>
  `;
  $('#single-container').html(friendString);
  if (friend.isAvoiding) {
    $('.is-avoiding-checkbox').attr('checked', true);
  }
};

const getSingleFriend = (evt) => {
  const friendId = evt.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData
    .getSingleFriend(friendId)
    .then((singleFriend) => {
      holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
        holidaysData.getHolidaysByArrayIds(uid, holidayIds).then((holidays) => {
          printSingleFriend(singleFriend, holidays);
        });
      });
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
  friendsData
    .getAllFriends(uid)
    .then((friendsArray) => {
      buidlDropdown(friendsArray);
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteFriend = (evt) => {
  // firebase id
  const idToDelete = evt.target.dataset.deleteId;
  friendsData
    .deleteFriend(idToDelete)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('Error deleteing...', error);
    });
};

const updateIsAvoiding = (evt) => {
  const friendId = evt.target.id;
  const isAvoiding = evt.target.checked;
  friendsData
    .updateIsAvoiding(friendId, isAvoiding)
    .then(() => {
      friendsPage();
    })
    .catch((error) => {
      console.error('error in udating flag', error);
    });
  console.log('You checked a check');
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default { initializeFriendsPage };
