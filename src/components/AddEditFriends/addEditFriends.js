import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import friendsPage from '../FriendsPage/friendsPage';

const formBuilder = (friend) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name</label>
    <input type="text" class="form-control" value="${
  friend.name
}" id="form-friend-name" placeholder="John Smith">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address</label>
    <input type="text" class="form-control" value="${
  friend.address
}" id="form-friend-address" placeholder="123 United Way, Hollywood, Ca 90210">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-email">E-mail</label>
    <input type="text" class="form-control" value="${
  friend.email
}" id="form-friend-email" placeholder="john.smith@domain.com">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number</label>
    <input type="text" class="form-control" value="${
  friend.phoneNumber
}" id="form-friend-phone" placeholder="602-644-3068">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship</label>
    <input type="text" class="form-control" value="${
  friend.relationship
}" id="form-friend-relationship" placeholder="Mother">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  `;
  return form;
};

const getFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const showAddForm = () => {
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
  domString += '<button class="btn btn-success" id="add-friend">Save Friend</button>';

  $('#add-edit-friend')
    .html(domString)
    .show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = getFriendFromForm();
  friendsData
    .addNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend')
        .html('')
        .hide();
      $('#friends').show();
      friendsPage.initializeFriendsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

// Edit
const showEditForm = (evt) => {
  const friendId = evt.target.dataset.editId;
  friendsData
    .getSingleFriend(friendId)
    .then((singleFriend) => {
      let domString = '<h2>Edit New Friend</h2>';
      domString += formBuilder(singleFriend);
      domString += `<button class="btn btn-success" id="edit-friend" data-single-edit-id=${
        singleFriend.id
      }>Save Friend</button>`;

      $('#add-edit-friend')
        .html(domString)
        .show();
      $('#friends').hide();
    })
    .catch((error) => {
      console.error('Error in getSingleFriend from Edit', error);
    });
};

const updateFriend = (evt) => {
  const updatedFriend = getFriendFromForm();
  const friendId = evt.target.dataset.singleEditId;
  friendsData
    .updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend')
        .html('')
        .hide();
      $('#single-container').html('');
      $('#friends').show();
      friendsPage.initializeFriendsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-friend', updateFriend);

export default { formBuilder, getFriendFromForm, showAddForm };
