import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TitleEditorContainer from './TitleEditor/TitleEditorContainer';
import './Header.css';

class Header extends Component {
  render() {
    let title = null;
    if (this.props.titleInEditMode) {
      title = <TitleEditorContainer />;
    } else {
      title =
        <span className="Header-title" onClick={this.props.onTitleClick}>
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
};

export default Header;
