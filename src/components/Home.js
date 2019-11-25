import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from './layout/Alert';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

// Using google places
import PlacesAutocomplete from 'react-places-autocomplete';

// Redux
import { connect } from 'react-redux';
import { getDefaultDetails } from '../actions/getWeatherAction';
import { setAlert } from '../actions/alertAction';

const Home = ({
  getDefaultDetails,
  city_Details,
  currentWeather,
  dayDaily,
  DayTime,
  DefaultCity,
  setAlert,
  toggleCheck
}) => {
  const didMount = useRef(false);

  const [FavoritesData, SetFavorites] = useState([]);
  const [getDetails, setDetails] = useState('');

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      let Favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      SetFavorites(Favorites);
      getDefaultDetails(DefaultCity);
    }
  }, [getDefaultDetails, DefaultCity]);

  const onSubmit = e => {
    e.preventDefault();
    getDefaultDetails(getDetails);
  };
  // This function get the value from search menu
  const handleSelect = value => {
    let getValues = value;
    let getCityName = getValues.split(',');
    getDefaultDetails(getCityName[0]);
  };
  // This function save the cities in the localStorage
  const Save = e => {
    e.preventDefault();
    let Favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!Favorites.length > 0) {
      Favorites.push(city_Details);
      setAlert('The city was successfully added to the list', 'success');
      localStorage.setItem('favorites', JSON.stringify(Favorites));
      return true;
    } else {
      for (let i = 0; i < Favorites.length; i++) {
        if (Favorites[i].Key === city_Details.Key) {
          return setAlert('The city is on the list', 'danger');
        }
      }
      Favorites.push(city_Details);
    }
    setAlert('The city was successfully added to the list', 'success');
    localStorage.setItem('favorites', JSON.stringify(Favorites));
  };
  const color = toggleCheck ? 'light' : 'dark';
  return (
    <div className='Home'>
      <main className={`Main-${color}`}>
        <div className='container'>
          <div className={`header-${color}`}>Welcome to the weather app</div>
          <div className={`mainText-${color}`}>
            Come see the weather anytime, anywhere.
          </div>
          <Form className='form' onSubmit={e => onSubmit(e)} inline>
            <PlacesAutocomplete
              value={getDetails}
              onChange={setDetails}
              onSelect={handleSelect}
              types={['locality', 'city']}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <span>
                  <FormControl
                    className='mr-sm-2'
                    {...getInputProps({ placeholder: 'Enter a city...' })}
                  />

                  <Button type='submit' variant='outline-success'>
                    Search
                  </Button>

                  <div className='Cities-List'>
                    {loading ? <div className='Loading'>...loading</div> : null}

                    {suggestions.map(suggestion => {
                      const style = {
                        padding: '1.25rem',
                        overflow: 'auto',
                        borderBottom: '1px solid #28a745',
                        backgroundColor: suggestion.active
                          ? '#28a745'
                          : '#f8f9fa'
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </span>
              )}
            </PlacesAutocomplete>
          </Form>
          <Alert />
          <Card
            className={`bg-color-${color} `}
            text='white'
            id='Card-height'
            style={{ width: '100%' }}
          >
            <Card.Header>
              {FavoritesData.length > 0 ? (
                <span>
                  {FavoritesData.map((city, index) => (
                    <span key={index}>
                      {city.Key === city_Details.Key ? (
                        <FontAwesomeIcon id='Favorites-icon' icon={faHeart} />
                      ) : null}
                    </span>
                  ))}
                </span>
              ) : null}
              <Button
                className={`btn btn-${color}`}
                onClick={e => Save(e)}
                variant='dark'
              >
                Add to Favorites
              </Button>
            </Card.Header>
            {city_Details !== undefined ? (
              <span>
                <Card.Title>
                  <div>
                    <header className='weatherHeader'>
                      {city_Details.LocalizedName}
                    </header>
                  </div>
                </Card.Title>
                <Card.Text>
                  {currentWeather.map((data, index) => (
                    <span key={index}>
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

                      <span className='WeatherText'>
                        {moment(data.LocalObservationDateTime).format('dddd')},
                        {data.IsDayTime ? (
                          <span>Day</span>
                        ) : (
                          <span> Night</span>
                        )}
                      </span>
                      <span className='WeatherText'>{data.WeatherText}</span>
                      <span className='Temperature'>
                        {data.Temperature.Metric.Value}°
                      </span>
                    </span>
                  ))}
                </Card.Text>
                <Card.Body>
                  {dayDaily.map((data, index) => (
                    <div key={index}>
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

                          <div className='text-icon '>
                            {data.Day.IconPhrase}
                          </div>
                          <Card.Body>
                            <Card.Text>
                              <span className='text-temp'>
                                Minimum {data.Temperature.Minimum.Value}F
                              </span>
                              <span className='text-temp'>
                                Maximum {data.Temperature.Maximum.Value}F
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </span>
            ) : null}
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
  city_Details: state.getWeatherReducer.city_Details,
  currentWeather: state.getWeatherReducer.currentWeather,
  dayDaily: state.getWeatherReducer.dayDaily,
  DayTime: state.getWeatherReducer.DayTime,
  DefaultCity: state.getWeatherReducer.DefaultCity,
  Fail: state.getWeatherReducer.Fail,
  toggleCheck: state.toggleReducer.toggleCheck
});
export default connect(mapStateToProps, { getDefaultDetails, setAlert })(Home);
