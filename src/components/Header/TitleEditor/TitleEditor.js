import React, { Component, PropTypes } from 'react';
import './TitleEditor.css';

class TitleEditor extends Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  onClickOutside(e) {
    const domNode = this.noteEditorEl;
    if (!domNode || !domNode.contains(e.target)) {
      this.props.onTitleSave();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  render() {
    return (
      <div className="TitleEditor-title-controls">
        <input className="TitleEditor-title-input"
          type="text"
          value={this.props.title}
          onChange={(event) => {
            this.props.onTitleChanged(event.target.value);
          }} />
          <button className="btn btn-action" onClick={this.props.onTitleSave}>Save</button>
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
