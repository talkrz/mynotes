import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './Header.css';

class Header extends Component {
  render() {
    let title = null;
    if (this.props.titleInEditMode) {
      title = <div className="Header-title-controls">
        <input className="Header-title-input"
          type="text"
          value={this.props.title}
          onClick={this.props.onTitleClick}
          onChange={(event) => {
            this.props.onTitleChanged(event.target.value);
          }} />
          <button className="btn btn-action" onClick={this.props.onTitleSave}>Save</button>
        </div>;
    } else {
      title = <span className="Header-title" onClick={this.props.onTitleClick}>
        {this.props.title}
      </span>;
    }

    return (
      <div className="Header-header">
        <div className="Header-menu-button">
          <button className="btn" onClick={this.props.onMenuButtonClick}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <Link className="Header-logo" to="/">my notes</Link>
        {title}
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  titleInEditMode: PropTypes.bool,
  onMenuButtonClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  onTitleSave: PropTypes.func.isRequired,
};

export default Header;
