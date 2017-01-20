import React, { Component, PropTypes } from 'react';
import './TitleEditor.css';

class TitleEditor extends Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onClickOutside(e) {
    const domNode = this.titleEditorEl;
    if (!domNode || !domNode.contains(e.target)) {
      this.props.onTitleSave();
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.props.onTitleSave();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside, true);
    this.inputEl.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  render() {
    return (
      <div
        className="TitleEditor-title-controls"
        ref={(el) => { this.titleEditorEl = el; }}
        onKeyUp={this.onKeyUp}
      >
        <input className="TitleEditor-title-input"
          type="text"
          value={this.props.title}
          onChange={(event) => {
            this.props.onTitleChanged(event.target.value);
          }}
          ref={(el) => { this.inputEl = el; }}
        />
      </div>
    );
  }
}

TitleEditor.propTypes = {
  title: PropTypes.string,
  onTitleChanged: PropTypes.func.isRequired,
  onTitleSave: PropTypes.func.isRequired,
};

export default TitleEditor;
