import { connect } from 'react-redux';
import App from './App';
import { sidemenuOpen } from './../redux/app/actions';

const mapStateToProps = state => ({
  title: state.app.title,
});

const mapDispatchToProps = dispatch => ({
  onMenuButtonClick: () => {
    dispatch(sidemenuOpen());
  },
});


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
