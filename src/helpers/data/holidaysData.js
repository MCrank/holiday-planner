import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidaysByArrayIds = (uid, holidayIdsArr) => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const holidaysObj = results.data;
      const holidaysArr = [];
      if (holidaysObj !== null) {
        Object.keys(holidaysObj).forEach((holidayId) => {
          holidaysObj[holidayId].id = holidayId;
          holidaysArr.push(holidaysObj[holidayId]);
        });
      }
      const selectedHolidays = holidaysArr.filter(x => holidayIdsArr.includes(x.id));
      resolve(selectedHolidays);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getHolidaysByArrayIds };
