import {
  GET_DEFAULT_WEATHER,
  CURRENT_WEATHER,
  DAY_DAILY,
  CITY_NAME,
  FAIL,
  SET_CURRENT
} from '../actions/typesActions';
const initialState = {
  getDefaultWeather: [],
  currentWeather: [],
  dayDaily: [],
  DayTime: null,
  City: 'tel aviv',
  Fail: false,
  CurrentArray: []
};
const getWeatherReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DEFAULT_WEATHER:
      return {
        ...state,
        getDefaultWeather: payload
      };
    case CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: payload,
        DayTime: payload[0].IsDayTime,
        Success: true
      };
    case DAY_DAILY:
      return { ...state, dayDaily: payload, Success: true };
    case CITY_NAME:
      return { ...state, City: payload };
    case SET_CURRENT:
      return {
        ...state,
        CurrentArray: [...state.CurrentArray, payload]
      };
    case FAIL:
      return { ...state, Fail: true };
    default:
      return state;
  }
};

export default getWeatherReducer;
