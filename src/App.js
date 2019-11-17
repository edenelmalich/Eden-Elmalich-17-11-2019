import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Home from './components/Home';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import PagesNav from './components/PagesNav';
// CSS
import './css/Weather.css';
// Redux
import store from './store';
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PagesNav />
        <div className='App'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/Favorites' component={Favorites} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
