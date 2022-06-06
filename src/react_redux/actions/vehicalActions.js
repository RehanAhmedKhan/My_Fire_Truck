import {ADD_VEHICAL, DELETE_VEHICAL, SELECT_VEHICAL} from '../types';

export const addVehical = payLoad => {
  return {
    type: ADD_VEHICAL,
    payLoad,
  };
};

export const deleteVehical = deletePayLoad => {
  return {
    type: DELETE_VEHICAL,
    deletePayLoad,
  };
};

export const selectVehical = (selectPayload) => {
  return {
    type: SELECT_VEHICAL,
    selectPayload,
  };
};
