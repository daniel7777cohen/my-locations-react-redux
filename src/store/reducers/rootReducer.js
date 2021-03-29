import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import alertReducer from './alertReducer';
import locationsReducer from './locationsReducer';

export default combineReducers({
  categoriesReducer,
  alertReducer,
  locationsReducer,
});
