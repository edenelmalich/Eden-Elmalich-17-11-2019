import {
  GET_DEFAULT_WEATHER,
  CURRENT_WEATHER,
  DAY_DAILY,
  CITY_NAME,
  FAIL,
  SET_CURRENT
} from './typesActions';
import axios from 'axios';

export const getDefaultDetails = cityName => async dispatch => {
  const apiKey = 'oece4lrCKAnN88LqgCdQIOaK7APvWCAm';
  try {
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`
    );

    dispatch({
      type: GET_DEFAULT_WEATHER,
      payload: res.data[0]
    });
    const resData = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: CURRENT_WEATHER,
      payload: resData.data
    });
    const daysData = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: DAY_DAILY,
      payload: daysData.data.DailyForecasts
    });
  } catch (err) {
    dispatch({
      type: FAIL
    });
  }
};
export const getCurrent = city => async dispatch => {
  const apiKey = 'oece4lrCKAnN88LqgCdQIOaK7APvWCAm';
  try {
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
    );
    const resData = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: SET_CURRENT,
      payload: resData.data
    });
  } catch (err) {
    dispatch({
      type: FAIL
    });
  }
};
export const setCityName = name => dispatch => {
  dispatch({
    type: CITY_NAME,
    payload: name
  });
};
