import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import App from './pages/App';
import AppLoggedOut from './pages/AppLoggedOut';
import BoardContainer from './components/Board/BoardContainer';
import BoardListContainer from './components/BoardList/BoardListContainer';
import './index.css';
import reducers from './redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(hashHistory)),
  ),
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={BoardListContainer}/>
        <Route path="/boards/:boardId" component={BoardContainer}/>
      </Route>
      <Route path="/login" component={AppLoggedOut}/>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
