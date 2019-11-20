import {
  GET_DEFAULT_WEATHER,
  CURRENT_WEATHER,
  DAY_DAILY,
  CITY_NAME,
  FAIL,
  SET_CURRENT
} from './typesActions';
import axios from 'axios';
import { setAlert } from './alertAction';

export const getDefaultDetails = cityName => async dispatch => {
  const apiKey = 'sFxM2bBpM3VtLvGEiuyCb5wNYrIQh1Wi';
  try {
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`
    );
    console.log(res.data);
    if (res.data !== undefined) {
      dispatch({
        type: GET_DEFAULT_WEATHER,
        payload: res.data[0]
      });
    }

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
    dispatch(setAlert('The city is not listed', 'danger'));
  }
};
export const getCurrent = city => async dispatch => {
  const apiKey = 'sFxM2bBpM3VtLvGEiuyCb5wNYrIQh1Wi';
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
    type: CITY_NAME,
    payload: name
  });
};
