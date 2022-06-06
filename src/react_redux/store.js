import rootReducer from './reducers';
import {legacy_createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'rooot',
  storage: AsyncStorage,
  whitelist: ['vehical'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
