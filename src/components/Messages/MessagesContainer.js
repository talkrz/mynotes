import { connect } from 'react-redux';
import Messages from './Messages';

const mapStateToProps = state => ({
  messages: state.messages,
});

const MessagesContainer = connect(mapStateToProps)(Messages);

export default MessagesContainer;
