import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import App from './pages/App';
import AppLoggedOut from './pages/AppLoggedOut';
import storage from './localStorage/storage';
import './index.css';
import mynotesReducers from './reducers';
import { restoreAccessCredentials } from './actions/user';

const store = createStore(
  combineReducers({
    ...mynotesReducers,
    routing: routerReducer,
  }),
  applyMiddleware(thunk, routerMiddleware(browserHistory)),
);

const history = syncHistoryWithStore(browserHistory, store);

const onAppInit = (dispatch) => {
  dispatch(restoreAccessCredentials(storage()));
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onEnter={onAppInit(store.dispatch)}>
      <Route path="/" component={App}/>
      <Route path="/login" component={AppLoggedOut}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
