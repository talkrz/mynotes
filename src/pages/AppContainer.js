import { connect } from 'react-redux';
import App from './App';
import { sidemenuOpen } from './../actions/app';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onMenuButtonClick: () => {
    dispatch(sidemenuOpen());
  },
});


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
