import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  categoriesReducer,
  alertReducer,
});
