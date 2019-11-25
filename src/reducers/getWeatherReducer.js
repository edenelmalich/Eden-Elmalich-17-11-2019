import {
  SET_WEATHER,
  SET_CURRENT_WEATHER,
  SET_DAY_DAILY,
  SET_CITY_NAME,
  FAIL,
  SET_CURRENT
} from '../actions/typesActions';
const initialState = {
  city_Details: [],
  currentWeather: [],
  dayDaily: [],
  DayTime: null,
  DefaultCity: 'tel aviv',
  Fail: false,
  weatherResponses: []
};
const getWeatherReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WEATHER:
      return {
        ...state,
        city_Details: payload
      };
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: payload,
        DayTime: payload[0].IsDayTime
      };
    case SET_DAY_DAILY:
      return { ...state, dayDaily: payload };
    case SET_CITY_NAME:
      return { ...state, DefaultCity: payload };
    case SET_CURRENT:
      return {
        ...state,
        weatherResponses: [...state.weatherResponses, payload]
      };
    case FAIL:
      return { ...state, Fail: true };
    default:
      return state;
  }
};

export default getWeatherReducer;
