import {ADD_VEHICAL, DELETE_VEHICAL, SELECT_VEHICAL} from '../types';

const initialState = {
  selected: {},
  vehicleList: [],
};
const vehicalReducer = (state = initialState, action) => {
  if (action.type === ADD_VEHICAL) {
    const newList = state.vehicleList;
    newList.push(action.payLoad);
    return {...state, vehicleList: newList};
  } else if (action.type === DELETE_VEHICAL) {
    const tempList = state.vehicleList.filter(
      item => item.id !== action.deletePayLoad,
    );
    let selectedTemp = state.selected?.id;
    if (selectedTemp === action.deletePayLoad) {
      selectedTemp = {};
    }
    return {...state, vehicleList: tempList, selected: selectedTemp};
  } else if (action.type === SELECT_VEHICAL) {
    return {...state, selected: action.selectPayload};
  } else {
    return state;
  }
};
export default vehicalReducer;
