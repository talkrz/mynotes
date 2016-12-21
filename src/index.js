import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import App from './pages/App';
import AppLoggedOut from './pages/AppLoggedOut';
import Board from './components/Board/Board';
import './index.css';
import mynotesReducers from './reducers';

const store = createStore(
  combineReducers({
    ...mynotesReducers,
    routing: routerReducer,
  }),
  applyMiddleware(thunk, routerMiddleware(browserHistory)),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/boards/:boardId" component={Board}/>
      </Route>
      <Route path="/login" component={AppLoggedOut}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
