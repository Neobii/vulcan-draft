import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { convertToRaw, convertFromRaw, Editor, EditorState } from 'draft-js';

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      //key: 'smartFormDraft',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});

class SmartFormDraft extends Component {
  constructor(props) {
    super(props);
    if(props.value || props.prefilledValue) {
      contentState = convertFromRaw(JSON.parse(props.value));
      this.state = {
        editorState: EditorState.creatWithContent(contentState)
      }
    }
    else {
      this.state = {
        editorState: EditorState.createWithContent(emptyContentState)
      };
    }
    
    this.onChange = (editorState) => {
      this.setState({editorState});
      this.updateValues(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    //deal with prefilled values or value that is alreayd here
  }

  updateValues(draftRaw) {
    const { name, updateCurrentValues } = this.props;
    updateCurrentValues && updateCurrentValues({[name]: draftRaw});
  }

  render() {
    const { name } = this.props;
    return (
      <div onClick={this.focusEditor}>
        <h3>{name}:</h3>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onChange={this.onChange}
          key={`draft_${name}`}
        />
      </div>
    );
  }
}

SmartFormDraft.contextTypes = {
  updateCurrentValues: PropTypes.func,
  //prefilledValue: PropTypes.any,
  //value: PropTypes.any,
};

registerComponent('SmartFormDraft', SmartFormDraft);