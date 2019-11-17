import React, { useEffect, useState } from 'react';
import { Form, Button, FormControl, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from './layout/Alert';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { getDefaultDetails } from '../actions/getWeatherAction';
import { setAlert } from '../actions/alertAction';

const Home = ({
  getDefaultDetails,
  getDefaultWeather,
  currentWeather,
  dayDaily,
  DayTime,
  City,
  setAlert,
  Fail
}) => {
  useEffect(() => {
    getDefaultDetails(City);
    let Favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    SetFavorites(...FavoritesData, Favorites);
  }, []);
  const [FavoritesData, SetFavorites] = useState([]);
  const [getDetails, setDetails] = useState({
    cityName: ''
  });
  const onChange = e =>
    setDetails({ ...getDetails, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    getDefaultDetails(cityName);
  };
  const Save = e => {
    e.preventDefault();
    let Favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!Favorites.length > 0) {
      Favorites.push(getDefaultWeather);
      setAlert('success', 'success');
    } else {
      for (var i = 0; i < Favorites.length; i++) {
        if (Favorites[i].Key === getDefaultWeather.Key) {
          return setAlert('Exist', 'danger');
        }
      }
      Favorites.push(getDefaultWeather);
    }
    setAlert('success', 'success');
    localStorage.setItem('favorites', JSON.stringify(Favorites));
    console.log(Favorites);
  };
  if (Fail) {
    setAlert('Server Error', 'danger');
  }
  const { cityName } = getDetails;
  return (
    <div className='Home'>
      <main className='Main'>
        <div className='container'>
          <div className='header'>Welcome to the weather app</div>
          <div className='mainText '>
            Come see the weather anytime, anywhere.
          </div>
          <Form className='form' onSubmit={e => onSubmit(e)} inline>
            <FormControl
              type='text'
              placeholder='Enter a city...'
              className='mr-sm-2'
              name='cityName'
              value={cityName}
              onChange={e => onChange(e)}
            />
            <Button type='submit' variant='outline-success'>
              Search
            </Button>
          </Form>
          <Alert />
          <Card
            bg='light'
            text='white'
            id='Card-height'
            style={{ width: '100%' }}
          >
            <Card.Header>
              {FavoritesData.map(city => (
                <span>
                  {city.Key === getDefaultWeather.Key ? (
                    <FontAwesomeIcon id='Favorites-icon' icon={faHeart} />
                  ) : null}
                </span>
              ))}

              <Button onClick={e => Save(e)} variant='dark'>
                Add to Favorites
              </Button>
            </Card.Header>
            <Card.Title>
              <div>
                <header className='weatherHeader'>
                  {getDefaultWeather.LocalizedName}
                </header>
              </div>
            </Card.Title>
            <Card.Text>
              {currentWeather.map(data => (
                <div key='1'>
                  {data.WeatherIcon < 10 ? (
                    <img
                      className='icon-weather'
                      src={`https://developer.accuweather.com/sites/default/files/0${data.WeatherIcon}-s.png`}
                      alt={data.WeatherText}
                    />
                  ) : (
                    <img
                      className='icon-weather'
                      src={`https://developer.accuweather.com/sites/default/files/${data.WeatherIcon}-s.png`}
                      alt={data.WeatherText}
                    />
                  )}

                  <div className='WeatherText'>
                    {moment(data.LocalObservationDateTime).format('dddd')},
                    {data.IsDayTime ? (
                      <span className='WeatherText'>Day</span>
                    ) : (
                      <span className='WeatherText'> Night</span>
                    )}
                  </div>
                  <div className='WeatherText'>{data.WeatherText}</div>
                  <div className='Temperature'>
                    {data.Temperature.Metric.Value}°
                  </div>
                </div>
              ))}
            </Card.Text>

            <Card.Body>
              {dayDaily.map(data => (
                <div>
                  <div className='daysCards'>
                    <Card bg='light' text='white' id='daysCards-card-size'>
                      <Card.Header>
                        {moment(data.Date).format('dddd')}
                      </Card.Header>
                      {/* Check if isDayTime */}
                      {DayTime ? (
                        <div>
                          {data.Day.Icon < 10 ? (
                            <img
                              className='icon-weather'
                              src={`https://developer.accuweather.com/sites/default/files/0${data.Day.Icon}-s.png`}
                              alt={data.Day.IconPhrase}
                            />
                          ) : (
                            <img
                              className='icon-weather'
                              src={`https://developer.accuweather.com/sites/default/files/${data.Day.Icon}-s.png`}
                              alt={data.Day.IconPhrase}
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          {data.Day.Icon < 10 ? (
                            <img
                              className='icon-weather'
                              src={`https://developer.accuweather.com/sites/default/files/0${data.Day.Icon}-s.png`}
                              alt={data.Day.IconPhrase}
                            />
                          ) : (
                            <img
                              className='icon-weather'
                              src={`https://developer.accuweather.com/sites/default/files/${data.Day.Icon}-s.png`}
                              alt={data.Day.IconPhrase}
                            />
                          )}
                        </div>
                      )}

                      <div className='text-icon '>{data.Day.IconPhrase}</div>
                      <Card.Body>
                        <Card.Text>
                          <div className='text-temp'>
                            Minimum {data.Temperature.Minimum.Value}F
                          </div>
                          <div className='text-temp'>
                            Maximum {data.Temperature.Maximum.Value}F
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </main>
    </div>
  );
};
Home.propTypes = {
  getDefaultDetails: PropTypes.func.isRequired,
  currentWeather: PropTypes.array,
  dayDaily: PropTypes.array,
  DayTime: PropTypes.bool,
  City: PropTypes.string,
  Fail: PropTypes.bool
};
const mapStateToProps = state => ({
  getDefaultWeather: state.getWeatherReducer.getDefaultWeather,
  currentWeather: state.getWeatherReducer.currentWeather,
  dayDaily: state.getWeatherReducer.dayDaily,
  DayTime: state.getWeatherReducer.DayTime,
  City: state.getWeatherReducer.City,
  Fail: state.getWeatherReducer.Fail
});
export default connect(mapStateToProps, { getDefaultDetails, setAlert })(Home);
