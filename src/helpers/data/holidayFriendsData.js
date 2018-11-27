import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/holidayfriend.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((results) => {
      const holidayFriendsDataObj = results.data;
      const hoildayIds = [];
      if (holidayFriendsDataObj !== null) {
        Object.keys(holidayFriendsDataObj).forEach((hfId) => {
          hoildayIds.push(holidayFriendsDataObj[hfId].holidayId);
        });
      }
      resolve(hoildayIds);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getHolidayIdsForFriend };
