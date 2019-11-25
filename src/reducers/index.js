import { combineReducers } from 'redux';
import getWeatherReducer from './getWeatherReducer';
import alertReducer from './alertReducer';
import toggleReducer from './toggleReducer';

export default combineReducers({
  getWeatherReducer,
  alertReducer,
  toggleReducer
});
