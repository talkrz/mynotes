import { connect } from 'react-redux'
import Messages from './Messages'

const mapStateToProps = state => {
    console.log(state)
    return {
        messages: state.messages
    }
}

const MessagesContainer = connect(mapStateToProps)(Messages);

export default MessagesContainer
