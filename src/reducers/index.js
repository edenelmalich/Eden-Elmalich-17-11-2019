import { combineReducers } from 'redux';
import getWeatherReducer from './getWeatherReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  getWeatherReducer,
  alertReducer
});
