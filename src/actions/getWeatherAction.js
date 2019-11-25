import {
  SET_WEATHER,
  SET_CURRENT_WEATHER,
  SET_DAY_DAILY,
  SET_CITY_NAME,
  FAIL,
  SET_CURRENT
} from './typesActions';
import axios from 'axios';
import { setAlert } from './alertAction';
// this function get city and call to the api
const apiKey = 'fBumZD2mDA7VWbM0GyrRD5J16mSBbWrh';
export const getDefaultDetails = cityName => async dispatch => {
  try {
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`
    );
    if (res.data !== undefined) {
      dispatch({
        type: SET_WEATHER,
        payload: res.data[0]
      });
    }

    const resData = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: SET_CURRENT_WEATHER,
      payload: resData.data
    });
    const daysData = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: SET_DAY_DAILY,
      payload: daysData.data.DailyForecasts
    });
  } catch (err) {
    dispatch({
      type: FAIL
    });
    dispatch(setAlert('The city is not listed', 'danger'));
  }
};
export const getCurrent = city => async dispatch => {
  try {
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
    );
    const resData = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${res.data[0].Key}?apikey=${apiKey}`
    );
    dispatch({
      type: SET_CURRENT,
      payload: resData.data[0]
    });
  } catch (err) {
    dispatch({
      type: FAIL
    });
  }
};
export const setCityName = name => dispatch => {
  dispatch({
    type: SET_CITY_NAME,
    payload: name
  });
};
