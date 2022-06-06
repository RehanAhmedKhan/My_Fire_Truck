import vehicalReducer from './vehicalReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  vehical: vehicalReducer,
});

export default rootReducer;
