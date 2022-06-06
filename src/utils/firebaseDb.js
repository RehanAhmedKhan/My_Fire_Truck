import React from 'react';
// import fbConfig from '../../fbTextConfig.json';
import fbConfig from '../../fbConfig.json';
import firebase from 'firebase/compat';
import JSON5 from 'json5';

const app = firebase.initializeApp(fbConfig);
const db = app.database();

const getDataFromFirebase = (endPoint, cbSuccess, cbError) => {
  console.log(endPoint);
  try {
    db.ref(endPoint).on('value', res => {
      let response = res?.val();
      console.log('response=========>', response);
      if (!response) {
        cbError(null);
        return;
      }
      if (typeof response === 'string') {
        const data = JSON5.parse(response);
        if (Object.keys(data)?.length > 0) {
          cbSuccess(data);
          return;
        }
      } else {
        if (Object.keys(response)?.length > 0) {
          cbSuccess(response);
          return;
        }
      }

      cbError('No Data for this vehicle');
    });
  } catch (e) {
    cbError(e);
    console.log('this is error -  --  > ', e.message);
  }
};

export const removeFirebaseListener = endPoint => {
  try {
    db.ref(endPoint).off('value');
  } catch (e) {
    console.og(e);
  }
};

export default getDataFromFirebase;
