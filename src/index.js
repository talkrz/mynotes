import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import AppContainer from './pages/AppContainer';
import AppLoggedOut from './pages/AppLoggedOut';
import BoardContainer from './components/Board/BoardContainer';
import './index.css';
import mynotesReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...mynotesReducers,
    routing: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
  ),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route path="/boards/:boardId" component={BoardContainer}/>
      </Route>
      <Route path="/login" component={AppLoggedOut}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
