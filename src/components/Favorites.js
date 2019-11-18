import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Alert from './layout/Alert';

// Redux
import { connect } from 'react-redux';
import { getCurrent } from '../actions/getWeatherAction';
import { setCityName } from '../actions/getWeatherAction';
import { setAlert } from '../actions/alertAction';

// Favorites component
const Favorites = ({
  CurrentArray,
  getCurrent,
  setCityName,
  setAlert,
  Fail
}) => {
  //useRef
  const didMount = useRef(false);

  // useState
  const [FavoritesData, SetFavorites] = useState([]);
  //effects
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      let Favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      SetFavorites(Favorites);
    }
  }, []);

  useEffect(() => {
    const getWeather = Favorites => {
      if (Favorites.length > 0) {
        for (let i = 0; i < Favorites.length; i++) {
          getCurrent(Favorites[i].LocalizedName);
        }
      }
    };
    getWeather(FavoritesData);
  }, [FavoritesData, getCurrent]);

  // Function that remove city from the list
  const RemoveCity = key => {
    if (FavoritesData.length === 1) {
      SetFavorites(FavoritesData.filter(city => city.LocalizedName !== key));
      localStorage.removeItem('favorites');
      setAlert('The city was deleted from the list', 'danger');
    } else {
      SetFavorites(FavoritesData.filter(city => city.LocalizedName !== key));
      localStorage.setItem('favorites', JSON.stringify(FavoritesData));
      setAlert('The city was deleted from the list', 'danger');
    }
  };

  if (Fail) {
    setAlert('Server Error', 'danger');
  }

  return (
    <div className='Favorites'>
      <main className='Main'>
        <div className='container'>
          <div className='header'> Your Favorites Cities</div>
          <Alert />
          <div className='card-att'>
            {FavoritesData.length > 0
              ? FavoritesData.map((city, i) => (
                  <div key={i}>
                    <Card style={{ width: '18rem' }}>
                      <Link
                        to='/'
                        onClick={() => setCityName(city.LocalizedName)}
                      >
                        <Card.Header>
                          {city.LocalizedName}, {city.Country.ID}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <span>
                              {CurrentArray.map((data, index) => (
                                <span key={index}>
                                  {index === i ? (
                                    <span>
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
                                        {moment(
                                          data.LocalObservationDateTime
                                        ).format('dddd')}
                                        ,
                                        {data.IsDayTime ? (
                                          <span className='WeatherText'>
                                            Day
                                          </span>
                                        ) : (
                                          <span className='WeatherText'>
                                            Night
                                          </span>
                                        )}
                                      </span>
                                      <span className='WeatherText'>
                                        {data.WeatherText}
                                      </span>
                                      <span className='Temperature'>
                                        {data.Temperature.Metric.Value}°
                                      </span>
                                    </span>
                                  ) : null}
                                </span>
                              ))}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Link>
                      <Button
                        onClick={() => RemoveCity(city.LocalizedName)}
                        variant='outline-success'
                      >
                        Remove
                      </Button>
                    </Card>
                  </div>
                ))
              : null}
          </div>
        </div>
      </main>
    </div>
  );
};

Favorites.propType = {
  getCurrent: PropTypes.func.isRequired,
  CurrentArray: PropTypes.array,
  Fail: PropTypes.bool
};
const mapStateToProps = state => ({
  CurrentArray: state.getWeatherReducer.CurrentArray,
  Fail: state.getWeatherReducer.Fail
});
export default connect(mapStateToProps, {
  getCurrent,
  setCityName,
  setAlert
})(Favorites);
