import React, { Component } from 'react';
import { Editor } from 'draft-js';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = (editorState) => {
      this.props.editorContentChanged(editorState);
    };
  }

  render() {
    return (
      <div className="NoteEditor-text-editor">
        <Editor
          editorState={this.props.editorState}
          onChange={this.onChange}
          placeholder="Write a note..." />
      </div>
    );
  }
}

export default TextEditor;
