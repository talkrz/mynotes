import React, { PropTypes } from 'react';
import './Messages.css';

const Messages = ({ messages }) => (
  <div className="Messages">
    {messages.map((message, key) => (
      <p key={key} className={'Messages-message Messages-' + message.messageType}>{message.message}</p>
    ))}
  </div>
)

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      messageType: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  )
}

export default Messages;
