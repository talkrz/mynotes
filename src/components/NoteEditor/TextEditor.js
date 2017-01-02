import React, { Component } from 'react';
import { Editor } from 'draft-js';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.props.editorContentChanged(editorState);
    };
  }

  render() {
    return (
      <div className="NoteEditor-text-editor" onClick={this.focus}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.onChange}
          ref="editor"
          placeholder="Write a note..." />
      </div>
    );
  }
}

export default TextEditor;
